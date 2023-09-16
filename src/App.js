/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import "./App.css";
import "./index.css";

// class component from video walk thru //
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value); // to get value
  };

  onButtonSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <>
        <div className="App">
          <ParticlesBg color="#000000" num={200} type="cobweb" bg={true} />,
          <Navigation />,
          <Logo />,
          <Rank />,
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />,
          {/*<FaceRecognition />*/}
        </div>
      </>
    );
  }
}

export default App;
