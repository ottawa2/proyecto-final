import {cargarDatosProducto, modal} from "./script.js";

const form = document.querySelector("form");


window.editarProducto = function (id) {
  fetch("http://localhost:3000/lista/" + id)
    .then((response) => response.json())
    .then((data) => {
      const { editar, nombre, descripcion, precio, imagen } =
        form.elements;

      // asignar los valores a los campos del formulario
      editar.value = data.id;
      nombre.value = data.nombre;
      descripcion.value = data.descripcion;
      precio.value = data.precio;
      imagen.value = data.imagen;

      modal.show()

    });
};

window.limpiarFormulario = function () {
  form.reset();
};

window.eliminarProducto = function (id) {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podras revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
    cancelButtonText: "Cancelar",
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/lista/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Eliminado!", data.message, "success");
          cargarDatosProducto();
        });
    }
  });
};

// paginacion
let pagina = 1;
const contador = document.querySelector("#paginacion h2");

window.paginaSiguiente = function () {
  pagina++;
  contador.innerText = pagina;
  cargarDatosProducto(pagina);
}

window.paginaAnterior = function () {
  if (pagina - 1 === 0) {
    Swal.fire("Error", "Esta es la primera pagina", "error");
  } else {
    pagina--;
    contador.innerText = pagina;
    cargarDatosProducto(pagina);
  }
}