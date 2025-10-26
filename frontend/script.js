// =======================
// 🌟 FUNCIONES GENERALES
// =======================

// Quita tildes y pasa a minúsculas
function normalizarTexto(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// =======================
// 🎯 FUNCIÓN PRINCIPAL
// =======================
async function buscar() {
  const tipo = document.getElementById("tipoBusqueda")?.value || "recetas"; // recetas | libros | videos
  const ingredienteInput = document.getElementById("busquedaInput");
  const categoriaSelect = document.getElementById("categoriaSelect");
  const checkboxes = document.querySelectorAll(".especificacion");

  if (!ingredienteInput || !categoriaSelect) {
    console.error("❌ No se encontraron elementos del formulario.");
    return;
  }
  const ingrediente = ingredienteInput.value.trim();
  const categoria = categoriaSelect.value;
  const especificacionesSeleccionadas = Array.from(checkboxes)
    .filter(ch => ch.checked)
    .map(ch => normalizarTexto(ch.value))
    .join(",");

  // Construir URL según el tipo
  let url = `http://localhost:3000/${tipo.toLowerCase()}/buscar?`;
  const params = new URLSearchParams();

  if (ingrediente) params.append("ingredientes", ingrediente);
  if (categoria && categoria !== "Todas las categorías") params.append("categoria", categoria);
  if (especificacionesSeleccionadas) params.append("especificaciones", especificacionesSeleccionadas);

  url += params.toString();
  console.log("🔗 URL generada:", url);

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("No se encontraron resultados");
    const datos = await respuesta.json();
    mostrarResultados(datos, tipo);
  } catch (error) {
    console.error("❌ Error al conectar con la API:", error);
    document.getElementById("resultados").innerHTML = `
      <p style="color:red; text-align:center;">Error al conectar con la API 😢</p>
    `;
  }
}

// =======================
// 🎨 MOSTRAR RESULTADOS
// =======================
function mostrarResultados(datos, tipo) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  if (!datos || datos.length === 0) {
    contenedor.innerHTML = `
      <p style="color:red; text-align:center;">No se encontraron resultados 😢</p>
    `;
    return;
  }

  datos.forEach(item => {
    const card = document.createElement("div");
    card.className = "tarjeta";

    if (tipo === "recetas") {
      card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p><b>Categoría:</b> ${item.categoria || "-"}</p>
        <p><b>Dificultad:</b> ${item.dificultad || "-"}</p>
        <p><b>Tiempo:</b> ${item.tiempo_preparacion || "-"} min</p>
        <p><b>Ingredientes:</b> ${item.ingredientes?.map(i => i.nombre).join(", ")}</p>
        <p><b>Especificaciones:</b> ${item.especificaciones?.join(", ") || "-"}</p>
      `;
    } else if (tipo === "libros") {
      card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p><b>Descripción:</b> ${item.descripcion}</p>
        <p><b>Ingredientes:</b> ${item.ingredientes?.map(i => i.nombre).join(", ")}</p>
        <p><b>Especificaciones:</b> ${item.especificaciones?.join(", ") || "-"}</p>
      `;
    } else if (tipo === "videos") {
      card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p><b>Duración:</b> ${item.duracion} seg</p>
        <p><b>Ingredientes:</b> ${item.ingredientes?.map(i => i.nombre).join(", ")}</p>
      `;
    }

    contenedor.appendChild(card);
  });
}

// =======================
// ⚡ CONEXIÓN CON EL BOTÓN
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("buscarBtn");
  if (boton) {
    boton.addEventListener("click", buscar);
    console.log("✅ Botón 'Buscar' conectado correctamente.");
  } else {
    console.error("❌ No se encontró el botón con id='buscarBtn'");
  }
});
