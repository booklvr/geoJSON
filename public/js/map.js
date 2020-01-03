mapboxgl.accessToken = 'pk.eyJ1IjoiYm9va2x2ciIsImEiOiJjanh2bHllNDkwMjR1M2lub3ZwcHlkOG94In0.l9XDX5dbtYHhq5sicrj24Q';

// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     zoom: 6,
//     center: [-122.316666, 49.04999]
// });

// // Fetch stores from API
// async function getStores() {
//     const res = await fetch('/api/v1/stores');
//     const data = await res.json();

//     const stores = data.data.map(store => {
//         return {
//             type: 'Feature',
//             geometry: {
//                 'type': 'Point',
//                 'coordinates': [store.location.coordinates[0], store.location.coordinates[1]]
//             },
//             properties: {
//                 storeId: store.storeID,
//                 icon: 'shop'
//             }
//         }
//     });

//     // console.log(stores);

//     loadMap(stores);
// }


// // Load map with stores
// function loadMap(stores) {
//     map.on('load', function() {
//        map.addLayer({
//             'id': 'points',
//             'type': 'symbol',
//             'source': {
//                 'type': 'geojson',
//                 'data': {
//                     'type': 'FeatureCollection',
//                     'features': stores,
//                 }
//             },
//             'layout': {
//                 'icon-image': '{icon}-15',
//                 'icon-size': 1.5,
//                 'text-field': '{storeId}',
//                 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//                 'text-offset': [0, 0.9],
//                 'text-anchor': 'top'
//             }
//         });
//     });
// }

// // loadMap();

// getStores();


const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-122.316666, 49.04999]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();
