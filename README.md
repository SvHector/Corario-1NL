
# 🎶 Corario 1NL

Bienvenido a **Corario 1NL**, una aplicación web progresiva (PWA) para registrar, consultar y gestionar canciones y letras cristianas de forma rápida, visual y moderna. Diseñada con una estética oscura, animaciones visuales y pensada para ser usada desde dispositivos móviles o escritorio.

---

## ✨ Funcionalidades principales

- 📋 Listado dinámico de canciones desde Firebase Realtime Database
- 🔍 Búsqueda por título o contenido de la letra
- ⭐ Marcar canciones como favoritas
- 🗑️ Eliminar y ✏️ editar canciones fácilmente
- ➕ Agregar nuevas canciones desde un formulario amigable
- 🎥 Pantalla de bienvenida animada y logo en video reproducido en bucle
- 🖤 Diseño visual moderno con colores blanco/negro
- 📲 Instalación como app PWA (funciona sin conexión)

---

## 🔧 Tecnologías utilizadas

- HTML5, CSS3, Bootstrap 5
- Firebase Realtime Database
- JavaScript ES6 (módulos)
- Service Worker + Manifest (PWA)
- GitHub Pages (despliegue gratuito)

---

## 🚀 Instalación / Uso

### Desde Web

1. Abre el sitio publicado en [https://TU_USUARIO.github.io/corario-1nl](https://TU_USUARIO.github.io/corario-1nl)
2. Interactúa directamente con el listado de canciones
3. Para instalar la app:
   - En Android: aparecerá un botón `📲 Instalar App`
   - En Escritorio: también podrás instalar como aplicación de escritorio
   - En iOS: usa Safari → Compartir → *Agregar a pantalla de inicio*

### Desde código fuente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/corario-1nl.git
   cd corario-1nl
   ```
2. Sube los archivos a un servidor o abre `index.html` en tu navegador (requiere estar servido desde HTTPS para la PWA)

---

## 📂 Estructura del proyecto

```
corario-1nl/
├── index.html               # Página de bienvenida
├── letras.html              # Listado principal de canciones
├── agregar.html             # Formulario para agregar/editar
├── manifest.json            # Configuración PWA
├── service-worker.js        # Caché offline
├── /css/styles.css          # Estilos generales
├── /js/firebase-config.js   # Conexión a Firebase
├── /js/letras.js            # Lógica del listado
├── /js/agregar.js           # Lógica del formulario
├── /assets/videos/          # Videos Bienvenido.mp4, 1NL.mp4
└── /assets/icons/           # Íconos para instalación (192, 512)
```

---

## 📦 Cómo publicar en GitHub Pages

1. Crea un repositorio y sube todo el contenido (no el ZIP, los archivos)
2. Ve a **Settings → Pages**
3. En **Source** elige `main` y `/(root)`
4. Espera unos minutos y accede vía:  
   `https://TU_USUARIO.github.io/corario-1nl`

---

## 💬 Créditos

Desarrollado por [Tu Nombre] con el apoyo técnico y creativo de **ChatGPT**, como asistente de desarrollo y diseño visual para la comunidad cristiana.  
Inspirado en la necesidad de tener una herramienta moderna para alabanza, adoración y servicio 🙌

---

## 🛡️ Licencia

Este proyecto es de uso libre para fines educativos o ministeriales.  
Se agradece dar crédito si se comparte públicamente.
