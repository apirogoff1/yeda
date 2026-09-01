import React from "react"

interface Dish {
  name: string
  composition: string
  kcal: number
  price: number
  subheader?: string
}

interface MenuSectionNoPhotoProps {
  id: string
  title: string
  dishes: Dish[]
}

export default function MenuSectionNoPhoto({ id, title, dishes }: MenuSectionNoPhotoProps) {
  return (
    <div style={{ marginBottom: "120px", padding: "0 32px" }}>
      <section id={id} className="burger-banner nophoto-banner">
        <div className="burger-right nophoto-right">
          <div className="burger-title">{title}</div>
          <div className="dish-list">
            {dishes.map((dish, i) => (
              <React.Fragment key={i}>
                {dish.subheader && (
                  <div className="dish-subheader">{dish.subheader}</div>
                )}
                <DishRow dish={dish} last={i === dishes.length - 1} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function DishRow({ dish, last }: { dish: Dish; last: boolean }) {
  return (
    <div className={`dish-row${last ? " dish-row--last" : ""}`}>
      <div className="dish-row-main">
        <span className="product-calories">{dish.kcal} ккал</span>
        <h3 className="dish-row-name">{dish.name}</h3>
        <p className="dish-row-composition">{dish.composition}</p>
      </div>
      <div className="dish-row-footer">
        <span className="product-price">{dish.price}₽</span>
        <button className="product-button">В корзину</button>
      </div>
    </div>
  )
}
