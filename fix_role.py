content = open(r'C:\Users\raund\Desktop\portfolio\yeda\features\auth\ui\LoginForm.tsx', encoding='utf-8').read()
content = content.replace("data.user.role === 'admin'", "data.user.role === 'ADMIN'")
open(r'C:\Users\raund\Desktop\portfolio\yeda\features\auth\ui\LoginForm.tsx', 'w', encoding='utf-8').write(content)
print('OK')
