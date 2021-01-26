import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from "../../utils/axios";

const PermitButton = ({ permit, role }) => {
  const [hasPermit, setHasPermit] = useState(role.permits.findIndex(p => p.id === permit.id) >= 0);
  return (
    <Button
      style={{marginRight: 5}}
      variant="contained"  
      color={hasPermit ? "primary" : ""}
      onClick={() => {
        addPermitToRole(role, permit)
            .then(response => {
                setHasPermit(!hasPermit);
            })
            .catch(err => console.log(err));
      }}
    >
      {permit.name}
    </Button>
  );
};

async function addPermitToRole(role, permit) {
  const response = await axios.post("/attachOrDetachPermit", {
    roleId: role.id,
    permitId: permit.id,
  });
  return response.data.data;
}

export default PermitButton;
