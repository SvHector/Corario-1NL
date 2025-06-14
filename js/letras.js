
import { db } from "./firebase-config.js";
import { ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const contenedor = document.getElementById("listadoCanciones");
const buscador = document.getElementById("buscador");
const filtroFavoritas = document.getElementById("filtroFavoritas");

let canciones = [];
let ids = [];

function renderizarCanciones(filtroTexto = "", soloFavoritas = false) {
  contenedor.innerHTML = "";

  canciones.forEach((cancion, index) => {
    const coincideTexto = cancion.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                          cancion.letra.toLowerCase().includes(filtroTexto.toLowerCase());
    const coincideFavorita = !soloFavoritas || cancion.favorita;

    if ((coincideTexto || filtroTexto === "") && coincideFavorita) {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      card.innerHTML = `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front p-3 bg-dark text-white rounded position-relative">
              <h5>${cancion.titulo}</h5>
              <p><em>${cancion.genero}</em></p>
              <p><small>Autor: ${cancion.autor}</small></p>
              <span class="badge position-absolute top-0 end-0 m-2 bg-${cancion.favorita ? "warning text-dark" : "secondary"} pointer favorito-badge" data-id="${ids[index]}">
                ${cancion.favorita ? "★" : "☆"}
              </span>
              <div class="mt-3">
                <a href="agregar.html?id=${ids[index]}" class="btn btn-sm btn-light">Editar</a>
                <button class="btn btn-sm btn-danger eliminar-btn" data-id="${ids[index]}">Eliminar</button>
              </div>
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

  // Activar clic para estrella de favorito
  document.querySelectorAll(".favorito-badge").forEach(span => {
    span.addEventListener("click", (e) => {
      e.stopPropagation(); // prevenir efecto flip
      const id = span.getAttribute("data-id");
      const nuevaFav = span.textContent.trim() === "☆";
      update(ref(db, "canciones/" + id), { favorita: nuevaFav });
    });
  });

  // Activar botón de eliminar
  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm("¿Estás seguro de eliminar esta canción?")) {
        remove(ref(db, "canciones/" + id));
      }
    });
  });
}

const cancionesRef = ref(db, "canciones");
onValue(cancionesRef, (snapshot) => {
  canciones = [];
  ids = [];
  snapshot.forEach((child) => {
    canciones.push(child.val());
    ids.push(child.key);
  });
  renderizarCanciones();
});

buscador.addEventListener("input", () => {
  renderizarCanciones(buscador.value, filtroFavoritas.checked);
});
filtroFavoritas.addEventListener("change", () => {
  renderizarCanciones(buscador.value, filtroFavoritas.checked);
});
