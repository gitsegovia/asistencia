import React, { useState } from "react";
import axios from 'axios'

function EmployeeForm2() {

  const [firstName, setFirstName] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    let submit = true;

    if(firstName==='') submit=false;
    

    if(submit){
      //enviamos al api
      const data = {
        firstName
      };
      const response = await axios.post('http://localhost:3002/employee', data);
      console.log(response);
      // error: false,
      // msg: "",
      // data: null,
      // token: null
      if(response.error===true){
        console.log(response.msg);
      }else{
        //mensaje exitoso
        console.log(response.msg);
      }

    }else{
      //
      return false;
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h1><center>Registro de Empleado</center></h1>
      <ul>
        <label>
          <b>Nombre: </b> 
          <input 
            type="text" 
            placeholder="Escriba su nombre" 
            name="firstName" 
            id="firstName" 
            value={firstName}
            onChange={setFirstName}
            required />
            {/* 
            <TextField
          error={firtsNameError}
          id="filled-error-helper-text"
          label="Error"
          value={firstName}
            onChange={setFirstName}
          helperText={firstNameText}
          variant="filled"
        /> */}
        </label>
      </ul>
      <ul>
        <label>
          <b>Apellido:</b> 
          <input 
          type="text" 
          placeholder="Escriba su apellido" 
          name="surname" />
        </label>
      </ul>
      <ul>
        <label>
          <b>Cedula: </b> 
          <input 
          type="text" 
          placeholder="Cedula de identidad" 
          name="name" />
        </label>
      </ul>
      <ul>
        <label>
          <b>Firma:</b> 
          <input 
          type="text" 
          placeholder="Firme aqui" 
          name="firm" />
        </label>
      </ul>
      <ul>
        <label>
          <b>Foto:</b> 
          <input 
          type="text"
          placeholder="Foto"
          name="photo" />
        </label>
      </ul>
      <ul>
      <label>
          <b>Empresa: </b>
          <select id="country" name="country">
          <option value="gobernacion">Gobernacion</option>
          <option value="dgi">DGI</option>
         </select>
      </label>
      </ul>
      <ul>
        <button type="submit" onClick class="registerbtn">Register</button>
      </ul>

    </form>
  );
}

export default EmployeeForm2;
