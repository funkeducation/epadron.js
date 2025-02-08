// Variables globales para almacenar el estado de la aplicación
let presupuestoMensual = 0; // Presupuesto inicial
let presupuestoRestante = 0; // Presupuesto restante disponible
let nombreUsuario = ''; // Nombre del usuario
let gastosTotales = 0; // Total de los gastos realizados
let listaGastos = []; // Lista de objetos con descripción y monto de los gastos

// Elementos del DOM para interacción con la interfaz de usuario
const formularioPresupuesto = document.getElementById('formularioPresupuesto');
const formularioGasto = document.getElementById('formularioGasto');
const alerta = document.getElementById('alerta');
const tablaGastos = document.getElementById('tablaGastos');
const tablaResultadosFiltrados = document.getElementById('tablaResultadosFiltrados').querySelector('tbody');
const presupuestoInicialEl = document.getElementById('presupuestoInicial');
const presupuestoRestanteEl = document.getElementById('presupuestoRestante');
const infoPresupuesto = document.getElementById('infoPresupuesto');
const botonReiniciar = document.getElementById('botonReiniciar');
const botonFinalizar = document.getElementById('botonFinalizar');
const botonLimpiar = document.getElementById('botonLimpiar');
const inputPresupuesto = document.getElementById('presupuesto');
const nombreUsuarioInput = document.getElementById('nombreUsuario');
const botonNombreUsuario = document.getElementById('botonNombreUsuario');

// Elementos del mensaje de confirmación para reiniciar presupuesto
const mensajeReiniciar = document.createElement('div');
mensajeReiniciar.id = 'confirmacionReiniciar';
mensajeReiniciar.style.display = 'none';
mensajeReiniciar.style.textAlign = 'center';
mensajeReiniciar.style.background = 'rgba(0,0,0,0.8)';
mensajeReiniciar.style.color = 'white';
mensajeReiniciar.style.padding = '20px';
mensajeReiniciar.style.position = 'fixed';
mensajeReiniciar.style.top = '50%';
mensajeReiniciar.style.left = '50%';
mensajeReiniciar.style.transform = 'translate(-50%, -50%)';
mensajeReiniciar.style.borderRadius = '10px';
mensajeReiniciar.style.zIndex = '1000';
mensajeReiniciar.style.fontSize = '1.3rem';
mensajeReiniciar.innerHTML = `
    <p>¿Estás seguro de reiniciar el presupuesto? Perderás toda la información ingresada.</p>
    <button id="confirmarReiniciar" style="margin: 5px; padding: 10px; background: green; color: white; border: none; border-radius: 5px;">Confirmar</button>
    <button id="cancelarReiniciar" style="margin: 5px; padding: 10px; background: red; color: white; border: none; border-radius: 5px;">Cancelar</button>
`;
document.body.appendChild(mensajeReiniciar);
const confirmarReiniciar = document.getElementById('confirmarReiniciar');
const cancelarReiniciar = document.getElementById('cancelarReiniciar');

// Elementos del mensaje de confirmación para finalizar ingreso de gastos
const mensajeFinalizar = document.createElement('div');
mensajeFinalizar.id = 'confirmacionFinalizar';
mensajeFinalizar.style.display = 'none';
mensajeFinalizar.style.textAlign = 'center';
mensajeFinalizar.style.background = 'rgba(0,0,0,0.8)';
mensajeFinalizar.style.color = 'white';
mensajeFinalizar.style.padding = '20px';
mensajeFinalizar.style.position = 'fixed';
mensajeFinalizar.style.top = '50%';
mensajeFinalizar.style.left = '50%';
mensajeFinalizar.style.transform = 'translate(-50%, -50%)';
mensajeFinalizar.style.borderRadius = '10px';
mensajeFinalizar.style.zIndex = '1000';
mensajeFinalizar.style.fontSize = '1.3rem';
mensajeFinalizar.innerHTML = `
    <p>¿Estás seguro de finalizar el ingreso de gastos? No podrás registrar más gastos después de esto.</p>
    <button id="confirmarFinalizar" style="margin: 5px; padding: 10px; background: green; color: white; border: none; border-radius: 5px;">Confirmar</button>
    <button id="cancelarFinalizar" style="margin: 5px; padding: 10px; background: red; color: white; border: none; border-radius: 5px;">Cancelar</button>
`;
document.body.appendChild(mensajeFinalizar);
const confirmarFinalizar = document.getElementById('confirmarFinalizar');
const cancelarFinalizar = document.getElementById('cancelarFinalizar');

