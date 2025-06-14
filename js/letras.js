
import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const contenedor = document.getElementById("listadoCanciones");

// Detectar entrada en buscador (opcional para futuro)
let canciones = [];

function renderizarCanciones(filtro = "") {
  contenedor.innerHTML = "";

  canciones.forEach((cancion) => {
    const coincide = cancion.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
                     cancion.letra.toLowerCase().includes(filtro.toLowerCase());
    if (coincide || filtro === "") {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      card.innerHTML = `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front p-3 bg-dark text-white rounded">
              <h5>${cancion.titulo}</h5>
              <p><em>${cancion.genero}</em></p>
              <p><small>Autor: ${cancion.autor}</small></p>
              <span class="badge bg-${cancion.favorita ? "warning text-dark" : "secondary"}">
                ${cancion.favorita ? "★ Favorita" : "☆ Marcar"}
              </span>
            </div>
            <div class="flip-card-back p-3 bg-light text-dark rounded">
              <p>${cancion.letra.replaceAll("\n", "<br>")}</p>
              <hr>
              <p><strong>Notas:</strong> ${cancion.notas}</p>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    }
  });
}

// Escuchar datos desde Firebase
const cancionesRef = ref(db, "canciones");
onValue(cancionesRef, (snapshot) => {
  canciones = [];
  snapshot.forEach((child) => {
    canciones.push(child.val());
  });
  renderizarCanciones();
});
