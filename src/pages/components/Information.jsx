export default function Information() {
  const persona1 = {
    nombre: 'Edier Dario Bravo',
    correo: 'edier.bravo@example.com'
  }

  const persona2 = {
    nombre: 'Juan Pablo Cuervo',
    correo: 'juan.cuervo@example.com'
  }

  return (
    <div className="m-20 justify-center">
      <div className="justify-center">
          <h1 className="text-4xl font-bold mb-6 text-center">¡Bienvenido a nuestra aplicación!</h1>
          <p className="text-lg mb-6">Esta aplicación te permite gestionar tus listas de compra de manera fácil y conveniente. Con ella, puedes:</p>
          <ul className="text-left list-disc pl-6 mb-6">
            <li>Crear y eliminar listas de compra según tus necesidades.</li>
            <li>Agregar y quitar productos de las listas existentes de forma rápida.</li>
            <li>Crear, eliminar y editar productos para personalizar tu experiencia de compra.</li>
          </ul>
      </div>
      <div className="flex mt-20 text-center items-center justify-center ">
        <div className="flex items-center rounded-lg bg-gray-200 p-6 mr-10">
          <img src="imagen1.jpg" alt="Imagen de perfil" className="w-24 h-24 mr-3 rounded-full" />
          <div className="text-left">
            <p className="font-bold text-2xl">{persona1.nombre}</p>
            <p>{persona1.correo}</p>
          </div>
        </div>
        <div className="flex items-center rounded-lg bg-blue-200 p-6 ml-10">
          <img src="imagen2.jpg" alt="Imagen de perfil" className="w-24 h-24 mr-3 rounded-full" />
          <div className="text-left">
            <p className="font-bold text-2xl">{persona2.nombre}</p>
            <p>{persona2.correo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
