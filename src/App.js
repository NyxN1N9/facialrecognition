/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.js';
import './App.css';
import './index.css';

// class component from video walk thru //
class App extends Component {
    constructor(){
        super();
        this.state = {
            input: "",
        }
    }
    onInputChange = (event) => {
        console.log(event.target.value);
    }
    onButtonSubmit = () => {
        console.log('click');
        
///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'YOUR_PAT_HERE';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';       
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

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

/* curl --location --request POST "https://api.clarifai.com/v2/users/YOUR_USER_ID_HERE/apps/" \
--header "Content-Type: application/json" \
--header "Authorization: Key YOUR_PAT_HERE" \
--data-raw '{ b       
    "apps": [
        {
            "id": "test-application"
        }
    ]
}'
// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 */
        /* App.models.predict("","https://samples.clarifai.com/face-det.jpg").then(
            function(response){

            },
            function(err){
        
            }
        );   */
    }

    render(){
        return(
            <>
                <div className ="App">
                <ParticlesBg 
                    color="#ff0000" 
                    num={200} 
                    type="circle" 
                    bg={true} 
                />
                        /*"ball"
                        "lines"
                        "thick"
                        "circle"
                        "cobweb"
                        "polygon"
                        "square"
                        "tadpole"
                        "fountain"
                        "random"
                        "custom" */             
                        bg={true}
                        //color = "random, white"
                    />
                    <Navigation />
                    <Logo />
                    <Rank />
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                    {/*<FaceRecognition />*/}
                </div>
            </>
        );
    }
}

export default App;
