# Director photographs

These are the Centre's own official photographs of **Prof. Owapriba Prayer Abu**, Director of
the Centre for Gender, Conflict and Development Studies (CGCDS-Uniport). They are the only
images permitted to stand in for her anywhere on the site — no stock photography is used for
the Director.

| File | Use |
| --- | --- |
| `prof-owapriba-abu.jpg` | The one photograph of the Director used site-wide: her news story cover, news cards, social preview, avatars, the "Office of the Director" cards and the staff directory (236×400). Wide slots crop it face-first with `object-[50%_14%]`. |
| `prof-owapriba-abu-source-300x200.jpg` | Unaltered source image, kept so a cleaner crop can be made later. |

Source: the CGCDS Uniport site banner at `cgcds.com.ng` (uploaded 2025/10), which is a
300×200 graphic. The portrait is the right-hand figure; the crop is `118×200+182+0` with a
mild unsharp mask only — the photograph itself is otherwise unretouched.

## Swapping in a higher-resolution photo

The original file is small, so the portrait is a 2× upscale. When the directorate supplies a
larger photograph, replace the files in place and the whole site updates:

```bash
# portrait (any ~3:5 crop, head near the top third)
convert /path/to/director.jpg -resize 720x1200^ -gravity north -extent 720x1200 \
  -quality 92 public/images/prof-owapriba-abu.jpg
```

Keep the same filename — `src/lib/content.ts` (`DIRECTOR_PORTRAIT`) is the single place it is
referenced, and the news components anchor their crops on `object-[50%_14%]`, so put her face
in the upper part of the frame when you crop.
