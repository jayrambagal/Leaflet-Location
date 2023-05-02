import React, { useState, useEffect } from 'react';
import { Icon } from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from 'axios';

function App() {

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getEmp')
      .then(res => {
        console.log(res.data);
        setMarkers(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const customIcon = new Icon({
    // iconUrl:"https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
    iconSize: [38, 38],
    iconUrl: require("./assets/placeholder.png"),
  });

  return (
    <MapContainer center={[22.351115, 78.667743]} zoom={4}>
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {markers.map((marker, index) => {
          return (
            <Marker position={marker.position} icon={customIcon}>
              <Popup>
                <div style={{ display: "flex", gap: "10px" }}>
                  <h4>Name :</h4> {marker.name}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  <h4>Department:</h4> {marker.dept}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  <h4>Address:</h4> {marker.address}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default App;
