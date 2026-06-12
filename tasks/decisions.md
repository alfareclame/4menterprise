# Decisions log

_Every deviation from spec, with one-line rationale._

1. **Extra kleurtoken `--color-kraan-diep` (#C24A05):** wit op kraan (#E8590C) haalt 3.47:1 — onder de 4.5:1-eis van 8.1. Knopachtergronden gebruiken kraan-diep (4.75:1 met wit); kraan blijft het accent voor dots, lijnen en focus-ring (non-tekst). Toegestaan door 8.1 ("adjust lightness minimally if a pair fails").
2. **Extra kleurtoken `--color-staal-licht` (#9DB0BD):** staal (#51616F) op havennacht haalt 2.7:1 — eyebrows/captions in de donkere innovatie-sectie gebruiken staal-licht (7.7:1).
3. **Favicon-tekst in systeemfont:** `icon.svg` gebruikt een system-ui stack voor "4M"; Bricolage-outlines embedden in een favicon-SVG is niet praktisch zonder font-tooling. CurrentColor-safe met expliciete kleurfallback op de root.
