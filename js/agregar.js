
import { db } from "./firebase-config.js";
import { ref, set, update, remove, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const formulario = document.getElementById("formCancion");
const idInput = document.getElementById("idCancion");

const urlParams = new URLSearchParams(window.location.search);
const cancionId = urlParams.get("id");

if (cancionId) {
  const dataRef = ref(db);
  get(child(dataRef, "canciones/" + cancionId)).then((snapshot) => {
    if (snapshot.exists()) {
      const c = snapshot.val();
      document.getElementById("titulo").value = c.titulo;
      document.getElementById("autor").value = c.autor;
      document.getElementById("genero").value = c.genero;
      document.getElementById("letra").value = c.letra;
      document.getElementById("notas").value = c.notas;
      document.getElementById("favorita").checked = !!c.favorita;
      idInput.value = cancionId;
    }
  });
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = idInput.value || Date.now().toString();
  const data = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    genero: document.getElementById("genero").value,
    letra: document.getElementById("letra").value,
    notas: document.getElementById("notas").value,
    favorita: document.getElementById("favorita").checked,
    fechaRegistro: new Date().toISOString()
  };

  const registroRef = ref(db, "canciones/" + id);
  set(registroRef, data).then(() => {
    alert("Canción guardada correctamente.");
    window.location.href = "letras.html";
  });
});
