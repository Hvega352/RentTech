let equipos = [
    { nombre: "Computador de escritorio", bodega: 800, prestados: 0, mantenimiento: 0 },
    { nombre: "Computador portátil", bodega: 800, prestados: 0, mantenimiento: 0 },
    { nombre: "Impresora", bodega: 800, prestados: 0, mantenimiento: 0 },
    { nombre: "Televisor", bodega: 800, prestados: 0, mantenimiento: 0 },
    { nombre: "Video Beam", bodega: 800, prestados: 0, mantenimiento: 0 }
];

// FUNCIONES

// Cargar inventario desde localStorage si existe
function cargarInventario() {
    const datosGuardados = localStorage.getItem('inventarioRentTech');
    if (datosGuardados) {
        equipos = JSON.parse(datosGuardados);
    }
}

// Guardar inventario en localStorage
function guardarInventario() {
    localStorage.setItem('inventarioRentTech', JSON.stringify(equipos));
}

function generarInventario() {
    const tbody = document.querySelector("#inventario tbody");
    tbody.innerHTML = "";

    equipos.forEach((equipo, index) => {
        const fila = `
        <tr>
          <td data-label="Equipo">${equipo.nombre}</td>
          <td data-label="En Bodega" id="bodega-${index}">${equipo.bodega}</td>
          <td data-label="Prestados" id="prestados-${index}">${equipo.prestados}</td>
          <td data-label="Mantenimiento" id="mantenimiento-${index}">${equipo.mantenimiento}</td>
          <td data-label="Total">800</td>
          <td data-label="Prestar"><input type="number" id="input-prestar-${index}" min="0" placeholder="0"></td>
          <td data-label="Mantenimiento"><input type="number" id="input-mantenimiento-${index}" min="0" placeholder="0"></td>
          <td data-label="Acción"><button onclick="actualizarInventario(${index})">Actualizar</button></td>
        </tr>
      `;
        tbody.innerHTML += fila;
    });
}

function actualizarInventario(index) {
    const prestar = parseInt(document.getElementById(`input-prestar-${index}`).value) || 0;
    const mantenimiento = parseInt(document.getElementById(`input-mantenimiento-${index}`).value) || 0;

    if (prestar + mantenimiento > equipos[index].bodega) {
        alert("¡No puedes prestar o enviar más equipos de los que tienes en bodega!");
        return;
    }

    equipos[index].prestados += prestar;
    equipos[index].mantenimiento += mantenimiento;
    equipos[index].bodega -= (prestar + mantenimiento);

    guardarInventario(); // Guardamos los cambios
    generarInventario(); // Actualizamos la vista
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    cargarInventario();
    generarInventario();
});

