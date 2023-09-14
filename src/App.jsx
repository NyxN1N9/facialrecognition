/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.jsx';
import './App.css';

// class component from video walk thru //
class App extends Component {
    constructor(){
        super();
        this.sate = {
            input: "",
        }
    }
    onInputChange = (event) => {
        console.log(event.target.value);
    }
    onButtonSubmit = () => {
        console.log('click');
    }
    render(){
        return(
            <>
                <div className ="App">
                    <ParticlesBg type="cobweb" bg={true} />
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
