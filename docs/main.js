const data = [
  { "name": "Vivelab Bogotá", "latitude": 4.6380851, "longitude": -74.0915043 },
  { "name": "Universidad Nacional", "latitude": 4.6363211, "longitude": -74.0813062 },
  { "name": "Embajada de los Estados Unidos", "latitude": 4.6366941, "longitude": -74.0948787 }
];

class Main {
  constructor(data) {
    this.data = data;
    this.center = { lat: 4.5981, lng: -74.0758 };
    this.createMap();
    this.table();
  }

  createMap() {
    this.map = new google.maps.Map(document.getElementById('map'), { zoom: 11, center: this.center });
  }

  table() {
    this.data.forEach((i) => {
      document.querySelector('#dataset tbody').appendChild(this.row(i));
    });
  }

  row(data) {
    this.marker(data.latitude, data.longitude);
    let row = document.createElement('tr');
    row.appendChild(this.col(data.name));
    row.appendChild(this.col(data.latitude));
    row.appendChild(this.col(data.longitude));
    return row;
  }

  col(text) {
    let col = document.createElement('td');
    col.appendChild(document.createTextNode(text));
    return col;
  };

  marker(lat, lng) {
    new google.maps.Marker({ position: { lat, lng }, map: this.map });
  }
}

function initMap() {
  new Main(data);
}
