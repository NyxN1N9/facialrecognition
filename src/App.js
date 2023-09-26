import { Component } from "react";
import ParticlesBg from "particles-bg";
import Logo from "./components/Logo/Logo.js";
import Rank from "./components/Rank/Rank.js";
import Navigation from "./components/Navigation/Navigation.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
//import Clarifai from "clarifai"; 
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import "./App.css";
  
/* const app = new Clarifai.App({
  apiKey: "6601253eeca34af490181c57d58583a3"
});  */
///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '4d6d9938d4be4bf9a07991a6e906610b';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'nyxn1n9';       
const APP_ID = 'Facial_Recognition';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
//const MODEL_VERSION_ID = 'face-detect-model';    
const IMAGE_URL = 'imageUrl';
///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////
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
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'home',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

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
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
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

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }
 
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch("http://localhost:3000/imageurl", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.user.input
      })
    })
    .then((response) => response.json())
    .then(response => {
      if (response) {
        fetch("http://localhost:3000/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then((response) => response.json())
        .then((count) => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))        
    })
    .catch((err) => console.log(err))
  }   

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg color= "#000000" num= {200} type= "cobweb" bg= {true} />
        <Navigation isSignedIn= {isSignedIn} onRouteChange= {this.onRouteChange} />
          { route === "home" ? (
          <div>
            <Logo />
            <Rank name= {this.state.user.name} entries= {this.state.user.entries} />
            <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit= {this.onButtonSubmit} />
            <FaceRecognition box= {box} imageUrl= {imageUrl} />
          </div>
          ) : route === "signin" ? (
          <Signin loadUser= {this.loadUser} onRouteChange= {this.onRouteChange} />
          ) : (
          <Register loadUser= {this.loadUser} onRouteChange= {this.onRouteChange} />
        )}
      </div>
    )
  }
}

export default App;
