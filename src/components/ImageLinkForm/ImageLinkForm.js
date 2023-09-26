/* eslint-disable react/prop-types */
import "./ImageLinkForm.css";

// destructure
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This magic Brain will detect faces in your pictures. Give it a try."}</p>
      <div className="form center pa4 br3 shadow-5">
        <input className="f4 pa2 w-70"
          type="text"
          onChange={onInputChange} />
        <button
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
          onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>
  )
}

export default ImageLinkForm;
