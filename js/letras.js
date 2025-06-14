
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
      card.className = "col-md-12 mb-3";

      const id = ids[index];
      const letraID = "letra-" + id;

      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5 class="card-title mb-1">${cancion.titulo}</h5>
                <p class="mb-0"><em>${cancion.genero}</em></p>
                <p class="mb-0"><small>Autor: ${cancion.autor}</small></p>
              </div>
              <div>
                <span class="badge bg-${cancion.favorita ? "warning text-dark" : "secondary"} pointer favorito-badge" data-id="${id}" style="font-size: 20px;">
                  ${cancion.favorita ? "★" : "☆"}
                </span>
              </div>
            </div>
            <div class="mt-2">
              <button class="btn btn-sm btn-outline-primary toggleLetra" data-id="${letraID}">Ver Letra</button>
              <a href="agregar.html?id=${id}" class="btn btn-sm btn-secondary">Editar</a>
              <button class="btn btn-sm btn-danger eliminar-btn" data-id="${id}">Eliminar</button>
            </div>
            <div class="collapse mt-3" id="${letraID}">
              <p class="mb-2">${cancion.letra.replaceAll("\n", "<br>")}</p>
              <p class="mb-0"><strong>Notas:</strong> ${cancion.notas}</p>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    }
  });

  document.querySelectorAll(".favorito-badge").forEach(span => {
    span.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = span.getAttribute("data-id");
      const nuevaFav = span.textContent.trim() === "☆";
      update(ref(db, "canciones/" + id), { favorita: nuevaFav });
    });
  });

  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm("¿Estás seguro de eliminar esta canción?")) {
        remove(ref(db, "canciones/" + id));
      }
    });
  });

  document.querySelectorAll(".toggleLetra").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.getAttribute("data-id"));
      if (target) {
        target.classList.toggle("show");
        btn.textContent = target.classList.contains("show") ? "Ocultar Letra" : "Ver Letra";
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
