"use client"
import React, { useState, useEffect, useRef } from "react"
import { useCart } from "@/context/CartContext"
import { useAuthStore } from "@/store"

interface Dish {
  name: string
  composition: string
  kcal: number
  price: number
}

interface MenuSectionProps {
  id: string
  title: string
  emoji: string
  photo: string
  dishes: Dish[]
  grad: string
  shadow: string
  accentColor: string
  photoScale?: number
  photoBottom?: number
  overlayOpacity?: number
  overlayGradient?: string
}

export default function MenuSection({ id, title, emoji, photo, dishes, grad, shadow, accentColor, photoScale = 1, photoBottom = -7, overlayOpacity = 0.35, overlayGradient = "linear-gradient(to right, rgba(255,247,238,0.85) 0%, rgba(255,247,238,0.3) 50%, rgba(255,247,238,0) 100%)" }: MenuSectionProps) {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden-mobile" style={{ marginBottom: "120px", padding: "0 32px" }}>
        <section id={id} className="burger-banner" style={{ backgroundImage: `url(${photo})`, backgroundSize: `${Math.round(60 * photoScale)}%`, backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
          <div style={{ position: "absolute", inset: 0, background: overlayGradient ? overlayGradient : `rgba(255,247,238,${overlayOpacity})`, zIndex: 1 }} />
          <div className="burger-right" style={{ width: "100%", padding: "40px 80px", position: "relative", zIndex: 2 }}>
            <div className="burger-title">{title}</div>
            <div className="dish-list">
              {dishes.map((dish, i) => (
                <DishRow key={i} dish={dish} last={i === dishes.length - 1} sectionId={id} photo={photo} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE */}
      <div className="show-mobile" id={id} style={{ flexDirection: "column", marginBottom: "48px", padding: "0 16px" }}>
        {/* Title */}
        <div style={{
          fontFamily: "var(--font-nunito)",
          fontSize: "28px",
          fontWeight: 900,
          color: accentColor,
          marginBottom: "12px",
          paddingLeft: "4px",
        }}>{title}</div>

        {/* Photo */}
        <div style={{
          width: "100%",
          height: "200px",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "16px",
          background: "rgba(255,247,238,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img src={photo} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        {/* Carousel */}
        <MobileCarousel dishes={dishes} sectionId={id} photo={photo} accentColor={accentColor} />
      </div>
    </>
  )
}

function MobileCarousel({ dishes, sectionId, photo, accentColor }: { dishes: Dish[]; sectionId: string; photo: string; accentColor: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showArrow, setShowArrow] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          paddingBottom: "8px",
        }}
      >
        {dishes.map((dish, i) => (
          <div key={i} style={{
            minWidth: "80vw",
            maxWidth: "80vw",
            scrollSnapAlign: "start",
            background: "rgba(255,247,238,0.9)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#999", fontFamily: "var(--font-nunito)" }}>{dish.kcal} ккал</span>
            <h3 style={{ margin: 0, fontSize: "23px", fontWeight: 900, color: accentColor, fontFamily: "var(--font-nunito)", lineHeight: 1.2 }}>{dish.name}</h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#666", fontFamily: "var(--font-nunito)", fontWeight: 600, lineHeight: 1.5 }}>{dish.composition}</p>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "22px", fontWeight: 700, color: accentColor, fontFamily: "var(--font-nunito)" }}>{dish.price}₽</span>
              <DishRowMobile dish={dish} sectionId={sectionId} photo={photo} accentColor={accentColor} />
            </div>
          </div>
        ))}
      </div>

      {/* Arrow */}
      {showArrow && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          animation: "arrow-pulse 1.2s ease-in-out infinite",
          fontSize: "28px",
          color: accentColor,
          textShadow: "0 0 8px rgba(255,255,255,0.9)",
        }}>&#8250;</div>
      )}

      <style>{`
        @keyframes arrow-pulse {
          0%, 100% { opacity: 1; transform: translateY(-50%) translateX(0); }
          50% { opacity: 0.4; transform: translateY(-50%) translateX(5px); }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}

function DishRowMobile({ dish, sectionId, photo, accentColor }: { dish: Dish; sectionId: string; photo: string; accentColor: string }) {
  const { addItem, updateQty, items } = useCart()
  const { isAuthenticated } = useAuthStore()
  const [bouncing, setBouncing] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteId, setFavoriteId] = useState<string | null>(null)
  const [favLoading, setFavLoading] = useState(false)

  const itemId = `${sectionId}-${dish.name}`
  const cartItem = items.find(i => (i.dishId ?? i.id) === itemId)
  const qty = cartItem ? cartItem.quantity : 0

  useEffect(() => {
    if (!isAuthenticated) return
    fetch("/api/favorites")
      .then(r => r.json())
      .then(data => {
        const found = data.favorites?.find((f: any) => f.dishName === dish.name)
        if (found) {
          setIsFavorite(true)
          setFavoriteId(found.id)
        }
      })
      .catch(() => {})
  }, [isAuthenticated, dish.name])

  const handleFavorite = async () => {
    if (!isAuthenticated || favLoading) return
    setFavLoading(true)
    try {
      if (isFavorite && favoriteId) {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: favoriteId }),
        })
        setIsFavorite(false)
        setFavoriteId(null)
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dishName: dish.name, price: dish.price }),
        })
        const data = await res.json()
        setIsFavorite(true)
        setFavoriteId(data.favorite?.id || null)
      }
    } catch {}
    setFavLoading(false)
  }

  const handleAdd = () => {
    addItem({ dishId: itemId, name: dish.name, price: dish.price, image: photo })
    setBouncing(true)
    setTimeout(() => setBouncing(false), 400)
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {isAuthenticated && (
        <button onClick={handleFavorite} disabled={favLoading} style={{ background: "none", border: "none", cursor: favLoading ? "default" : "pointer", fontSize: "22px", lineHeight: 1, padding: "4px", opacity: favLoading ? 0.5 : 1, transition: "transform 0.15s", transform: isFavorite ? "scale(1.2)" : "scale(1)", flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="favGradMobile" x1="4" y1="4" x2="20" y2="20">
                <stop offset="0%" stopColor="#ff4f3d" />
                <stop offset="100%" stopColor="#e52f63" />
              </linearGradient>
            </defs>
            <path d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5C2 4.42 4.42 2 7.5 2C9.24 2 10.91 2.81 12 4.09C13.09 2.81 14.76 2 16.5 2C19.58 2 22 4.42 22 7.5C22 11.28 18.6 14.36 13.45 19.04L12 20.35Z"
              fill={isFavorite ? "url(#favGradMobile)" : "none"}
              stroke={isFavorite ? "none" : "#8d2027"}
              strokeWidth="1.7" strokeLinejoin="round" />
            {isFavorite && (
              <path d="M7.2 6.2c.45-1 1.35-1.55 2.45-1.7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      )}
      {qty === 0 ? (
        <button onClick={handleAdd} style={{ background: accentColor, color: "#fff", border: "none", borderRadius: "50px", padding: "10px 20px", fontSize: "14px", fontWeight: 800, fontFamily: "var(--font-nunito)", cursor: "pointer", boxShadow: `0 4px 12px ${accentColor}55` }}>В корзину</button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => updateQty(cartItem?.id ?? itemId, qty - 1)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: `2px solid ${accentColor}`, background: "none", color: accentColor, fontSize: "18px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
          <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "16px", color: "#433932", minWidth: "20px", textAlign: "center" }}>{qty}</span>
          <button onClick={() => updateQty(cartItem?.id ?? itemId, qty + 1)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: `2px solid ${accentColor}`, background: "none", color: accentColor, fontSize: "18px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        </div>
      )}
    </div>
  )
}

function DishRow({ dish, last, sectionId, photo }: { dish: { name: string; composition: string; kcal: number; price: number }; last: boolean; sectionId: string; photo: string }) {
  const { addItem, updateQty, items } = useCart()
  const { isAuthenticated } = useAuthStore()
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteId, setFavoriteId] = useState<string | null>(null)
  const [favLoading, setFavLoading] = useState(false)
  const [bouncing, setBouncing] = useState(false)

  const itemId = `${sectionId}-${dish.name}`
  const cartItem = items.find(i => (i.dishId ?? i.id) === itemId)
  const qty = cartItem ? cartItem.quantity : 0

  useEffect(() => {
    if (!isAuthenticated) return
    fetch("/api/favorites")
      .then(r => r.json())
      .then(data => {
        const found = data.favorites?.find((f: any) => f.dishName === dish.name)
        if (found) {
          setIsFavorite(true)
          setFavoriteId(found.id)
        }
      })
      .catch(() => {})
  }, [isAuthenticated, dish.name])

  const handleFavorite = async () => {
    if (!isAuthenticated || favLoading) return
    setFavLoading(true)
    try {
      if (isFavorite && favoriteId) {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: favoriteId }),
        })
        setIsFavorite(false)
        setFavoriteId(null)
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dishName: dish.name, price: dish.price }),
        })
        const data = await res.json()
        setIsFavorite(true)
        setFavoriteId(data.favorite?.id || null)
      }
    } catch {}
    setFavLoading(false)
  }

  const handleAdd = () => {
    addItem({ dishId: itemId, name: dish.name, price: dish.price, image: photo })
    setBouncing(true)
    setTimeout(() => setBouncing(false), 400)
  }

  return (
    <div className={`dish-row${last ? " dish-row--last" : ""}`}>
      <div className="dish-row-main">
        <span className="product-calories">{dish.kcal} ккал</span>
        <h3 className="dish-row-name">{dish.name}</h3>
        <p className="dish-row-composition">{dish.composition}</p>
      </div>
      <div className="dish-row-footer">
        <span className="product-price">{dish.price}₽</span>
        {isAuthenticated && (
          <button
            onClick={handleFavorite}
            disabled={favLoading}
            style={{
              background: "none", border: "none", cursor: favLoading ? "default" : "pointer",
              fontSize: "22px", lineHeight: 1, padding: "4px",
              opacity: favLoading ? 0.5 : 1, transition: "transform 0.15s",
              transform: isFavorite ? "scale(1.2)" : "scale(1)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className={isFavorite ? "favorite-heart active" : "favorite-heart"}>
              <defs>
                <linearGradient id="favoriteHeartGradient" x1="4" y1="4" x2="20" y2="20">
                  <stop offset="0%" stopColor="#ff4f3d" />
                  <stop offset="100%" stopColor="#e52f63" />
                </linearGradient>
              </defs>
              <path d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5C2 4.42 4.42 2 7.5 2C9.24 2 10.91 2.81 12 4.09C13.09 2.81 14.76 2 16.5 2C19.58 2 22 4.42 22 7.5C22 11.28 18.6 14.36 13.45 19.04L12 20.35Z"
                fill={isFavorite ? "url(#favoriteHeartGradient)" : "none"}
                stroke={isFavorite ? "none" : "#8d2027"}
                strokeWidth="1.7" strokeLinejoin="round" />
              {isFavorite && (
                <path d="M7.2 6.2c.45-1 1.35-1.55 2.45-1.7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        )}
        {qty === 0 ? (
          <button className={`product-button${bouncing ? " product-button--bounce" : ""}`} onClick={handleAdd}>В корзину</button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => updateQty(cartItem?.id ?? itemId, qty - 1)} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "2px solid #FF4D00", background: "none", color: "#FF4D00", fontSize: "20px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
            <span style={{ fontFamily: "var(--font-comfortaa)", fontWeight: 700, fontSize: "18px", color: "#433932", minWidth: "20px", textAlign: "center" }}>{qty}</span>
            <button onClick={() => updateQty(cartItem?.id ?? itemId, qty + 1)} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "2px solid #FF4D00", background: "none", color: "#FF4D00", fontSize: "20px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
        )}
      </div>
    </div>
  )
}
