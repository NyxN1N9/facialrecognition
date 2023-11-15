import { Component } from "react";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Navigation from "./components/Navigation/Navigation.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import "./App.css";

const initialState = {
  input: "", 
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
};

// App Component //
class App extends Component {
  constructor() {
    super();
    this.state = initialState; 
  }

  //loads user data
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  };

  //calculates the edges of the bounding_box for image faces
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[length].data.regions[length].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  };

  //bounding box
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  //input values
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  //when submit is clicked
  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    /* fetch("http://localhost:3000/imageurl", { */
    fetch("https://smartbrainapi-mxdx.onrender.com/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
            },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        /* fetch("http://localhost:3000/image", { */
        fetch("https://smartbrainapi-mxdx.onrender.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    //when route/page changes
    if (route === "signout") {
      //first page is signout also initial state
      this.setState(initialState)
    } else if (route === "home") {
      //if route is home user is signed in
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route }); //route is the page its on
  };

  render() {
    //render objects that use this.state prefix //
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      //return all attributes of the App
      <div className="App">
        <ParticlesBg color="#000000" num={200} type="cobweb" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? 
          <div>
            <Logo />
            <Rank
              name={this.state.user.name} entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
         :( route === "signin" ? 
          <Signin loadUser={this.loadUser}
            onRouteChange={this.onRouteChange} />
         : 
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
