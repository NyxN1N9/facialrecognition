import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-4"
        options={{ max: 200 }} // max tilt rotation (degrees)
        style={{ height: 160, width: 160 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "15px" }} alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;
