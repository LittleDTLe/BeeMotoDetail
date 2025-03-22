import React, {useState, useEffect} from 'react'
import './Images.css'

const Image = ({images}) => {
  
    // Group images by title
  const [groupedImages, setGroupedImages] = useState({});

  useEffect(() => {
    // Group the images by title
    const grouped = images.reduce((acc, image) => {
      if (!acc[image.title]) {
        acc[image.title] = [];
      }
      acc[image.title].push(image);
      return acc;
    }, {});
    
    setGroupedImages(grouped);
  }, [images]);

return (
    <div className="gallery-container">
      {Object.entries(groupedImages).map(([title, imagesGroup]) => {
        // Calculate the span based on number of images
        // This determines how much space the card takes in the grid
        const columnSpan = Math.min(Math.ceil(imagesGroup.length / 2), 3);
        
        return (
          <div 
            key={title} 
            className="group-card"
            style={{ 
              gridColumn: `span ${columnSpan}`
            }}
          >
            <h2 className="group-title">{title}</h2>
            <div 
              className="images-grid"
              style={{
                // Dynamically set the number of columns based on image count
                gridTemplateColumns: `repeat(${Math.min(imagesGroup.length, 4)}, 1fr)`
              }}
            >
              {imagesGroup.map((image, index) => (
                <div key={index} className="image-item">
                  <div className="image-container">
                    <img src={image.url} alt={image.title} className="gallery-image" />
                    <div className="image-overlay">
                      <p className="image-description">{image.description}</p>
                    </div>
                  </div>
                  {/* ToDo: Add imageTitle */}
                  <div className="image-title-container">
                    <h3 className="image-title">{image.imageTitle || `Image ${index + 1}`}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Image