
import React, { useEffect, useRef, useState } from 'react';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // This is a placeholder - in a real implementation, you would use an actual map library
    // For now, we'll just simulate that a map has loaded with a static image
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
        </div>
      )}
      
      {/* Static map placeholder - would be replaced with actual map integration */}
      <div 
        ref={mapContainerRef}
        className={`w-full h-full bg-gray-200 ${mapLoaded ? 'block' : 'hidden'}`}
        style={{
          backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+E0B251(79.0882,21.1458)/79.0882,21.1458,14,0/600x400?access_token=placeholder")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Map placeholder with overlay for styling */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-md shadow-md">
            <h3 className="font-serif text-navy">Adv. Jasvinder Singh Ply</h3>
            <p className="text-sm text-gray-600">Buddh Nagar, Indora Square, Nagpur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
