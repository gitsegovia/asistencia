import React from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { IconButton } from "@material-ui/core";
import axios, { baseURL }  from "../../utils/axios";

const DeleteButton = ({ route, onDeleted, deleteFn }) => {
    return (
      <IconButton>
        <HighlightOffRoundedIcon
          onClick={() =>
            axios.delete(route)
              .then((response) => onDeleted(response.data))
              .catch((e) => console.log(e))
          }
        />
      </IconButton>
    );
  };

export default DeleteButton;