import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';


const EditColorForm = (props) => {

  useEffect(() => {
    setColor(props.currentColor)
  }, [props])

  const [elemColor, setColor] = useState(props.currentColor);

  const handleChange = e => {
    const { name, value } = e.target;
    setColor({ ...elemColor, [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (elemColor.name && elemColor.type) props.updateColor(elemColor);
    
  }

  return (
    <form>
      <label>Name</label>
      <input className="u-full-width" type="text" value={elemColor.name} name="name" onChange={handleChange} />
      <label>Type</label>
      <input className="u-full-width" type="text" value={elemColor.type} name="type" onChange={handleChange} />
      <label>Color</label>

      <ColorPicker elemColor={elemColor} setColor={setColor} />
      {/* <input className="u-full-width" type="color" value={elemColor.color} name="color" onChange={handleChange} /> */}

      <button className="button-primary" type="submit" onClick={handleSubmit} >Edit color</button>
      <button type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
    </form>
  )
}

export default EditColorForm;