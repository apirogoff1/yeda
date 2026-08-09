import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store'
import type { LoginDto, RegisterDto } from '../model/schemas'

async function loginRequest(data: LoginDto) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Oshibka vkhoda')
  return json
}

async function registerRequest(data: RegisterDto) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Oshibka registratsii')
  return json
}

export function useLogin() {
  const login = useAuthStore(state => state.login)
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.user, data.token)
    },
  })
}

export function useRegister() {
  const login = useAuthStore(state => state.login)
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      login(data.user, data.token)
    },
  })
}
