import FloatingShapesShort from "@/components/home/FloatingShapesShort"

export default function PrivacyPage() {
  return (
    <main style={{ background: "#F5EAD8", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px", position: "relative", overflow: "clip" }}>
      <FloatingShapesShort />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 40px" }}>
        <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "40px", fontWeight: 700, color: "#241F1C", marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {"Политика конфиденциальности"}
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "#5F5751", marginBottom: "48px", fontWeight: 500 }}>
          {"Обновлено: январь 2026"}
        </p>

        {[
          {
            title: "Что мы собираем",
            text: "Мы собираем только те данные, которые необходимы для оформления и доставки заказа: имя, номер телефона, адрес доставки и адрес электронной почты. Мы не передаём ваши данные третьим лицам."
          },
          {
            title: "Как мы используем данные",
            text: "Ваши данные используются исключительно для обработки заказов, связи с вами по вопросам доставки и улучшения качества нашего сервиса."
          },
          {
            title: "Хранение данных",
            text: "Мы храним ваши данные на защищённых серверах и не дольше, чем это необходимо. По вашему запросу мы удалим все ваши данные в течение 5 рабочих дней."
          },
          {
            title: "Ценные файлы цены cookie",
            text: "Мы используем файлы cookie для улучшения работы сайта и аналитики. Вы можете отключить их в настройках браузера."
          },
          {
            title: "Ваши права",
            text: "Вы вправе запросить доступ к своим данным, исправить или удалить их. Для связи напишите нам на электронную почту: privacy@yeda.ru"
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: 700, color: "#241F1C", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              {section.title}
            </h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 400, color: "#5F5751", lineHeight: 1.7 }}>
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
