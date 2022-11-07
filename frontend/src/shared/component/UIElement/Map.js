import React, { useEffect } from 'react';
import './Map.css';
const Map = ({ className, style, center, zoom }) => {

    useEffect(() => {
        const mapId = document.getElementById("map");
        new window.ol.Map({
            target: mapId,
            layers: [
                new window.ol.layer.Tile({
                    source: new window.ol.source.OSM()
                })
            ],
            view: new window.ol.View({
                center: window.ol.proj.fromLonLat([center.lng, center.lat]),
                zoom: zoom
            })
        });
    }, [center, zoom]);

    return (
        <div
            className={`map ${className}`}
            style={style}
            id="map"
        ></div>
    );
}


export default Map;