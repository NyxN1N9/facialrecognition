/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.jsx';
import './App.css';


//import { useCallback } from 'react';
//import { loadFull } from 'tsparticles';

/* const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
} */
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

/* 
// stumble through on my own //
function App() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);
  return (
    <>
        <div className='App'>,
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#0d47a1",
                        zIndex: -1
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                        zIndex: -1
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
        }}/>,
        <Navigation />,
        <Logo />,       
        <Rank />,
        <ImageLinkForm />
        // <FaceRecognition /> //
      </div>
    </>
  );
}

export default App; 

*/
