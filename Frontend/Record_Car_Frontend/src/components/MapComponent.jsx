import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getBenzinarii } from '../service/BenzinariiService';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  /* Alte stiluri necesare */
`;

const MapComponent = ({ oras }) => {
    const [benzinarii, setBenzinarii] = useState([]);
    const [center, setCenter] = useState({ lat: 44.4268, lng: 26.1025 }); // Coord. București

    useEffect(() => {
        getBenzinarii(oras)
            .then(data => {
                setBenzinarii(data);
                if (data.length > 0) {
                    setCenter({ lat: data[0].latitudine, lng: data[0].longitudine });
                }
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, [oras]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDhnG11E_hWe1Gx5OP0Th0hYQUr2Uf6oyA">
            <MapContainer>
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    zoom={12}
                    center={center}
                >
                    {benzinarii.map(benzinarie => (
                        <Marker
                            key={benzinarie.id}
                            position={{ lat: benzinarie.latitudine, lng: benzinarie.longitudine }}
                            title={benzinarie.nume}
                        />
                    ))}
                </GoogleMap>
            </MapContainer>
        </LoadScript>
    );
};

export default MapComponent;
