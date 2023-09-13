import { Tilt } from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = ()=>{
    return (
        <div className='zin ma4 mt0'>
           <Tilt className='Tilt br2 shadow-2' 
                options={{ max: 40}}// max tilt rotation (degrees) 
                style={{ height: 150, width: 150}}>
                <div className='Tilt-inner pa3'>
                    <img style={{ paddingTop: '10px'}} 
                    alt='logo' src={brain}/>
                </div>
            </Tilt>
        </div> 
    );
}
export default Logo;