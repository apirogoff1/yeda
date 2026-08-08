import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const HERO_PATH = path.join(process.cwd(), "components", "home", "HeroSection.tsx");

export async function GET() {
  const content = fs.readFileSync(HERO_PATH, "utf8");
  const parseArray = (name: string) => {
    const start = content.indexOf(`const ${name} = [`);
    const end = content.indexOf("]", start) + 1;
    const block = content.slice(start, end);
    const matches = [...block.matchAll(/\{([^}]+)\}/g)];
    return matches.map(m => {
      const p = (k: string) => {
        const match = m[1].match(new RegExp(`${k}:\\s*([^,}]+)`));
        return match ? match[1].trim() : "";
      };
      return {
        src: p("src").replace(/'/g, ""),
        top: Number(p("top")),
        left: Number(p("left")),
        w: Number(p("w")),
        rotate: Number(p("rotate")),
      };
    });
  };
  const blockIds = ["block-title","block-tags","block-btns","block-fresh","block-fresh-tag-1","block-delivery","block-delivery-tag-1","block-delivery-tag-2","block-how","block-why","block-ai","block-ai-tag-1","block-ai-btn","block-sub","block-sub-tag-1","block-social","block-footer"];
  const blocks = blockIds.map(id => {
    const marker = `{/* BLOCK:${id} */}`;
    const mi = content.indexOf(marker);
    if (mi === -1) return { id, top: 0, left: 0, w: 0 };
    const after = content.slice(mi);
    const m = after.match(/top: (\d+), left: (\d+)/);
    const wm = after.match(/maxWidth: '(\d+)px'|width: (\d+)/);
    return { id, top: m ? Number(m[1]) : 0, left: m ? Number(m[2]) : 0, w: wm ? Number(wm[1] || wm[2]) : 0 };
  });
  return NextResponse.json({
    brushes: parseArray("brushes"),
    drops: parseArray("drops"),
    veggies: parseArray("veggies"),
    dishes: parseArray("dishes"),
    blocks,
  });
}

export async function POST(req: NextRequest) {
  const { elements } = await req.json();
  let content = fs.readFileSync(HERO_PATH, "utf8");

  const brushes = elements.filter((e: any) => e.type === "brush");
  const drops   = elements.filter((e: any) => e.type === "drop");
  const veggies = elements.filter((e: any) => e.type === "veggie");
  const dishes  = elements.filter((e: any) => e.type === "dish");
  const blocks  = elements.filter((e: any) => e.type === "block");

  const toLine = (e: any) =>
    `  { src: '${e.src}', top: ${e.y}, left: ${e.x}, w: ${e.w}, rotate: ${e.rotate} },`;

  const replaceArray = (c: string, name: string, items: any[]) => {
    const start = c.indexOf(`const ${name} = [`);
    const end = c.indexOf("]", start) + 1;
    const newBlock = `const ${name} = [\n${items.map(e => toLine(e)).join("\n")}\n]`;
    return c.slice(0, start) + newBlock + c.slice(end);
  };

  content = replaceArray(content, "brushes", brushes);
  content = replaceArray(content, "drops",   drops);
  content = replaceArray(content, "veggies", veggies);
  content = replaceArray(content, "dishes",  dishes);

  // Blocks: find by BLOCK:id marker, replace top/left in nearest style
  for (const b of blocks) {
    const marker = `{/* BLOCK:${b.id} */}`;
    const markerIdx = content.indexOf(marker);
    if (markerIdx === -1) continue;
    const after = content.slice(markerIdx);
    const styleMatch = after.match(/style=\{\{[^\n]*position: 'absolute'[^\n]*top: (\d+)[^\n]*left: (\d+)/);
    if (!styleMatch) continue;
    const styleIdx = markerIdx + after.indexOf(styleMatch[0]);
    const oldStyle = styleMatch[0];
    const newStyle = oldStyle.replace(/top: \d+/, `top: ${b.y}`).replace(/left: \d+/, `left: ${b.x}`);
    content = content.slice(0, styleIdx) + newStyle + content.slice(styleIdx + oldStyle.length);
  }
  fs.writeFileSync(HERO_PATH, content, "utf8");
  return NextResponse.json({ ok: true });
}
