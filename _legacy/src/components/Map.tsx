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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.500171751012!2d79.1011674!3d21.172280699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c188d5643a45%3A0x79e2fced5b821612!2sAdvocate%20Jasvinder%20Singh%20Ply%20%7C%20Best%20Advocate%2FLawyer!5e0!3m2!1sen!2sdk!4v1746601006216!5m2!1sen!2sdk"
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
