// Khởi tạo bản đồ
  var map = L.map('map').setView([10.7769, 106.7009], 12);  // TP.HCM

  // Thêm lớp nền OSM
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Load file GeoJSON
  fetch('MS1495_map.geojson')
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          const props = feature.properties;
          let popup = `
            <b>Phường:</b> ${props.h100 || ''}<br>
            <b>Địa chỉ:</b> ${props.h11 || ''}<br>
            <b>Nhóm:</b> ${props.group_label || ''}
          `;
          layer.bindPopup(popup);
        },
        pointToLayer: function (feature, latlng) {
          let color = 'gray';
          const g = feature.properties.group;
          if (g == 1) color = 'green';
          else if (g == 2) color = 'orange';
          else if (g == 3) color = 'blue';

          return L.Marker(latlng, {
            radius: 4,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      }).addTo(map);
    });
