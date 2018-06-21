class Main {
  constructor() {
    this.cols = [ 'route', 'line', 'route_sae', 'position', 'node', 'edging', 'latitude', 'longitude' ];
    this.data().then((data) => {
      this.locations = data;
      this.createMap();
      this.table();
      this.bounds();
    }).catch(() => {
      alert('Error al cargar los datos.');
    });
  }

  data() {
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

  latLng(latitude, longitude) {
    return { lat: latitude, lng: longitude };
  }


  createMap() {
    this.map = new google.maps.Map(document.getElementById('map'));
  }

  table() {
    this.locations.forEach((i) => {
      document.querySelector('#dataset tbody').appendChild(this.row(i));
    });
  }

  row(data) {
    this.marker(data.latitude, data.longitude, data.edging);
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

  marker(lat, lng, title) {
    new google.maps.Marker({ position: { lat, lng }, map: this.map, title });
  }

  bounds() {
    let x1, x2, y1, y2;

    this.locations.forEach((location) => {
      let lat = location.latitude;
      let lng = location.longitude;

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

function initMap() {
  new Main();
}
