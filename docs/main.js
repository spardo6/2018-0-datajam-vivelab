{
  const data = [
    { "name": "Vivelab Bogotá", "longitude": 4.6380851, "latitude": -74.0915043 },
    { "name": "Universidad Nacional", "longitude": 4.6363211, "latitude": -74.0813062 },
    { "name": "Embajada de los Estados Unidos", "longitude": 4.6345215, "latitude": -74.0908348 }
  ];

  const table = () => {
    data.forEach((i) => {
      document.querySelector('#dataset tbody').appendChild(row(i));
    });
  }

  const row = (data) => {
    let row = document.createElement('tr');
    row.appendChild(col(data.name));
    row.appendChild(col(data.longitude));
    row.appendChild(col(data.latitude));
    return row;
  }

  const col = (text) => {
    let col = document.createElement('td');
    col.appendChild(document.createTextNode(text));
    return col;
  };

  window.onload = () => {
    table();
  }
}
