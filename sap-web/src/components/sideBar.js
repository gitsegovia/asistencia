import React, { useState } from "react";
import Drawer from '@material-ui/core/Drawer';


export default function SideBar({visible}){
  return (
    <Drawer variant="persistent"
    open={visible}>
      <p>Hola</p>
    </Drawer>
  )
}
SideBar.defaultProps = {
  visible: false
}
