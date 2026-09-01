t = ': { src: string; top: number; left: number; w: number; rotate: number }[]'

files = [
    r'C:\Users\raund\Desktop\portfolio\yeda\app\menu\page.tsx',
    r'C:\Users\raund\Desktop\portfolio\yeda\app\dashboard\page.tsx',
]

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('const pageDekor_brushes = [', f'const pageDekor_brushes{t} = [')
    content = content.replace('const pageDekor_drops = [', f'const pageDekor_drops{t} = [')
    content = content.replace('const pageDekor_veggies = [', f'const pageDekor_veggies{t} = [')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Done: {path}')