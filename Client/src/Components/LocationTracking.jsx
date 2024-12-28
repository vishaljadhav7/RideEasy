// import  { useState, useEffect } from 'react'
// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

// const containerStyle = {
//     width: '100%',
//     height: '100%',
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

// const LocationTracking = () => {
//     const [ currentPosition, setCurrentPosition ] = useState(center);

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         const watchId = navigator.geolocation.watchPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

    // useEffect(() => {
    //     const updatePosition = () => {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const { latitude, longitude } = position.coords;

    //             console.log('Position updated:', latitude, longitude);
    //             setCurrentPosition({
    //                 lat: latitude,
    //                 lng: longitude
    //             });
    //         });
    //     };

    //     updatePosition(); // Initial position update

    //     const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

    //     return () => {
    //         clearInterval(intervalId);
    //     }

    // }, []);

//     return (
//         <LoadScript googleMapsApiKey="" >
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={currentPosition}
//                 zoom={15}
//             >
//                 <Marker position={currentPosition} />
//             </GoogleMap>
//         </LoadScript>
//     )
// }

// export default LocationTracking

import { useState, useEffect, useRef } from 'react';
import {
    useJsApiLoader,
    GoogleMap,
    Marker
} from '@react-google-maps/api';

//  Define libraries outside the component to prevent reloads
const LIBRARIES = ['places'];

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const LocationTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const mapRef = useRef(null);

    //  Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: LIBRARIES, //  Static reference
    });

    //  Fetch and watch user's live location
    useEffect(() => {
        let watchId;

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    //  Prevent unnecessary re-renders by handling map reference
    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    if (!isLoaded) {
        return <h1>Loading Google Maps...</h1>;
    }

    return (
        <div className="h-full w-full">
            {/* Map Section */}
            <GoogleMap
                center={currentPosition}
                zoom={15}
                mapContainerStyle={containerStyle}
                onLoad={handleMapLoad}
                options={{
                    zoomControl: true,
                    scrollwheel: true,
                    disableDefaultUI: false,
                    fullscreenControl: true
                }}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </div>
    );
};

export default LocationTracking;
