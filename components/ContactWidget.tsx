"use client"

import { useState } from "react"

export default function ContactWidget() {
  const [open, setOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tooltip, setTooltip] = useState("")

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return
    setLoading(true)
    try {
      await fetch("/api/clinic/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setSent(true)
      setForm({ name: "", phone: "", message: "" })
    } catch {
      alert("Ошибка отправки. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  const TOOLTIP_TEXT = "Интеграция настраивается индивидуально под каждый проект. На вашем сайте здесь будет прямой чат с администратором клиники."

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {open && !showForm && (
        <div className="flex flex-col items-end gap-2 mb-1">

          <div className="relative">
            <button
              onMouseEnter={() => setTooltip("max")}
              onMouseLeave={() => setTooltip("")}
              onClick={() => setTooltip(tooltip === "max" ? "" : "max")}
              className="flex items-center gap-2 bg-orange-500 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition-all text-sm"
            >
              <span className="text-base">💬</span>
              MAX
            </button>
            {tooltip === "max" && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                {TOOLTIP_TEXT}
                <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-gray-900 rotate-45" />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onMouseEnter={() => setTooltip("vk")}
              onMouseLeave={() => setTooltip("")}
              onClick={() => setTooltip(tooltip === "vk" ? "" : "vk")}
              className="flex items-center gap-2 bg-blue-500 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all text-sm"
            >
              <span className="text-base">🔵</span>
              ВКонтакте
            </button>
            {tooltip === "vk" && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                {TOOLTIP_TEXT}
                <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-gray-900 rotate-45" />
              </div>
            )}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-500 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all text-sm"
          >
            <span className="text-base">✉️</span>
            Оставить заявку
          </button>

          
          <a
            href="tel:+79962408586"
            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
          >
            <span className="text-base">📞</span>
            Позвонить
          </a>

        </div>
      )}

      {open && showForm && (
        <div className="bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Оставить заявку</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-lg">назад</button>
          </div>
          {sent ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-gray-700 font-medium">Заявка отправлена!</p>
              <p className="text-sm text-gray-500 mt-1">Мы свяжемся с вами в течение часа</p>
              <button
                onClick={() => { setSent(false); setShowForm(false); setOpen(false) }}
                className="mt-4 text-blue-600 text-sm hover:underline"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
              <textarea
                placeholder="Ваш вопрос"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={3}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.phone}
                className="bg-blue-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Отправляем..." : "Отправить"}
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => { setOpen(!open); setShowForm(false); setTooltip("") }}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center text-2xl hover:scale-105"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  )
}