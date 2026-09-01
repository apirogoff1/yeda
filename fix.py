with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "if (!user || user.role !== 'ADMIN') {",
    "if (!user || (user.role as string) !== 'ADMIN') {"
)

with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')