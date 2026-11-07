"""Extract the 'nine' glyph outline from Instrument Serif (SIL OFL) as an SVG path.
Output: src/data/glyph-nine.json  {path, unitsPerEm, advance, bounds}
Run: python3 scripts/extract-glyph.py
"""
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

f = TTFont("src/fonts/instrument-serif-latin-400-normal.woff2")
gs = f.getGlyphSet()
name = f.getBestCmap()[ord("9")]
pen = SVGPathPen(gs)
gs[name].draw(pen)
bp = BoundsPen(gs)
gs[name].draw(bp)
out = {
    "glyph": name,
    "path": pen.getCommands(),
    "unitsPerEm": f["head"].unitsPerEm,
    "bounds": bp.bounds,
    "source": "Instrument Serif Regular, SIL Open Font License 1.1",
}
json.dump(out, open("src/data/glyph-nine.json", "w"), indent=1)
print(name, out["bounds"], len(out["path"]))
