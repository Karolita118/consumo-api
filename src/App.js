// Asegúrate de que useState y useEffect se importen desde React
import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // useEffect para obtener los datos de la API cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  // Manejador para actualizar el estado de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filtrar los usuarios en función de lo que se busca
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Mostrar un mensaje de error si falla la petición
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar usuario por nombre"
        value={search}
        onChange={handleSearch}
      />
      {/* Mostrar la lista de usuarios filtrados */}
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; // Aquí es importante el default export para que funcione correctamente
