import './ImageLinkForm.css';
// destructure 
const ImageLinkForm = () => {
    return (
        <div className='f3 center dib white'>     
            {'This magic Brain will detect faces in your pictures. Give it a try.'}
            <br></br>   
            <br></br>                  
            <div className='form center pa4 br3 shadow-6'> 
                <input className='f4 pa2 w-70' 
                    type='text'/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;
