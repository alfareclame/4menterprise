#!/usr/bin/env bash
# film.sh — Seedance legs -> one continuous take -> scroll-ready frame sequence.
# usage: scripts/film.sh <name> leg1.mp4 leg2.mp4 ...
# Each leg ends on the keyframe the next one starts from, so a short 0.25 s xfade only hides
# the encoder's last-frame wobble; it is not a scene dissolve.
# outputs: public/frames/<name>/{desktop,phone}/frame_%04d.webp, public/frames/<name>/poster.jpg,
#          work/<name>/take.mp4 (QA). Rename <name> whenever content changes: frames are cached immutable.
set -euo pipefail
NAME="$1"; shift
FPS=24; XF=0.25
OUT="public/frames/$NAME"; WORK="work/$NAME"
mkdir -p "$OUT/desktop" "$OUT/phone" "$WORK"

inputs=(); filter=""; prev="v0"; offset=0
n=$#; idx=0
for f in "$@"; do
  inputs+=(-i "$f")
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  # xfade needs identical timebase and pixel format; Seedance (10-bit) and re-encoded trims differ
  filter+="[$idx:v]settb=AVTB,fps=$FPS,format=yuv420p,setsar=1[v$idx];"
  if [ "$idx" -gt 0 ]; then
    offset=$(awk -v o="$offset" -v d="$prevdur" -v x="$XF" 'BEGIN{printf "%.4f", o+d-x}')
    filter+="[$prev][v$idx]xfade=transition=fade:duration=$XF:offset=$offset[x$idx];"
    prev="x$idx"
  fi
  prevdur=$d; idx=$((idx+1))
done
filter+="[$prev]fps=$FPS,format=yuv420p[out]"

echo "== join $n legs"
ffmpeg -v error -y "${inputs[@]}" -filter_complex "$filter" -map "[out]" \
  -c:v libx264 -preset slow -crf 14 "$WORK/take.mp4"
ffprobe -v error -select_streams v -show_entries stream=width,height,nb_frames -of csv=p=0 "$WORK/take.mp4"

echo "== desktop frames (1920w, webp q80)"
ffmpeg -v error -y -i "$WORK/take.mp4" -vf "scale=1920:-2" \
  -c:v libwebp -quality 80 -compression_level 6 -preset photo "$OUT/desktop/frame_%04d.webp"

echo "== phone frames (1280x720 full frame, letterboxed in the page, webp q76)"
ffmpeg -v error -y -i "$WORK/take.mp4" -vf "scale=1280:720" \
  -c:v libwebp -quality 76 -compression_level 6 -preset photo "$OUT/phone/frame_%04d.webp"

echo "== poster (frame 1)"
ffmpeg -v error -y -i "$WORK/take.mp4" -vf "scale=1920:-2" -frames:v 1 -q:v 3 "$OUT/poster.jpg"

echo "desktop: $(ls "$OUT/desktop" | wc -l) frames, $(du -sh "$OUT/desktop" | cut -f1)"
echo "phone:   $(ls "$OUT/phone" | wc -l) frames, $(du -sh "$OUT/phone" | cut -f1)"