// Desactivar el botón de finalizar inicialmente
botonFinalizar.disabled = true;

// Guardar datos en el Local Storage
function guardarEnLocalStorage() {
    const datos = {
        nombreUsuario,
        presupuestoMensual,
        presupuestoRestante,
        listaGastos,
        formularioOculto: formularioPresupuesto.style.display === 'none'
    };
    localStorage.setItem('gestionPresupuesto', JSON.stringify(datos));
}

// Cargar datos desde el Local Storage al iniciar la aplicación
function cargarDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('gestionPresupuesto');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        nombreUsuario = datos.nombreUsuario || '';
        presupuestoMensual = datos.presupuestoMensual || 0;
        presupuestoRestante = datos.presupuestoRestante || 0;
        listaGastos = datos.listaGastos || [];

        // Restaurar interfaz con datos cargados
        if (nombreUsuario) {
            document.title = `Gestión de Presupuesto de ${nombreUsuario}`;
            document.querySelector('h1').textContent = `GESTIÓN DE PRESUPUESTO DE ${nombreUsuario}`;
        }

        if (presupuestoMensual > 0) {
            presupuestoInicialEl.textContent = `$${presupuestoMensual.toFixed(2)}`;
            presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
            infoPresupuesto.style.display = "block";
            formularioGasto.style.display = "block";
            listaGastos.forEach(gasto => mostrarMensajeEnTabla(gasto.descripcion, gasto.monto, gasto.fecha));
            verificarEstadoBotonFinalizar();
        }

        if (datos.formularioOculto) {
            formularioPresupuesto.style.display = "none";
            formularioGasto.style.display = "block";
        }
    }
}

// Verificar si el botón de finalizar debe estar habilitado
function verificarEstadoBotonFinalizar() {
    const botonesDependientesDeGastos = [botonFinalizar];
    if (listaGastos.length > 0) {
        botonesDependientesDeGastos.forEach(boton => boton.disabled = false);
    } else {
        botonesDependientesDeGastos.forEach(boton => boton.disabled = true);
    }
}

// Filtrar gastos por descripción
function filtrarGastosPorDescripcion(termino) {
    if (!termino.trim()) {
        tablaResultadosFiltrados.innerHTML = "<tr><td colspan='3'>Ingrese un término de búsqueda</td></tr>";
        return;
    }

    const opciones = { keys: ["descripcion"], threshold: 0.3 };
    const fuse = new Fuse(listaGastos, opciones);
    const resultados = fuse.search(termino).map(result => result.item);

    actualizarTablaResultados(resultados);
}

// Limpiar resultados de la tabla de gastos filtrados
function limpiarResultadosFiltrados() {
    tablaResultadosFiltrados.innerHTML = '';
}

