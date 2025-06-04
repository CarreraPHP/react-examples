import React, { useEffect, useState } from "react";
import "./carousel.css";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Carousel: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=10");
      const data: Photo[] = await res.json();
      setPhotos(data);
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  const prev = () => setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  if (loading) return <div>Loading...</div>;
  if (!photos.length) return <div>No images found.</div>;

  return (
    <div className="carousel-container">
      <div className="carousel-image-wrapper">
        <img
          src={photos[current].url}
          alt={photos[current].title}
          className="carousel-image"
        />
        <div className="carousel-title">{photos[current].title}</div>
      </div>
      <div className="carousel-controls">
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
      <div className="carousel-index">
        {current + 1} / {photos.length}
      </div>
    </div>
  );
};

export default Carousel;
