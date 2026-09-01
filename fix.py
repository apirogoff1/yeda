with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "'use client'\nimport { useEffect, useState } from 'react'\nimport { useRouter, useSearchParams } from 'next/navigation'",
    "'use client'\nimport { useEffect, useState, Suspense } from 'react'\nimport { useRouter, useSearchParams } from 'next/navigation'"
)

content = content.replace(
    "export default function AdminPage() {",
    "function AdminPageInner() {"
)

content = content + """
export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminPageInner />
    </Suspense>
  )
}
"""

with open(r'C:\Users\raund\Desktop\portfolio\yeda\app\admin\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')