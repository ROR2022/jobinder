import Carousel from "react-bootstrap/Carousel";
import img1 from "../../../assets/img/img-1.jpg";
import img2 from "../../../assets/img/img-2.jpg";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const LandingCarrousel = () => {
  const [anchoVW, setAnchoVW] = useState(window.innerWidth);
  const [myFontSize, setMyFontSize] = useState("4vw");
  useEffect(() => {
    setAnchoVW(window.innerWidth);
    //console.log("anchoVW:..", anchoVW);
  }, [window.innerWidth, anchoVW]);

  useEffect(() => {
    /* if (dataLocalStorage?.role === "candidato") {
      setDataCandidate(dataLocalStorage);
      navigate("/dashboard-candidato/search");
    }
    if (dataLocalStorage?.role === "empresa") {
      setDataRecruiter(dataLocalStorage);
      navigate("/dashboard-recruiter/vacancy");
    } */
    if (isMobile) {
      setMyFontSize("4vw");
    }
    if (isDesktop) {
      setMyFontSize("4vw");
    }
    if (isUltraWide) {
      setMyFontSize("2vw");
    }
    if (isUltraWide4k) {
      setMyFontSize("1vw");
    }
    if (isUltraWide4k) {
      setMyFontSize(".7vw");
    }
    if (isUltraWide4kb) {
      setMyFontSize(".5vw");
    }
  }, []);
  

  const isMobile = useMediaQuery({
    query: "(max-width: 999px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  const isUltraWide = useMediaQuery({
    query: "(min-width: 2000px)",
  });
  const isUltraWide4k = useMediaQuery({
    query: "(min-width: 3000px)",
  });
  const isUltraWide4kb = useMediaQuery({
    query: "(min-width: 4000px)",
  });



  return (
    <Carousel
        style={{ zIndex: "-1000", position: "relative" }}
        className={"w-75 ms-auto me-auto mt-3"}
        controls={false}
      >
        <Carousel.Item className=" ">
          <img
            style={{ zIndex: "0", position: "relative" }}
            className="w-100 "
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption className="">
            <h3
              style={{
                fontSize: `${myFontSize}`,
                color: "white",
                fontFamily: "Poppins",
              }}
              className=" text-center"
            >
              Haz match con las empresas de tus sueños.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          style={{ zIndex: "0", position: "relative" }}
          className=""
        >
          <img
            style={{ zIndex: "0", position: "relative" }}
            className="w-100 "
            src={img2}
            alt="Second slide"
          />

          <Carousel.Caption className="">
            <h3
              style={{
                fontSize: `${myFontSize}`,
                color: "white",
                fontFamily: "Poppins",
              }}
              className="  "
            >
              Explora un mundo de oportunidades con Jobinder
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
  )
}

export default LandingCarrousel