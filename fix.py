path = r"C:\Users\raund\Desktop\portfolio\yeda\app\subscription\page.tsx"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<a href="#plans" style={btn}>\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0443</a>\n            <Link href="/ai-chat" style={btnOutline}>\u0421\u043f\u0440\u043e\u0441\u0438\u0442\u044c AI</Link>',
    '<Link href="/ai-chat" style={btnOutline}>\u0421\u043f\u0440\u043e\u0441\u0438\u0442\u044c AI</Link>'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")