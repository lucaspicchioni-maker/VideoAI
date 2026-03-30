import logging
import os
import subprocess
import uuid
from pathlib import Path

from app.config import settings

logger = logging.getLogger(__name__)

DISCLAIMER_TEXT = "Esta é uma obra de ficção."
STORAGE_VIDEO = Path(settings.LOCAL_STORAGE_PATH) / "video"
STORAGE_AUDIO = Path(settings.LOCAL_STORAGE_PATH) / "audio"

STORAGE_VIDEO.mkdir(parents=True, exist_ok=True)
STORAGE_AUDIO.mkdir(parents=True, exist_ok=True)


def _run(cmd: list[str]) -> str:
    """Run an ffmpeg command and return stdout. Raises on non-zero exit."""
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg error:\n{result.stderr}")
    return result.stdout


def _tmp_video(suffix: str = ".mp4") -> str:
    return str(STORAGE_VIDEO / f"tmp_{uuid.uuid4().hex}{suffix}")


def _tmp_audio(suffix: str = ".mp3") -> str:
    return str(STORAGE_AUDIO / f"tmp_{uuid.uuid4().hex}{suffix}")


def pad_audio(input_path: str, target_ms: int = 2100) -> str:
    """Pad or trim audio to exactly target_ms milliseconds."""
    target_s = target_ms / 1000
    output_path = _tmp_audio()
    _run([
        "ffmpeg", "-y",
        "-i", input_path,
        "-af", f"apad=whole_dur={target_s}",
        "-t", str(target_s),
        output_path,
    ])
    logger.debug("Audio padded to %sms → %s", target_ms, output_path)
    return output_path


def concatenate_clips(clip_paths: list[str], output_path: str) -> str:
    """Concatenate video clips in order using ffmpeg concat demuxer."""
    list_file = _tmp_video(".txt")
    with open(list_file, "w") as f:
        for p in clip_paths:
            f.write(f"file '{os.path.abspath(p)}'\n")

    _run([
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", list_file,
        "-c", "copy",
        output_path,
    ])
    os.unlink(list_file)
    logger.info("Concatenated %d clips → %s", len(clip_paths), output_path)
    return output_path


def mix_audio_track(
    narration_files: list[str],
    sfx_files: list[str],
    soundtrack_path: str | None,
    output_path: str,
    narration_volume: float = 1.0,
    sfx_volume: float = 0.6,
    soundtrack_volume: float = 0.15,
) -> str:
    """Mix narration, sound effects and background music into a single audio track."""
    inputs: list[str] = []
    filter_parts: list[str] = []
    idx = 0

    for nf in narration_files:
        inputs += ["-i", nf]
        filter_parts.append(f"[{idx}:a]volume={narration_volume}[n{idx}]")
        idx += 1

    for sf in sfx_files:
        inputs += ["-i", sf]
        filter_parts.append(f"[{idx}:a]volume={sfx_volume}[s{idx}]")
        idx += 1

    if soundtrack_path:
        inputs += ["-i", soundtrack_path]
        filter_parts.append(f"[{idx}:a]volume={soundtrack_volume}[bg]")

    all_labels = (
        [f"[n{i}]" for i in range(len(narration_files))]
        + [f"[s{len(narration_files) + i}]" for i in range(len(sfx_files))]
        + (["[bg]"] if soundtrack_path else [])
    )

    n_inputs = len(all_labels)
    filter_graph = ";".join(filter_parts)
    filter_graph += f";{''.join(all_labels)}amix=inputs={n_inputs}:duration=longest[out]"

    cmd = ["ffmpeg", "-y"] + inputs + [
        "-filter_complex", filter_graph,
        "-map", "[out]",
        output_path,
    ]
    _run(cmd)
    logger.info("Mixed %d audio inputs → %s", n_inputs, output_path)
    return output_path


def add_text_overlay(
    video_path: str,
    text: str,
    start: float,
    end: float,
    font_size: int = 32,
    font_color: str = "white",
    output_path: str | None = None,
) -> str:
    """Burn a text overlay on screen between start and end (seconds)."""
    output = output_path or _tmp_video()
    escaped = text.replace("'", "\\'").replace(":", "\\:")
    drawtext = (
        f"drawtext=text='{escaped}'"
        f":fontsize={font_size}:fontcolor={font_color}"
        f":x=(w-text_w)/2:y=h-th-40"
        f":enable='between(t,{start},{end})'"
    )
    _run([
        "ffmpeg", "-y",
        "-i", video_path,
        "-vf", drawtext,
        "-c:a", "copy",
        output,
    ])
    return output


def add_subtitles(
    video_path: str,
    srt_path: str,
    output_path: str | None = None,
) -> str:
    """Burn SRT subtitles into the video."""
    output = output_path or _tmp_video()
    escaped_srt = srt_path.replace("\\", "/").replace(":", "\\:")
    _run([
        "ffmpeg", "-y",
        "-i", video_path,
        "-vf", f"subtitles='{escaped_srt}'",
        "-c:a", "copy",
        output,
    ])
    logger.info("Subtitles burned → %s", output)
    return output


def export_final_episode(
    video_path: str,
    audio_path: str,
    srt_path: str | None,
    output_path: str,
) -> str:
    """
    Merge video + audio, optionally burn subtitles, and stamp the mandatory disclaimer.
    Final output is H.264/AAC in 9:16 vertical format.
    """
    # Step 1: merge video + final audio
    merged = _tmp_video()
    _run([
        "ffmpeg", "-y",
        "-i", video_path,
        "-i", audio_path,
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-c:v", "libx264",
        "-c:a", "aac",
        "-shortest",
        merged,
    ])

    # Step 2: burn subtitles if provided
    with_subs = merged
    if srt_path and os.path.exists(srt_path):
        with_subs = add_subtitles(merged, srt_path)

    # Step 3: add disclaimer overlay in the first 2 seconds
    final = add_text_overlay(
        with_subs,
        text=DISCLAIMER_TEXT,
        start=0.0,
        end=2.0,
        font_size=24,
        font_color="white",
        output_path=output_path,
    )

    logger.info("Final episode exported → %s", final)
    return final
