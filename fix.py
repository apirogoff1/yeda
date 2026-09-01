with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\subscription\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden', minHeight: 'auto'",
    "minHeight: 'auto', paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden'"
)

with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\subscription\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')