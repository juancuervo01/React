export default function shoppingList() {
  return (
    <div>
    <h1>Lista de compras</h1>
    <ul>
      {shoppingList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
  )
}
