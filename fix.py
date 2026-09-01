with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\orders\[id]\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "if (user.role !== 'ADMIN') router.push('/login')",
    "if ((user.role as string) !== 'ADMIN') router.push('/login')"
)

with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\orders\[id]\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')