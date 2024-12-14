import { api } from "./utils.js";

import "./funcionesProducto.js";

export const modal = new bootstrap.Modal("#formulario", {
  keyboard: false,
});


document.addEventListener("DOMContentLoaded", function () {
  cargarDatosProducto(); // llamado a la funcion cargarDatosProducto

  const form = document.querySelector("form");

  const { nombre, descripcion, precio, imagen, editar } = form.elements; // Destructuring: recupera los elementos del formulario

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const data = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value,
      imagen: imagen.value
    };

    // enviar los datos
    api({
      method: editar.value ? "PUT" : "POST",
      url: editar.value ? `/lista/${editar.value}` : "/lista",
      data,
    })
      .then(({ data }) => {
        console.log(data);
        Swal.fire("Exito!", data.message, "success")
        cargarDatosProducto()
        form.reset()
        modal.hide()
      })
      .catch((err) =>
        Swal.fire("Error!", err?.response?.data?.message, "error")
      );
  });
});

export function cargarDatosProducto(pagina = 1) {
  const container = document.querySelector("#card-container"); // Contenedor para las cards
  container.innerHTML = "";

  // Petición a localhost:3000/lista del servidor de Node.js
  api.get(`/lista?page=${pagina}&perPage=3`).then(({ data }) => {
    for (const lista of data) {
      container.innerHTML += `
        <div class="card" style="width: 18rem; margin: 1rem;">
          <img src="${lista.imagen}" class="card-img-top" alt="${lista.nombre}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${lista.nombre}</h5>
            <p class="card-text">${lista.descripcion}</p>
            <p class="card-text text-muted">Precio: $${lista.precio}</p>
            <div class="btn-group" role="group" aria-label="actions">
              <button class="btn btn-primary" onclick="editarProducto(${lista.id})">
                <i class="fa-solid fa-pen-to-square"></i> Editar
              </button>
              <button class="btn btn-danger" onclick="eliminarProducto(${lista.id})">
                <i class="fa-solid fa-trash-can"></i> Eliminar
              </button>
            </div>
          </div>
        </div>`;
    }
  });
}

