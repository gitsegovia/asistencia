import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { StarBorder, ExpandMore, ExpandLess, InboxOutlined} from "@material-ui/icons";

const BtnDesplegable = ({title, children, icon}) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {children}
        </List>
      </Collapse>
    </>
  );
};

export default BtnDesplegable;
