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
                <td>${equipo.nombre}</td>
                <td id="bodega-${index}">${equipo.bodega}</td>
                <td id="prestados-${index}">${equipo.prestados}</td>
                <td id="mantenimiento-${index}">${equipo.mantenimiento}</td>
                <td>800</td>
                <td><input type="number" id="input-prestar-${index}" min="0" placeholder="0"></td>
                <td><input type="number" id="input-mantenimiento-${index}" min="0" placeholder="0"></td>
                <td><button onclick="actualizarInventario(${index})">Actualizar</button></td>
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

let deferredInstallPrompt;
const btnInstall = document.getElementById('btn-install');

// Cuando la PWA está a punto de poder instalarse…
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();                // Evita el prompt automático
  deferredInstallPrompt = e;         // Guarda el evento
  btnInstall.style.display = 'block';// Muestra tu botón
});

// Al hacer clic en tu botón “Instalar”
btnInstall.addEventListener('click', async () => {
  btnInstall.style.display = 'none'; // Oculta el botón
  deferredInstallPrompt.prompt();    // Muestra el diálogo de instalación
  const { outcome } = await deferredInstallPrompt.userChoice;
  console.log('Resultado de la instalación:', outcome);
  deferredInstallPrompt = null;
});
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
</script>
// ————— Instalación de la PWA —————
let deferredPrompt;
const btnInstall = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.style.display = 'block';
});

btnInstall.addEventListener('click', async () => {
  btnInstall.style.display = 'none';
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  console.log('User choice:', choice.outcome);
  deferredPrompt = null;
});
