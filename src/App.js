import { Component } from "react";
import ParticlesBg from "particles-bg";
import Logo from "./components/Logo/Logo.js";
import Rank from "./components/Rank/Rank.js";
import Navigation from "./components/Navigation/Navigation.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import "./App.css";

// Clarifai code starts //
const returnClarifaiRequestOptions = (imageUrl) => {
  // const app = new Clarifai.App({
  // apiKey:"6601253eeca34af490181c57d58583a3" }); 
  // Your PAT (Personal Access Token) can be found in the portal under Authentification 
  const PAT = '4d6d9938d4be4bf9a07991a6e906610b';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'nyxn1n9';
  const APP_ID = 'Facial_Recognition';
  // Change these to whatever model and image URL you want to use
  //const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  })

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions
}

// APP.js code starts //
const initialState = { // signin page setting state and route
  input: '',
  imageUrl: '',
  box: {},
  route: 'home',
  isSignedIn: false,
  user: {
    id: 'id',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

// App Component //
  class App extends Component {
    constructor() {
      super();
      this.state = initialState;
    }

    loadUser = (data) => { // loads user data
      this.setState({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      })
    }

    calculateFaceLocation = (data) => { // calculates the edges of the bounding_box for image faces
      const clarifaiFace =
        data.outputs[length].data.regions[length].region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }

    displayFaceBox = (box) => { // bounding box 
      this.setState({ box: box });
    }
 
    onInputChange = (event) => { // input values
      this.setState({ input: event.target.value });
    }
          
    onButtonSubmit = () => { // when submit is clicked 
      this.setState({ imageUrl: this.state.input }) // sets state and input as imageUrl
// from documentation //
      fetch("http://api.clarifai.com/v2/models/" + "face-detection" + "/outputs/", returnClarifaiRequestOptions(this.state.input)) //retrieves the api model info and returns the state and input
        .then(response => response.json()) // json translates data and returns it
        .then(response => { // data response recieved from json
        console.log(response); // log response
        if (response) { // if response is correct returning an image, put into data as state user and id using json stringify package
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: this.state.user
            })
          })
          .then((response) => response.json()) // send another response to json
          .then((count) => { //then count how many entries of user was captured
            this.setState(Object.assign(this.state.user, { entries: count })) // set state user entries and count num of entries
          })
          .catch(console.log) // catch any errors
        }
        this.displayFaceBox(this.calculateFaceLocation(response)) // display the facebox after calculating face location
      })
      .catch((err) => console.log(err)) // check for errors
    }

    onRouteChange = (route) => { // when page changes
      if (route === "signout") { // first page is signout aslo initial state
        this.setState(initialState);
      } else if (route === "home") { // if route is home user is signed in
        this.setState({ isSignedIn: true });
      }
      this.setState({ route: route }); // route is the page its on
    }

    render() { // render objects that use this.state prefix
      const { isSignedIn, imageUrl, route, box } = this.state;
      return ( // return all attributes of the App
        <div className="App">
          <ParticlesBg color="#000000" num={200} type="cobweb" bg={true} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {route === "home" ? (
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          ) : route === "signin" ? (
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          ) : (
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )}
        </div>
      )
    }
  }

export default App;
