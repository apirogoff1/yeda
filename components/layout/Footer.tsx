"use client"
import Link from "next/link"
import { useState } from "react"

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "16px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontFamily: "Manrope, sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "#241F1C",
          letterSpacing: "0.01em",
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: "18px", color: "#FF4B16", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "4px 0 16px 0" }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: "transparent", position: "relative", overflow: "hidden", marginTop: "0px" }}>
      <div className="footer-wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px 28px" }}>

        {/* DESKTOP */}
        <div className="footer-desktop">
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "28px", fontWeight: 700, color: "#241F1C", marginBottom: "8px", lineHeight: 1.2, letterSpacing: "-0.02em", textAlign: "center" }}>
            {"Спасибо, что выбираете нас"}
          </p>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 500, color: "#5F5751", marginBottom: "48px", lineHeight: 1.5, textAlign: "center" }}>
            {"Мы всегда рады доставить Вам удовольствие"}
          </p>

          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr", gap: "40px", alignItems: "start" }}>

            <div>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "30px", fontWeight: 800, color: "#FF4B16", letterSpacing: "-0.02em", marginBottom: "12px" }}>YEDA</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 400, color: "#8C7B6E", lineHeight: 1.6 }}>
                {"Доставка еды за 30 минут"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "37px" }}>
              {[
                { label: "Главная", href: "/" },
                { label: "Меню", href: "/menu" },
                { label: "Как работает", href: "/how-it-works" },
                { label: "Подписка", href: "/subscription" },
                { label: "О компании", href: "/about" },
                { label: "Корзина", href: "/cart" },
                { label: "Личный кабинет", href: "/dashboard" },
              ].map((link) => (
                <Link key={link.href + link.label} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5, letterSpacing: "0.01em" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF4B16" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#252525" }}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "37px" }}>
              {[
                { label: "Бургеры", href: "/menu#BURGERY" },
                { label: "Пицца", href: "/menu#PIZZA" },
                { label: "Роллы", href: "/menu#ROLLY" },
                { label: "Салаты", href: "/menu#SALATY" },
                { label: "Закуски", href: "/menu#ZAKUSKI" },
                { label: "Супы", href: "/menu#SUPY" },
                { label: "Паста", href: "/menu#PASTA" },
              ].map((link) => (
                <Link key={link.href + link.label} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5, letterSpacing: "0.01em" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF4B16" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#252525" }}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "37px" }}>
              {[
                { label: "Хинкали", href: "/menu#KHINKALI" },
                { label: "Стейки", href: "/menu#STEYKI" },
                { label: "Десерты", href: "/menu#DESERTY" },
                { label: "Напитки", href: "/menu#NAPITKI" },
                { label: "Соусы", href: "/menu#SOUSY" },
                { label: "Кофе", href: "/menu#KOFE" },
                { label: "Чай", href: "/menu#CHAY" },
              ].map((link) => (
                <Link key={link.href + link.label} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5, letterSpacing: "0.01em" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF4B16" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#252525" }}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 700, color: "#241F1C", marginBottom: "20px", letterSpacing: "0.01em" }}>
                {"Связаться с нами"}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {[
                  { label: "FAQ", href: "/faq" },
                  { label: "Контакты", href: "/contacts" },
                  { label: "Доставка", href: "/delivery" },
                  { label: "Политика конфиденциальности", href: "/privacy" },
                ].map((link) => (
                  <Link key={link.href + link.label} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5, letterSpacing: "0.01em" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF4B16" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#252525" }}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <a href="https://t.me/yeda" title="Telegram" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                  <img src="/photo_yeda/telegram.png" alt="Telegram" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>Telegram</span>
                </a>
                <a href="#" title="MAX" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                  <img src="/photo_yeda/MAX_Messenger.png" alt="MAX" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>MAX</span>
                </a>
                <a href="tel:+74951234567" title="Телефон" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                  <img src="/photo_yeda/phone.png" alt="Телефон" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>{"Тел."}</span>
                </a>
                <a href="mailto:apirogoff1@gmail.com" title="Email" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                  <img src="/photo_yeda/email.png" alt="Email" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>Email</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* MOBILE */}
        <div className="footer-mobile">

          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "30px", fontWeight: 800, color: "#FF4B16", letterSpacing: "-0.02em", marginBottom: "6px" }}>YEDA</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 400, color: "#8C7B6E", lineHeight: 1.6 }}>
              {"Доставка еды за 30 минут"}
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", marginBottom: "24px", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "22px", fontWeight: 700, color: "#241F1C", marginBottom: "8px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              {"Спасибо, что выбираете нас"}
            </p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 500, color: "#5F5751", lineHeight: 1.5 }}>
              {"Мы всегда рады доставить Вам удовольствие"}
            </p>
          </div>

          <div>
            <MobileAccordion title={"Навигация"}>
              {[
                { label: "Главная", href: "/" },
                { label: "Меню", href: "/menu" },
                { label: "Как работает", href: "/how-it-works" },
                { label: "Подписка", href: "/subscription" },
                { label: "О компании", href: "/about" },
                { label: "Корзина", href: "/cart" },
                { label: "Личный кабинет", href: "/dashboard" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5 }}>
                  {link.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion title={"Меню — часть 1"}>
              {[
                { label: "Бургеры", href: "/menu#BURGERY" },
                { label: "Пицца", href: "/menu#PIZZA" },
                { label: "Роллы", href: "/menu#ROLLY" },
                { label: "Салаты", href: "/menu#SALATY" },
                { label: "Закуски", href: "/menu#ZAKUSKI" },
                { label: "Супы", href: "/menu#SUPY" },
                { label: "Паста", href: "/menu#PASTA" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5 }}>
                  {link.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion title={"Меню — часть 2"}>
              {[
                { label: "Хинкали", href: "/menu#KHINKALI" },
                { label: "Стейки", href: "/menu#STEYKI" },
                { label: "Десерты", href: "/menu#DESERTY" },
                { label: "Напитки", href: "/menu#NAPITKI" },
                { label: "Соусы", href: "/menu#SOUSY" },
                { label: "Кофе", href: "/menu#KOFE" },
                { label: "Чай", href: "/menu#CHAY" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5 }}>
                  {link.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion title={"Помощь"}>
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Контакты", href: "/contacts" },
                { label: "Доставка", href: "/delivery" },
                { label: "Политика конфиденциальности", href: "/privacy" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "#252525", textDecoration: "none", lineHeight: 1.5 }}>
                  {link.label}
                </Link>
              ))}
            </MobileAccordion>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "32px", marginBottom: "8px" }}>
            <a href="https://t.me/yeda" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <img src="/photo_yeda/telegram.png" alt="Telegram" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>Telegram</span>
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <img src="/photo_yeda/MAX_Messenger.png" alt="MAX" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>MAX</span>
            </a>
            <a href="tel:+74951234567" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <img src="/photo_yeda/phone.png" alt="Телефон" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>{"Тел."}</span>
            </a>
            <a href="mailto:apirogoff1@gmail.com" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <img src="/photo_yeda/email.png" alt="Email" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", color: "#8C7B6E" }}>Email</span>
            </a>
          </div>

        </div>

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: "40px", paddingTop: "20px", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 400, color: "#B0A090" }}>
            {"© 2026 YEDA"}
          </p>
        </div>

      </div>

      <style>{`
        .footer-desktop { display: block; }
        .footer-mobile { display: none; }
        @media (max-width: 768px) {
          .footer-desktop { display: none; }
          .footer-mobile { display: block; }
          .footer-wrap { padding: 40px 20px 24px !important; }
        }
      `}</style>

    </footer>
  )
}
