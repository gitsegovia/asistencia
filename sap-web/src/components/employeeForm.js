import React from "react";
import CSS from "../App.css"

function EmployeeForm() {
  return (
    <form>
      <h1><center>Registro de Empleado</center></h1>
      <ul>
        <label>
          <b>Nombre: </b> <input type="text" placeholder="Escriba su nombre" name="firstName" id="firstName" required />
        </label>
      </ul>
      <ul>
        <label>
          <b>Apellido:</b> <input type="text" placeholder="Escriba su apellido" name="surname" />
        </label>
      </ul>
      <ul>
        <label>
          <b>Cedula:   </b> <input type="text" placeholder="Cedula de identidad" name="name" />
        </label>
      </ul>
      <ul>
        <label>
          <b>Firma:   </b> <input type="text" placeholder="Firme aqui" name="firm" />
        </label>
      </ul>
      <ul>
        <label>
          <b>Foto:    </b> <input type="text" placeholder="Foto" name="photo" />
        </label>
      </ul>
      <ul>
      <label>
          <b>Empresa</b>
      </label>
      </ul>
      <ul>
        <button type="submit" class="registerbtn">Register</button>
      </ul>

    </form>
  );
}

export default EmployeeForm;
