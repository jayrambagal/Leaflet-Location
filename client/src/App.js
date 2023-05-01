import { Icon } from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function App() {
  const markers = [
    {
      id: 1,
      name: "John Doe",
      dept: "IT",
      address: "123 Main St, Bengaluru",
      position: [12.9716, 77.5946],
    },
    {
      id: 2,
      name: "Jane Smith",
      dept: "HR",
      address: "456 Elm St, Chennai",
      position: [13.0827, 80.2707],
    },
    {
      id: 3,
      name: "Bob Johnson",
      dept: "Sales",
      address: "789 Oak St, Mumbai",
      position: [19.076, 72.8777],
    },
    {
      id: 4,
      name: "Alice Lee",
      dept: "Finance",
      address: "321 Maple St, Hyderabad",
      position: [17.385, 78.4867],
    },
    {
      id: 5,
      name: "David Chen",
      dept: "Marketing",
      address: "987 Pine St, Delhi",
      position: [28.7041, 77.1025],
    },
    {
      id: 6,
      name: "Samantha Singh",
      dept: "IT",
      address: "654 Cedar St, Kolkata",
      position: [22.5726, 88.3639],
    },
  ];

  const customIcon = new Icon({
    // iconUrl:"https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
    iconSize: [38, 38],
    iconUrl: require("./assets/placeholder.png"),
  });

  return (
    <MapContainer center={[22.351115, 78.667743]} zoom={5}>
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
