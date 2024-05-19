import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"
import MainDropdown from "../Landing/MainDropdown/MainDropdown";
import { mainColor } from "../../assets/constants";
import "./JobNavbar.css"

const BasicNavbar = () => {
  return (
    <div style={{backgroundColor:mainColor}} className="d-flex justify-content-between">
          <div className="">
            <Link className="" to="/">
              <img
                src={logo}
                alt="jobinder-logo"
                className="my-2 ms-2 hoverImage bg-light bg-opacity-25 rounded"
                style={{ width: "120px", height: "45px" }}
              />
            </Link>
          </div>

          

          <div className="d-flex">
            <MainDropdown />
          </div>
        </div>
  )
}

export default BasicNavbar