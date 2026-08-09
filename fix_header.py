content = open(r'C:\Users\raund\Desktop\portfolio\yeda\components\layout\Header.tsx', encoding='utf-8').read()
content = content.replace("import { useState } from 'react'", "import { useState, useEffect } from 'react'")
content = content.replace(
  "  const [authed] = useState(false)",
  """  const [authed, setAuthed] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(data => {
      if (data.user) { setAuthed(true); setUserRole(data.user.role) }
    }).catch(() => {})
  }, [])"""
)
content = content.replace(
  '            Р›РёС‡РЅС‹Р№ РєР°Р±РёРЅРµС‚',
  '            Личный кабинет'
)
open(r'C:\Users\raund\Desktop\portfolio\yeda\components\layout\Header.tsx', 'w', encoding='utf-8').write(content)
print('OK')
