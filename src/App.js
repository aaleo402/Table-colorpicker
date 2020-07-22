import React, { useState, useEffect } from "react";
import colorsList from "./data.js";
import ColorTable from "./tables/ColorTable";
import AddColorForm from "./forms/AddColorForm";
import EditColorForm from "./forms/EditColorForm";
import arrayMove from "array-move";

colorsList.forEach((color, i) => {
  color["id"] = i;
})

const App = () => {

  const initialState = () => (
    JSON.parse(window.localStorage.getItem('colorsList')) || colorsList
  )

  const [colors, setColors] = useState(initialState);

  useEffect(() => {
    function saveState() {
      window.localStorage.setItem('colorsList', JSON.stringify(colors));
    }

    window.addEventListener(
      "beforeunload",
      saveState
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        saveState
      );
    }
  }, [colors])

 
  const updateBeforeSortStart = () => {
  function disableselect() { return false }
  document.onselectstart = disableselect;
  document.onmousedown = disableselect;
}

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
    document.onselectstart = null;
    document.onmousedown = null;

  };

  const addColor = (elemColor) => {
    elemColor.id = colors.length + 1;
    setColors([...colors, elemColor]);
  };

  const deleteColor = (id) => {
    setColors(colors.filter((color) => color.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialColor = { id: "null", name: "", type: "", color: "#000"};

  const [currentColor, setCurrentColor] = useState(initialColor);

  const editColor = (id, elemColor) => {
    setEditing(true);
    setCurrentColor(elemColor);
  };

  const updateColor = (newColor) => {
    setColors(
      colors.map((elemColor) => (elemColor.id === currentColor.id ? newColor : elemColor))
    );
    setCurrentColor(initialColor);
    setEditing(false);
  };

  return (
    <div className="container">
      <h1 style={{textAlign: "center"}}>Table data</h1>
      <div className="row">
        <div className="four columns">
          {editing ? (
            <div>
              <h2>Edit color</h2>
              <EditColorForm
                currentColor={currentColor}
                setEditing={setEditing}
                updateColor={updateColor}
              />
            </div>
          ) : (
              <div>
                <h2>Add color</h2>
                <AddColorForm addColor={addColor} />
              </div>
            )}
        </div>
        <div className="eight columns">
          <h2>View colors list</h2>

          <ColorTable
            useDragHandle
            updateBeforeSortStart={updateBeforeSortStart}
            onSortEnd={onSortEnd}
            colors={colors}
            deleteColor={deleteColor}
            editColor={editColor}
          />

        </div>
      </div>
    </div>
  );
};

export default App;