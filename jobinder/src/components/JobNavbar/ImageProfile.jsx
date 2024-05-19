import {useState,useEffect} from 'react'
//import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import InfoModal from '../InfoModal/InfoModal';

const ImageProfile = ({
    placeholderSrc,
    handleDropdownToggle,
    goHome,
    onSuccessImg,
    setOnSuccessImg,
    src,
    ...props
  }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [onErrorImg, setOnErrorImg] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
  
    //const navigate = useNavigate();
  
    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setOnErrorImg(false);
        setOnSuccessImg(true);
        goHome();
      };
      img.onerror = () => {
        console.log("Error al cargar la imagen");
        setImgSrc(placeholderSrc);
        setOnErrorImg(true);
        setShowInfoModal(true);
        setOnSuccessImg(false);
      };
    }, [src]);
  
    return (
      <div className="d-flex flex-column">
        <img
          {...{ src: imgSrc, ...props }}
          alt={props.alt || "candidate-profile-pic"}
          width={props.width || "50px"}
          onClick={handleDropdownToggle}
          className="candidate-profile-pic"
        />
         {onErrorImg && 
         <InfoModal  
         dataModal={{
          title:'Carga Imagen',
          description:'Tu Imagen se cargara correctamente recargando la página...', 
          severity:'success'}}
         showInfoModal={showInfoModal}
         setShowInfoModal={setShowInfoModal} 
         />} 
      </div>
    );
  };

    ImageProfile.propTypes = {
        placeholderSrc: PropTypes.string,
        handleDropdownToggle: PropTypes.func,
        goHome: PropTypes.func,
        onSuccessImg: PropTypes.bool,
        setOnSuccessImg: PropTypes.func,
        src: PropTypes.string,
        };

export default ImageProfile