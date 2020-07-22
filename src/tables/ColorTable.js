import React from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';


const DragHandle = sortableHandle(() => (
  
  <td style={{ cursor: 'move'  }} >::::</td>)
  
);

const Row = sortableElement(({ data, props }) => (
  <tr>
    <DragHandle />
    <td>{data.id}</td>
    <td>{data.name}</td>
    <td>{data.type}</td>
    <td><div style={{ backgroundColor: data.color, width: '38px', height: '38px', borderRadius: '20%' }}></div></td>
    <td>
      <button style={{ backgroundColor: "rgb(242, 166, 166)" }} onClick={() => props.deleteColor(data.id)}>Delete</button>
      <button style={{ backgroundColor: "#adaff7" }} onClick={() => props.editColor(data.id, data)}>Edit</button>
    </td>
  </tr>
));


const ColorTable = sortableContainer((props) => {

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '5%' }}></th>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.colors.length > 0 ? (
         
          props.colors.map((elemColor, i) => {
            return (
              <Row key={`color-${i}`} index={i} data={elemColor} props={props} />
            )
          }))
         : (
            <tr>
              <td colSpan={4}>No data found</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
})

export default ColorTable;