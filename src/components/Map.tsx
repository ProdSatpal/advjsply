import React, { useEffect, useState } from 'react';

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000); // simulate map loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
        </div>
      )}

      {mapLoaded && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.16973352647!2d79.09843517470432!3d21.17229148283437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c128559a0a73%3A0xbd6d4a01c21fd03a!2s761%2C%20Buddha%20Nagar%2C%20Balabhaupeth%2C%20Nagpur%2C%20Maharashtra%20440002%2C%20India!5e1!3m2!1sen!2sdk!4v1746113426858!5m2!1sen!2sdk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        ></iframe>
      )}
    </div>
  );
};

export default Map;
