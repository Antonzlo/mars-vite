import MapScene from "../components/MapScene";
const MarsGlobe = () => {
    return <MapScene />;
};

const MapView = () => {
    return (
        <div style={{ height: "100%" }}>
            <MarsGlobe />
        </div>
    );
};

export default MapView;
