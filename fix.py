with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\payment-success\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'const pageDekor_drops = [',
    'const pageDekor_drops: never[] = ['
)

with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\payment-success\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')