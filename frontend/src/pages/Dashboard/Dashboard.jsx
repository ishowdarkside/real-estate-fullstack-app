/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./DashBoard.module.scss";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useGetAllPosts } from "../../hooks/useGetPosts";
import Spinner from "../../ui/Spinner/Spinner";
import { useDashboardContext } from "../../context/dashboardContext";
import BuildingModal from "./BuildingModal";

const customIconBulding = new L.icon({
  iconUrl: "/building-black.svg",
  iconSize: [32, 32],
});

const customIconLocation = new L.icon({
  iconUrl: "/map-pin-line-fill.svg",
  iconSize: [32, 32],
});

export default function Dashboard() {
  const [position, setPosition] = useState([44.5375, 18.6735]);
  const { data, isLoading } = useGetAllPosts();
  const { setActiveBuilding } = useDashboardContext();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPosition([lat, lng]);
    });
  }, []);

  if (isLoading) return <Spinner />;
  const coords = data.posts.map((post) => {
    const stringArr = post.coords[0];
    return stringArr.split(",").map(parseFloat);
  });

  return (
    <div className={styles.mapContainer}>
      <div className={styles.headerDashboard}>
        <h1>MOJDOM</h1>
        <span>Traži nekretnine po mapi</span>
      </div>
      <div id="map">
        <MapContainer
          center={position}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{
            height: "90dvh",
            width: "100%",
            position: "absolute",
            left: 0,
          }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'" />

          <Marker
            position={position}
            icon={customIconLocation}
            eventHandlers={{
              click: (e) => {
                console.log("marker clicked", e);
              },
            }}
          >
            <Popup>Vi ste ovdje</Popup>
          </Marker>

          {coords.map((c) => (
            <Marker
              position={c}
              icon={customIconBulding}
              key={c}
              eventHandlers={{
                click: () => setActiveBuilding(c),
              }}
            />
          ))}
        </MapContainer>
      </div>
      <BuildingModal />
    </div>
  );
}
