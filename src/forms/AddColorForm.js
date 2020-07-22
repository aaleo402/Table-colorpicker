import React, { useState } from 'react';
import ColorPicker from './ColorPicker';


const AddColorForm = (props) => {

  const initColor = { id: 'null', name: '', type: '', color: '#000' };

  const [elemColor, setColor] = useState(initColor);

  const handleChange = e => {
    const { name, value } = e.target;
    setColor({ ...elemColor, [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (elemColor.name && elemColor.type) {
      handleChange(e, props.addColor(elemColor));
    }
  }


  return (
    <form>
      <label>Name</label>
      <input className="u-full-width" type="text" value={elemColor.name} name="name" onChange={handleChange} />
      <label>Type</label>
      <input className="u-full-width" type="text" value={elemColor.type} name="type" onChange={handleChange} />
      <label>Color</label>

      <ColorPicker setColor={setColor} elemColor={elemColor} />
      <button className="button-primary" type="submit" onClick={handleSubmit} >Add color</button>
    </form>
  )
}

export default AddColorForm;