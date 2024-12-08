import "./BlurryPhoto.css"
import {useState, useEffect} from "react"

const BlurryPhotos = (props) => {

    const [blur, setBlur] = useState(20)


    useEffect(() => {
      const interval = setInterval(() => {
        setBlur((prev) => Math.max(prev - 1, 0)); 
      }, 500);
  
      return () => clearInterval(interval);
    }, []);

    return props.photo && 
    <img 
        className="photo"
        alt=""
        src={`https://genevastreet.ddns.net:8084/Pictures/${props.photo.file_name}`} 
        style={{ filter: `blur(${blur}px)`,  }}
    />
}

export default BlurryPhotos