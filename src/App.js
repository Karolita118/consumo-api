
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(""); // Estado para búsqueda

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center my-4">Lista de Usuarios</h1>

      {/* Campo de búsqueda */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 offset-md-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar por nombre" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Mostrar usuarios en una tabla */}
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
