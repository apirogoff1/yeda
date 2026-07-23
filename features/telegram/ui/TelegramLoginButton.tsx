"use client";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
export function TelegramLoginButton() {
  const ref = useRef<HTMLDivElement>(null);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  useEffect(() => {
    if (!ref.current) return;
    const botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "mybot";
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    ref.current.appendChild(script);
    (window as any).onTelegramAuth = async (user: Record<string, string>) => {
      try {
        const res = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          router.push("/dashboard");
        } else {
          alert("Ошибка входа через Telegram");
        }
      } catch {
        alert("Ошибка соединения");
      }
    };
    return () => {
      if (ref.current) ref.current.innerHTML = "";
      delete (window as any).onTelegramAuth;
    };
  }, []);
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-slate-400">или</p>
      <div ref={ref} />
    </div>
  );
}