/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import styles from "./Post.module.scss";
import L from "leaflet";

const customIcon = new L.icon({
  iconUrl: "/building-fill.svg",
  iconSize: [32, 32],
});
export default function PostMap({ post }) {
  const { coords } = post;

  let c = coords[0].split(",");

  return (
    <div className={styles.mapContainer}>
      <div id="map">
        <MapContainer
          center={c}
          zoom={17}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", position: "absolute" }}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

          <Marker position={c} icon={customIcon} />
          <ChangeCenter position={c} />
        </MapContainer>
      </div>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
