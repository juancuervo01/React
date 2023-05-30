import { useParams } from 'react-router-dom';

const ManageFoodMenusPage = () => {
  const { idlista } = useParams();

  return (
    <div>
      <h1>Valor recibido: {idlista}</h1>
      {/* Resto del código de la página manage-food-menus */}
    </div>
  );
};

export default ManageFoodMenusPage;

