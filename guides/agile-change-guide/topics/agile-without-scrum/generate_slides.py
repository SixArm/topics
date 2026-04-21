#!/usr/bin/env python3
"""Generate business presentation slides from agile-without-scrum content."""

import os
from PIL import Image, ImageDraw, ImageFont

W, H = 640, 640
BG = "#FFFFFF"
TEXT = "#001E60"

FONT_PATH = "/Library/Fonts/OpenSans[wdth,wght].ttf"


def load_font(size):
    font = ImageFont.truetype(FONT_PATH, size)
    font.set_variation_by_axes([700, 75])  # Bold, Condensed
    return font


FONT_HEADLINE = load_font(44)
FONT_BODY = load_font(30)


def wrap_text(text, font, max_width, draw):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def make_slide(title, bullets):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    margin = 50
    max_w = W - 2 * margin

    # Headline
    lines = wrap_text(title, FONT_HEADLINE, max_w, draw)
    y = margin
    for line in lines:
        draw.text((margin, y), line, fill=TEXT, font=FONT_HEADLINE)
        bbox = draw.textbbox((0, 0), line, font=FONT_HEADLINE)
        y += (bbox[3] - bbox[1]) + 10
    y += 30

    # Key points (no bullets, one per line)
    for point in bullets:
        point_lines = wrap_text(point, FONT_BODY, max_w, draw)
        for line in point_lines:
            draw.text((margin, y), line, fill=TEXT, font=FONT_BODY)
            bbox = draw.textbbox((0, 0), line, font=FONT_BODY)
            y += (bbox[3] - bbox[1]) + 8
        y += 32

    return img


def main():
    os.makedirs("slides", exist_ok=True)

    slides_data = [
        (
            "Agile Without Scrum",
            [
                "Rich ecosystem beyond Scrum",
                "Iterative development & collaboration",
                "Adaptive planning & delivery",
            ],
        ),
        (
            "Extreme Programming",
            [
                "Pair programming & TDD",
                "Continuous integration",
                "Refactoring & collective ownership",
            ],
        ),
        (
            "Kanban",
            [
                "Visual workflow management",
                "Work-in-progress limits",
                "Continuous flow & bottleneck visibility",
            ],
        ),
        (
            "Lean Software Development",
            [
                "Waste elimination",
                "Amplify learning",
                "Deliver value quickly",
            ],
        ),
        (
            "FDD and Crystal",
            [
                "Feature-driven development",
                "Suited for larger projects",
                "Crystal: tailored to team size & criticality",
            ],
        ),
        (
            "Hybrid Approaches",
            [
                "Combine multiple methodologies",
                "Individuals & collaboration over process",
                "Responding to change over plans",
            ],
        ),
    ]

    for i, (title, bullets) in enumerate(slides_data, 1):
        img = make_slide(title, bullets)
        path = f"slides/{i}.png"
        img.save(path, "PNG")
        print(f"Saved {path}")


if __name__ == "__main__":
    main()
