import React from "react";
import DraggableDialog from "../confirm";

const DeleteButton = ({ route, onDeleted, deleteFn}) => {
    return (
      <DraggableDialog route={route} onDeleted={onDeleted} deleteFn={deleteFn} />
     
    );
  };

export default DeleteButton;