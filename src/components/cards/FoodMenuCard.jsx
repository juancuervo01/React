import { Link } from '@/components/ui'
import react from '@/assets/lunch.png'

export default function FoodMenuCard({ id, items, price, availables, showReserveButton, showValues = true }) {
  return (
    <div className="h-full">
      <div className="bg-white flex flex-wrap-reverse gap-2 border-2 border-blue-900 p-4 h-full">
        <section className="flex flex-col gap-2 flex-2">
          <h2 className="text-blue-900 font-medium">Almuerzo</h2>
          <ul className="flex flex-col justify-center flex-1 list-inside list-disc">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {showValues && <p className="text-blue-900 font-medium">Precio ${price}</p>}
        </section>
        <section className="flex flex-col gap-2 flex-1">
          <div className="flex justify-center items-center flex-1 bg-gray-100">
            <img src={react} width="300" height="300" />
          </div>
          {showValues && <p className="text-blue-900 font-medium">{availables} disponibles</p>}
        </section>
      </div>
      {showReserveButton && (
        <div className="flex justify-center mt-2">
          <Link to={`/reserve/${id}`}>Reservar</Link>
        </div>
      )}
    </div>
  )
}
