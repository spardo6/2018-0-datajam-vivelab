class Main {
  constructor() {
    this.db = firebase.database().ref();
    this.data().then((data) => {
      this.data = data;
      this.map('map');
      this.table('#dataset');
      this.bounds();
    }).catch(() => {
      alert('Error al cargar los datos.');
    });
    // this.cols = [ 'route', 'line', 'route_sae', 'position', 'node', 'edging', 'latitude', 'longitude' ];
    this.cols = [ 'Ruta Comercial', 'Linea', 'Ruta SAE', 'Posicion', 'Nodo', 'Cenefa Paradero', 'Lat', 'Lon' ];
  }

  data() {
    return new Promise((resolve, reject) => {
      this.db.once('value', snapshot => {
        resolve(snapshot.val());
      }, () => {
        reject();
      });
    });
  }

  map(selector) {
    this.map = new google.maps.Map(document.getElementById(selector));
  }

  marker(lat, lng, title) {
    new google.maps.Marker({ position: { lat, lng }, map: this.map, title });
  }

  latLng(latitude, longitude) {
    return { lat: Number(latitude), lng: Number(longitude) };
  }

  table(selector) {
    this.data.forEach((i) => {
      document.querySelector(`${selector} tbody`).appendChild(this.row(i));
    });
  }

  row(data) {
    this.marker(Number(data.Lat), Number(data.Lon), data['Cenefa Paradero']);
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

  bounds() {
    let x1, x2, y1, y2;

    this.data.forEach((location) => {
      let lat = location.Lat;
      let lng = location.Lon;

      if (!x1 || lat > x1) { x1 = lat }
      if (!x2 || lat < x2) { x2 = lat }
      if (!y1 || lng > y1) { y1 = lng }
      if (!y2 || lng < y2) { y2 = lng }
    });

    let bounds = new google.maps.LatLngBounds();
    bounds.extend(this.latLng(x1, y2));
    bounds.extend(this.latLng(x2, y1));
    this.map.fitBounds(bounds);
  }
}

function initialize() {
  new Main();
}
