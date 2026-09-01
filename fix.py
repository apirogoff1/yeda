with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\orders\[id]\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params",
    "// @ts-ignore\nexport default function OrderPage({ params }: { params: { id: string } }) {\n  const id = params.id"
)

with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\orders\[id]\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')