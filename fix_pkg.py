import json
with open(r'C:\Users\raund\Desktop\portfolio\yeda\package.json', encoding='utf-8') as f:
    pkg = json.load(f)
pkg['scripts']['seed'] = 'npx tsx prisma/seed.ts'
pkg['prisma'] = { 'seed': 'npx tsx prisma/seed.ts' }
with open(r'C:\Users\raund\Desktop\portfolio\yeda\package.json', 'w', encoding='utf-8') as f:
    json.dump(pkg, f, indent=4, ensure_ascii=False)
print('OK')
