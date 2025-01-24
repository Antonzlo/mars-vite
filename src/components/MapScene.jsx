import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Globe from "react-globe.gl";
import * as THREE from "three";

const MapScene = () => {
    const [selectedPolygon, setSelectedPolygon] = useState(null);
    const globeRef = useRef();
    const controlsRef = useRef();
    const [hexagons, setHexagons] = useState([]);

    const marsTexture = new THREE.TextureLoader().load("src/assets/mars.jpg");
    const marsBumpMap = new THREE.TextureLoader().load("src/assets/mars_t.jpg");

    const handlePolygonClick = (polygon) => {
        setSelectedPolygon(polygon);
        console.log("Polygon clicked:", polygon);
    };

    const generateHexagons = (cameraPosition) => {
        const radius = 5;
        const hexagonSize = 1; // 100x100 meters equivalent
        const visibleDistance = 7; // Distance to show hexagons

        const hexagons = [];
        const center = new THREE.Vector3(0, 0, 0);
        const segments = 20; // Define hexagon grid density

        for (let lat = -segments / 2; lat < segments / 2; lat++) {
            for (let lon = -segments / 2; lon < segments / 2; lon++) {
                const x = (lat + 0.5 * (lon % 2)) * hexagonSize * Math.sqrt(3);
                const z = lon * hexagonSize * 1.5;

                const position = new THREE.Vector3(x, 1, z);
                console.log("Position:", position);

                hexagons.push(
                    <mesh key={`${lat}-${lon}`} position={position.toArray()} onClick={() => handlePolygonClick({ lat, lon })}>
                        <cylinderGeometry args={[hexagonSize, hexagonSize, 0.02, 6]} />
                        <meshStandardMaterial color={selectedPolygon?.lat === lat && selectedPolygon?.lon === lon ? "red" : "white"} opacity={0.7} />
                    </mesh>
                );
            }
        }

        setHexagons(hexagons);
    };

    const [first, setFirst] = useState(true);
    /* useFrame((state) => {
        controlsRef.current.update();
        if (first) {
            state.camera.position.set(0, 0, 18);
            setFirst(false);
        }

        const distance = controlsRef.current.target.clone().sub(state.camera.position);
        if (distance.length() > 10) {
            if (globeRef.current) {
                globeRef.current.rotation.y += 0.0002;
            }
        }
        if (distance.length() <= 7) {
            if (hexagons.length == 0) generateHexagons(state.camera.position);
        } else {
            if (hexagons.length > 0) setHexagons([]);
        }
    }); */

    return (
        <>
            <Globe
                ref={globeRef}
                globeImageUrl={"src/assets/mars.jpg"}
                bumpImageUrl={"src/assets/mars_t.jpg"}
                showGraticules={true}
                showAtmosphere={true}
                hexPolygonColor={() => "red"}
                hexPolygonGeoJsonGeometry={(hexPolygon) => hexPolygon.geometry}
                hexPolygonDotResolution={1}
                hexPolygonAltitude={0.00001}
                hexPolygonResolution={4}
                onHexClick={(hexPolygon) => console.log(hexPolygon)}
                onHexPolygonClick={ ( hexPolygon, e, c ) => {
                    console.log( hexPolygon, c );
                    if( selectedPolygon && selectedPolygon.hexPolygon === hexPolygon ) {
                        setSelectedPolygon( null );
                        
                    }
                    else setSelectedPolygon( {hexPolygon, coordinates: c} );
                }}
                hexPolygonsData={[
                    {
                        type: "Feature",
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [0, 0],
                                    [0, 20],
                                    [20, 20],
                                    [20, 0],
                                ],
                            ],
                        },
                        properties: {
                            id: 1,
                            description: "Single hexagon",
                        },
                    },
                ]}
            />
            {/* <OrbitControls enablePan={false} maxDistance={19} minDistance={6.5} ref={controlsRef} /> */}
            {selectedPolygon && <div style={{ color: "white", position: "absolute", top: "200px" }}>Selected Polygon: {`Lat: ${selectedPolygon.coordinates.lat}, Lon: ${selectedPolygon.coordinates.lng}`}</div>}
        </>
    );
};

export default MapScene;
