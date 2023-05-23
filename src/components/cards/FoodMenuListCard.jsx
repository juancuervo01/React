import React from 'react'

export default function FoodMenuListCard({ items, price, availables }) {
  return (
    <div className="flex gap-4 justify-between bg-white">
      <div>
        <div>
          <ul className="flex gap-2 flex-wrap">
            {items.map((item, index) => (
              <li className="flex gap-2 bg-gray-200 px-1" key={`food-item-${index}`}>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>Precio ${price}</div>
        <div>Disponibles {availables}</div>
      </div>
      <button className="bg-gray-100 px-4">Funciones no disponibles</button>
    </div>
  )
}
