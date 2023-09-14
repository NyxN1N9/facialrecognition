import './ImageLinkForm.css';
// destructure 
const ImageLinkForm = ({onInputChange, onButtonSubmit }) => {
    return (
        <div className='center'>
            <div className='f3'>     
                {'This magic Brain will detect faces in your pictures. Give it a try.'}                     
                <div className='form center pa4 br3 shadow-6'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={'onInputChange'}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>  
    );
}

export default ImageLinkForm;
