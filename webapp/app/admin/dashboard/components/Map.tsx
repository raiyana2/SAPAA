"use client";

import { MapContainer, TileLayer, useMap, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  points: any[];
  showHeatmap?: boolean;
}

export default function Map({ points, showHeatmap = true }: MapProps) {
  function Heatmap() {
    const map = useMap();
    const heatLayerRef = useRef<any>(null);

    useEffect(() => {
      // Function to initialize heatmap
      const initHeatmap = async () => {
        console.log('🔥 Heatmap Effect Running', { 
          pointsCount: points?.length, 
          showHeatmap
        });

        // Remove previous heat layer if it exists
        if (heatLayerRef.current) {
          console.log('🗑️ Removing old heat layer');
          map.removeLayer(heatLayerRef.current);
          heatLayerRef.current = null;
        }

        if (!points || points.length === 0 || !showHeatmap) {
          console.log('⚠️ Skipping heatmap:', { hasPoints: !!points?.length, showHeatmap });
          return;
        }

        // Dynamically import leaflet.heat
        try {
          if (typeof window !== 'undefined' && !(L as any).heatLayer) {
            await import('leaflet.heat');
            console.log('✅ leaflet.heat loaded');
          }
        } catch (error) {
          console.error('❌ Failed to load leaflet.heat:', error);
          return;
        }

        // Verify leaflet.heat is available
        if (typeof (L as any).heatLayer !== 'function') {
          console.error('❌ leaflet.heat is still not available after import');
          return;
        }

        // Prepare heat data - ensure valid coordinates
        const heatData = points
          .filter(p => {
            const isValid = p && 
                          typeof p.latitude === 'number' && 
                          typeof p.longitude === 'number' &&
                          !isNaN(p.latitude) && 
                          !isNaN(p.longitude) &&
                          p.latitude >= -90 && 
                          p.latitude <= 90 &&
                          p.longitude >= -180 && 
                          p.longitude <= 180;
            
            if (!isValid) {
              console.warn('⚠️ Invalid point:', p);
            }
            return isValid;
          })
          .map((p) => {
            const weight = Math.max(0.1, Math.min(1, (p.weight || 1) / 10)); // Normalize weight
            return [p.latitude, p.longitude, weight];
          });

        if (heatData.length === 0) {
          console.error('❌ No valid heat data points');
          return;
        }

        console.log('🔥 Creating heat layer with', heatData.length, 'valid points');
        console.log('📍 Sample points:', heatData.slice(0, 3));

        try {
          // Create heat layer with optimized settings
          heatLayerRef.current = (L as any).heatLayer(heatData, { 
            radius: 40,
            blur: 25,
            maxZoom: 18,
            max: 1.0,
            minOpacity: 0.6,
            gradient: {
              0.0: 'blue',
              0.2: 'cyan',
              0.4: 'lime',
              0.6: 'yellow',
              0.8: 'orange',
              1.0: 'red'
            }
          });
          
          heatLayerRef.current.addTo(map);
          console.log('✅ Heat layer added to map successfully');

          // Force map to update
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
          
        } catch (error) {
          console.error('❌ Error creating heat layer:', error);
        }

        // Fit map to bounds if there are points
        if (points.length > 0) {
          try {
            const bounds = L.latLngBounds(points.map(p => [p.latitude, p.longitude]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
          } catch (error) {
            console.error('❌ Error fitting bounds:', error);
          }
        }
      };

      initHeatmap();

      // Cleanup on unmount
      return () => {
        if (heatLayerRef.current) {
          console.log('🧹 Cleaning up heat layer');
          try {
            map.removeLayer(heatLayerRef.current);
          } catch (error) {
            console.error('Error removing heat layer:', error);
          }
        }
      };
    }, [points, map, showHeatmap]);

    return null;
  }

  function Markers() {
    if (!showHeatmap) {
      return (
        <>
          {points.map((point, idx) => (
            <Marker key={idx} position={[point.latitude, point.longitude]}>
              <Popup>
                <div className="text-sm">
                  <strong className="text-[#254431]">{point.namesite}</strong>
                  {point.weight && (
                    <p className="text-[#7A8075]">Count: {point.weight}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </>
      );
    }
    return null;
  }

  // Fallback: Show large colored circles
  function CircleHeatmap() {
    if (!showHeatmap || points.length === 0) return null;

    const maxWeight = Math.max(...points.map(p => p.weight || 1), 1);

    return (
      <>
        {points.map((point, idx) => {
          const weight = point.weight || 1;
          const normalizedWeight = weight / maxWeight;
          
          // Color based on weight
          let color = '#4CAF50'; // Green
          if (normalizedWeight > 0.7) color = '#F44336'; // Red
          else if (normalizedWeight > 0.4) color = '#FF9800'; // Orange
          
          return (
            <CircleMarker
              key={`circle-${idx}`}
              center={[point.latitude, point.longitude]}
              radius={Math.max(10, 15 + (normalizedWeight * 25))}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.5,
                color: color,
                weight: 2,
                opacity: 0.8
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-[#254431]">{point.namesite}</strong>
                  <p className="text-[#7A8075]">Count: {weight}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </>
    );
  }

  console.log('🗺️ Map component rendering with', points?.length || 0, 'points');

  return (
    <MapContainer
      center={[53.5461, -113.4938]}
      zoom={5}
      style={{ height: "100%", width: "100%", position: "relative", zIndex: 0 }}
      className="z-0"
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Heatmap />
      <CircleHeatmap />
      <Markers />
    </MapContainer>
  );
}