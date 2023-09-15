/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import './index.css';

// class component from video walk thru //
class App extends Component {
    render(){
        return(
            <>
                <div className ="App">
                    <ParticlesBg type="cobweb" num={200} bg={true} />, 
                    <Navigation />,
                    <Logo />,
                    <Rank />,
                    <ImageLinkForm />,
                    {/*<FaceRecognition />*/}
                </div>
            </>
        );
    }
}

export default App;
