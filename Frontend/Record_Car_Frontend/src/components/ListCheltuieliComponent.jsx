import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importăm CSS-ul Bootstrap

const initialData = [
  { id: 1, name: 'Chirie', amount: 1500 },
  { id: 2, name: 'Mâncare', amount: 200 },
  { id: 3, name: 'Utilități', amount: 300 },
  { id: 4, name: 'Transport', amount: 100 },
  { id: 5, name: 'Hobby', amount: 50 },
];

const ListCheltuieliComponent = () => {
  const [data, setData] = useState(initialData);
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState('');
  
  const sortData = (field) => {
    const direction = sortedField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedField(field);
    setSortDirection(direction);
    setData(sortedData);
  };

  const filterData = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredData = initialData.filter(item => {
      return Object.values(item).some(value =>
        value.toString().toLowerCase().includes(keyword)
      );
    });
    setFilter(keyword);
    setData(filteredData.length ? filteredData : initialData); // Resetăm datele la valorile inițiale dacă filtrul este gol
  };

  return (
    <div className="container">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Caută..."
        value={filter}
        onChange={filterData}
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortData('name')}>
              Nume {sortedField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => sortData('amount')}>
              Sumă {sortedField === 'amount' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCheltuieliComponent;
