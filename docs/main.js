class Main {
  constructor() {
    this.cols = [ 'route', 'line', 'route_sae', 'position', 'node', 'edging', 'latitude', 'longitude' ];
    this.center = { lat: 4.5981, lng: -74.0758 };
    this.getData().then((data) => {
      this.data = data;
      this.createMap();
      this.table();
    }).catch(() => {
      alert('Error al cargar los datos.');
    });
  }

  getData() {
    return new Promise((resolve, reject) => {
      let http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
            resolve(JSON.parse(http.responseText));
          } else {
            reject();
          }
        }
      };
      http.open('GET', 'data.json');
      http.send();
    });
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
    this.cols.forEach((i) => {
      row.appendChild(this.col(data[i]));
    });
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
  new Main();
}
