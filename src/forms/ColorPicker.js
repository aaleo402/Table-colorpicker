import React, { useState } from 'react';
import { ChromePicker } from 'react-color';


const ColorPicker = ({elemColor, setColor}) => {

  const [isOpen, setOpen] = useState(false)

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  const handleChangeComplete = (color) => {
    setColor({ ...elemColor, color: color.hex });
  };

  return (
    <>
    <button className="u-full-width"
      style={{ backgroundColor: elemColor.color, color: '#fff' }}
      type="button"
      onClick={() => setOpen(!isOpen)}
    >
      {elemColor.color}
    </button>
      {
    isOpen ? <div style={popover}>
      <div style={cover} onClick={() => setOpen(false)} />
      <ChromePicker color={elemColor.color} onChange={handleChangeComplete} />
    </div> : null
  }
  </>
  )
}

export default ColorPicker;