const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const API_URL = "http://localhost:3000/recetas/" + id;

const contenedor = document.getElementById("detalleReceta");

async function cargarReceta() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("No se encontró la receta");
    const receta = await res.json();

    contenedor.innerHTML = `
      <div class="detalle-titulo">
        <h2>${receta.titulo}</h2>
        <p class="categoria">${receta.categoria || "Sin categoría"}</p>
      </div>

      <p class="descripcion">${receta.descripcion || ""}</p>

      <div class="detalle-info">
        <p><strong>Dificultad:</strong> ${receta.dificultad || "—"}</p>
        <p><strong>Tiempo:</strong> ${receta.tiempo_preparacion || "—"} min</p>
      </div>

      <h3>🥕 Ingredientes</h3>
      <ul class="ingredientes-lista">
        ${receta.ingredientes
          .map(i => `<li>${i.cantidad} ${i.unidad} de ${i.nombre}</li>`)
          .join("")}
      </ul>

      <h3>👨‍🍳 Pasos</h3>
      <ol class="pasos-lista">
        ${receta.pasos.map(p => `<li>${p}</li>`).join("")}
      </ol>

      ${
        receta.especificaciones
          ? `<h3>🌿 Especificaciones</h3>
             <p>${receta.especificaciones.join(", ")}</p>`
          : ""
      }

      <a href="index.html" class="volver-btn">⬅ Volver al buscador</a>
    `;
  } catch (error) {
    contenedor.innerHTML = `<p style="color:red;">Error al cargar la receta 😢</p>`;
  }
}

cargarReceta();
