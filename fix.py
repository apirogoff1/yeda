with open(r'C:\Users\raund\Desktop\portfolio\yeda\components\home\HeroSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "<button onClick={() => window.location.href = '/ai-chat'} style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '16px', backgroundColor: '#A855F7', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 36px', cursor: 'pointer' }}>\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c AI</button>",
    "<button onClick={() => window.location.href = '/ai-chat'} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#9333EA')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#A855F7')} style={{ fontFamily: 'var(--font-comfortaa)', fontWeight: 700, fontSize: '17px', backgroundColor: '#A855F7', color: '#fff', border: 'none', borderRadius: '50px', padding: '16px 44px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.5)', transition: 'background-color 0.2s ease' }}>\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c AI</button>"
)

with open(r'C:\Users\raund\Desktop\portfolio\yeda\components\home\HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')