// Actualizar la tabla con los resultados filtrados
function actualizarTablaResultados(resultados) {
    tablaResultadosFiltrados.innerHTML = '';

    if (resultados.length === 0) {
        tablaResultadosFiltrados.innerHTML = "<tr><td colspan='3'>No se encontraron resultados.</td></tr>";
        return;
    }

    resultados.forEach(gasto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${gasto.descripcion}</td>
            <td>$${gasto.monto.toFixed(2)}</td>
            <td>${gasto.fecha}</td>
        `;
        tablaResultadosFiltrados.appendChild(fila);
    });
}

// Evento para capturar el nombre del usuario y actualizar el texto del presupuesto
botonNombreUsuario.addEventListener('click', function (e) {
    e.preventDefault();
    nombreUsuario = nombreUsuarioInput.value.trim();
    if (!nombreUsuario) {
        nombreUsuario = "Usuario"; // Valor predeterminado si no ingresa nombre
    }

    // Actualizar el título y el presupuesto inicial con el nombre del usuario
    document.title = `Gestión de Presupuesto de ${nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1).toLowerCase()}`;
    document.querySelector('h1').textContent = `GESTIÓN DE PRESUPUESTO DE ${nombreUsuario.toUpperCase()}`;
    document.getElementById('presupuestoInicial').parentNode.innerHTML =
        `<p style="font-size: 1.3rem; color: #636363;">Presupuesto inicial de ${nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1).toLowerCase()}: <span id="presupuestoInicial">$0.00</span></p>`;
    guardarEnLocalStorage();
});

// Establecer el presupuesto inicial y actualizar la visualización
formularioPresupuesto.addEventListener('submit', function (e) {
    e.preventDefault();
    presupuestoMensual = parseFloat(inputPresupuesto.value);

    if (isNaN(presupuestoMensual) || presupuestoMensual <= 0) {
        alerta.textContent = `${nombreUsuario}, por favor, ingresa un presupuesto válido.`;
        alerta.style.display = "block";
        return;
    }

    // Actualizar el texto con el nombre del usuario
    document.getElementById('presupuestoInicial').parentNode.innerHTML =
        `<p style="font-size: 1.3rem; color: #636363;">Presupuesto inicial de ${nombreUsuario}: <span id="presupuestoInicial">$${presupuestoMensual.toFixed(2)}</span></p>`;

    presupuestoRestante = presupuestoMensual;
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;

    alerta.style.display = "none";
    formularioPresupuesto.style.display = "none";
    formularioGasto.style.display = "block";
    infoPresupuesto.style.display = "block";

    guardarEnLocalStorage();
});

// Establecer el presupuesto inicial
formularioPresupuesto.addEventListener('submit', function (e) {
    e.preventDefault();
    presupuestoMensual = parseFloat(inputPresupuesto.value);
    if (isNaN(presupuestoMensual) || presupuestoMensual <= 0) {
        alerta.textContent = `${nombreUsuario}, por favor, ingresa un presupuesto válido.`;
        alerta.style.display = "block";
        return;
    }
    presupuestoInicialEl.textContent = `Presupuesto inicial de ${nombreUsuario}: $${presupuestoMensual.toFixed(2)}`;
    presupuestoRestante = presupuestoMensual;
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
    alerta.style.display = "none";
    formularioPresupuesto.style.display = "none";
    formularioGasto.style.display = "block";
    infoPresupuesto.style.display = "block";

    // Mostrar el botón para cargar gastos desde JSON
    document.getElementById('botonCargarGastos').style.display = "block";

    verificarEstadoBotonFinalizar();
    guardarEnLocalStorage();
});

// Obtener referencia al botón de cargar gastos desde JSON
const botonCargarGastos = document.getElementById('botonCargarGastos');

// Agregar un nuevo gasto manualmente
formularioGasto.addEventListener('submit', function (e) {
    e.preventDefault();

    const descripcion = document.getElementById('descripcionGasto').value.trim();
    const gasto = parseFloat(document.getElementById('gasto').value);
    const fecha = dayjs().format('DD/MM/YYYY HH:mm'); // Fecha con formato dd/mm/yyyy hh:mm

    if (!descripcion || isNaN(gasto) || gasto <= 0) {
        alerta.textContent = `${nombreUsuario}, por favor, ingresa una descripción y un gasto válido.`;
        alerta.style.display = "block";
        return;
    }

    presupuestoRestante -= gasto;
    gastosTotales += gasto;
    listaGastos.push({ descripcion, monto: gasto, fecha });

    if (presupuestoRestante < 0) {
        alerta.textContent = `¡${nombreUsuario}, te has excedido por $${Math.abs(presupuestoRestante).toFixed(2)}!`;
        alerta.style.display = "block";
    } else {
        alerta.style.display = "none";
    }

    mostrarMensajeEnTabla(descripcion, gasto, fecha);
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;

    // Desactivar el botón de cargar gastos desde JSON
    botonCargarGastos.style.display = "none";

    document.getElementById('descripcionGasto').value = '';
    document.getElementById('gasto').value = '';

    verificarEstadoBotonFinalizar();
    guardarEnLocalStorage();
});


// Limpiar la lista de gastos y reiniciar presupuesto
botonLimpiar.addEventListener('click', function () {
    listaGastos = [];
    gastosTotales = 0;
    presupuestoRestante = presupuestoMensual;
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
    tablaGastos.innerHTML = '';
    alerta.style.display = 'none';
    limpiarResultadosFiltrados();
    verificarEstadoBotonFinalizar();
    guardarEnLocalStorage();
});

// Mostrar el mensaje de confirmación al reiniciar presupuesto
botonReiniciar.addEventListener('click', function () {
    mensajeReiniciar.style.display = 'block';
});

// Confirmar la acción de reiniciar presupuesto
confirmarReiniciar.addEventListener('click', function () {
    localStorage.removeItem('gestionPresupuesto');
    location.reload();
});

// Cancelar la acción de reiniciar presupuesto
cancelarReiniciar.addEventListener('click', function () {
    mensajeReiniciar.style.display = 'none';
});

// Mostrar el mensaje de confirmación al finalizar ingreso de gastos
botonFinalizar.addEventListener('click', function () {
    mensajeFinalizar.style.display = 'block';
});

// Confirmar la finalización de los gastos
confirmarFinalizar.addEventListener('click', function () {
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');

    if (presupuestoRestante < 0) {
        alerta.textContent = `${nombreUsuario}, te has excedido del presupuesto por $${Math.abs(presupuestoRestante).toFixed(2)}. Considera reducir gastos para evitar deudas.`;
        contenedorPrincipal.classList.add('animate__animated', 'animate__shakeX'); // Animación de error
    } else if (presupuestoRestante === 0) {
        alerta.textContent = `${nombreUsuario}, has utilizado todo tu presupuesto. Considera reducir gastos para que puedas ahorrar tu dinero.`;
        contenedorPrincipal.classList.add('animate__animated', 'animate__flash'); // Animación neutral
    } else {
        alerta.textContent = `¡Felicidades, ${nombreUsuario}! Te quedó un saldo de $${presupuestoRestante.toFixed(2)} que puedes ahorrar e invertir. ¡Sigue así!`;
        contenedorPrincipal.classList.add('animate__animated', 'animate__bounce'); // Animación positiva
    }
    alerta.style.display = "block";
    formularioPresupuesto.style.display = "none";
    formularioGasto.querySelectorAll('input, button').forEach(el => el.disabled = true);
    botonFinalizar.disabled = true;
    guardarEnLocalStorage();
    mensajeFinalizar.style.display = 'none';

    // Remover la animación después de que termine
    setTimeout(() => {
        contenedorPrincipal.classList.remove('animate__animated', 'animate__bounce', 'animate__shakeX');
    }, 1500);
});

// Cancelar la acción de finalizar ingreso de gastos
cancelarFinalizar.addEventListener('click', function () {
    mensajeFinalizar.style.display = 'none';
});

function mostrarMensajeEnTabla(descripcion, monto, fecha) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${descripcion}</td>
        <td>$${monto.toFixed(2)}</td>
        <td>${fecha}</td>
        <td style="text-align: center; vertical-align: middle;">
            <button class="btn-eliminar">Eliminar</button>
        </td>
    `;

    fila.querySelector('.btn-eliminar').addEventListener('click', function () {
        const index = listaGastos.findIndex(gasto => gasto.descripcion === descripcion && gasto.monto === monto);
        if (index !== -1) {
            listaGastos.splice(index, 1);
            gastosTotales -= monto;
            presupuestoRestante += monto;
            presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
            verificarEstadoBotonFinalizar();
            guardarEnLocalStorage();
        }
        fila.remove();
    });

    tablaGastos.appendChild(fila);
}


// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function () {
    cargarDesdeLocalStorage();
    verificarEstadoBotonFinalizar();
});

async function cargarGastosDesdeJSON() {
    try {
        const respuesta = await fetch('data/gastos.json'); // Cargar JSON local
        if (!respuesta.ok) {
            throw new Error('Error al cargar el JSON');
        }
        const datos = await respuesta.json();

        datos.forEach(gasto => {
            listaGastos.push(gasto); // Agregar gastos al array global
            presupuestoRestante -= gasto.monto; // Restar del presupuesto
            mostrarMensajeEnTabla(gasto.descripcion, gasto.monto, gasto.fecha);
        });

        // Actualizar visualización
        presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
        verificarEstadoBotonFinalizar();
        guardarEnLocalStorage(); // Guardar los cambios en localStorage

        console.log("Gastos cargados correctamente desde JSON");
    } catch (error) {
        console.error('Error al cargar los gastos:', error);
    }
}

// Modificación del script para agregar confirmación antes de cargar los gastos desde JSON
document.getElementById('botonCargarGastos').addEventListener('click', function () {
    if (listaGastos.length === 0) {
        // Crear mensaje de confirmación
        const mensajeCargarJSON = document.createElement('div');
        mensajeCargarJSON.id = 'confirmacionCargarJSON';
        mensajeCargarJSON.style.display = 'block';
        mensajeCargarJSON.style.textAlign = 'center';
        mensajeCargarJSON.style.background = 'rgba(0,0,0,0.8)';
        mensajeCargarJSON.style.color = 'white';
        mensajeCargarJSON.style.padding = '20px';
        mensajeCargarJSON.style.position = 'fixed';
        mensajeCargarJSON.style.top = '50%';
        mensajeCargarJSON.style.left = '50%';
        mensajeCargarJSON.style.transform = 'translate(-50%, -50%)';
        mensajeCargarJSON.style.borderRadius = '10px';
        mensajeCargarJSON.style.zIndex = '1000';
        mensajeCargarJSON.style.fontSize = '1.3rem';
        mensajeCargarJSON.innerHTML = `
            <p>Solo puedes agregar los datos una sola vez. ¿Estás seguro de continuar?</p>
            <button id="confirmarCargarJSON" style="margin: 5px; padding: 10px; background: green; color: white; border: none; border-radius: 5px;">Confirmar</button>
            <button id="cancelarCargarJSON" style="margin: 5px; padding: 10px; background: red; color: white; border: none; border-radius: 5px;">Cancelar</button>
        `;
        document.body.appendChild(mensajeCargarJSON);
    }
});

