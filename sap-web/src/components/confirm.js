import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import axios  from "../utils/axios";
import Alert from "./Alert";

export default function DraggableDialog({ route, onDeleted, deleteFn }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    axios
      .delete(route)
      .then((response) => {
        setOpen(false);
        onDeleted(response.data)
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <HighlightOffRoundedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        //PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Alerta
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estas seguro de eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOk} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  
    </div>
  );
}