// Evento para confirmar la carga de gastos desde JSON
document.body.addEventListener('click', function (event) {
    if (event.target.id === 'confirmarCargarJSON') {
        cargarGastosDesdeJSON();
        document.getElementById('botonCargarGastos').style.display = "none";
        document.getElementById('confirmacionCargarJSON').remove();
    }
    if (event.target.id === 'cancelarCargarJSON') {
        document.getElementById('confirmacionCargarJSON').remove();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleFiltro = document.getElementById("toggleFiltro");
    const seccionFiltro = document.getElementById("seccionFiltro");

    toggleFiltro.addEventListener("click", function () {
        const icono = toggleFiltro.querySelector("i");
        if (seccionFiltro.style.display === "none") {
            seccionFiltro.style.display = "block";
            icono.classList.replace("fa-chevron-down", "fa-chevron-up"); // Cambia la flecha
        } else {
            seccionFiltro.style.display = "none";
            icono.classList.replace("fa-chevron-up", "fa-chevron-down"); // Cambia la flecha
        }
    });
});

function filtrarGastosPorMonto(minimo, maximo) {
    if (isNaN(minimo) || isNaN(maximo)) {
        tablaResultadosFiltrados.innerHTML = "<tr><td colspan='3'>Por favor, ingresa valores válidos para el rango de monto.</td></tr>";
        alerta.style.display = 'block';
        return;
    }

    const resultados = listaGastos.filter(gasto => gasto.monto >= minimo && gasto.monto <= maximo);
    actualizarTablaResultados(resultados);

    // Limpiar los campos después de la búsqueda
    document.getElementById("montoMinimo").value = "";
    document.getElementById("montoMaximo").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    // Detectar Enter en el campo de búsqueda por descripción
    document.getElementById("buscarDescripcion").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita que el formulario se envíe por defecto
            filtrarGastosPorDescripcion(this.value);
            this.value = ""; // Limpiar el campo después de la búsqueda
        }
    });

    // Detectar Enter en los campos de filtrado por monto
    document.getElementById("montoMaximo").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let min = parseFloat(document.getElementById("montoMinimo").value);
            let max = parseFloat(document.getElementById("montoMaximo").value);
            filtrarGastosPorMonto(min, max);
        }
    });

    document.getElementById("montoMinimo").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let min = parseFloat(document.getElementById("montoMinimo").value);
            let max = parseFloat(document.getElementById("montoMaximo").value);
            filtrarGastosPorMonto(min, max);
        }
    });
});

// Permitir que el botón "Establecer Presupuesto" se active con Enter
nombreUsuarioInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita el envío del formulario predeterminado
        botonNombreUsuario.click(); // Simula el clic en el botón
    }
});

inputPresupuesto.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que el formulario se recargue
        formularioPresupuesto.dispatchEvent(new Event("submit")); // Dispara el evento de envío
    }
});
