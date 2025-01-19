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
            document.querySelector('h1').textContent = `Gestión de Presupuesto de ${nombreUsuario}`;
        }

        if (presupuestoMensual > 0) {
            presupuestoInicialEl.textContent = `Presupuesto inicial de ${nombreUsuario}: $${presupuestoMensual.toFixed(2)}`;
            presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
            infoPresupuesto.style.display = "block";
            formularioGasto.style.display = "block";
            listaGastos.forEach(gasto => mostrarMensajeEnTabla(gasto.descripcion, gasto.monto));
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
    if (listaGastos.length > 0) {
        botonFinalizar.disabled = false;
    } else {
        botonFinalizar.disabled = true;
    }
}

// Filtrar gastos por descripción
function filtrarGastosPorDescripcion(termino) {
    const resultados = listaGastos.filter(gasto => gasto.descripcion.toLowerCase().includes(termino.toLowerCase()));
    actualizarTablaResultados(resultados);
}

// Filtrar gastos por rango de monto
function filtrarGastosPorMonto(minimo, maximo) {
    if (isNaN(minimo) || isNaN(maximo)) {
        alerta.textContent = 'Por favor, ingresa valores válidos para el rango de monto.';
        alerta.style.display = 'block';
        return;
    }

    const resultados = listaGastos.filter(gasto => gasto.monto >= minimo && gasto.monto <= maximo);
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
        const filaVacia = document.createElement('tr');
        filaVacia.innerHTML = '<td colspan="2">No se encontraron resultados.</td>';
        tablaResultadosFiltrados.appendChild(filaVacia);
        return;
    }

    resultados.forEach(gasto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${gasto.descripcion}</td>
            <td>$${gasto.monto.toFixed(2)}</td>
        `;
        tablaResultadosFiltrados.appendChild(fila);
    });
}

// Eventos para la interacción con el usuario
// Guardar el nombre del usuario
botonNombreUsuario.addEventListener('click', function () {
    nombreUsuario = nombreUsuarioInput.value.trim();
    if (!nombreUsuario) nombreUsuario = "Usuario";
    document.title = `Gestión de Presupuesto de ${nombreUsuario}`;
    document.querySelector('h1').textContent = `Gestión de Presupuesto de ${nombreUsuario}`;
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
    verificarEstadoBotonFinalizar();
    guardarEnLocalStorage();
});

// Agregar un nuevo gasto
formularioGasto.addEventListener('submit', function (e) {
    e.preventDefault();
    const descripcion = document.getElementById('descripcionGasto').value.trim();
    const gasto = parseFloat(document.getElementById('gasto').value);
    if (!descripcion || isNaN(gasto) || gasto <= 0) {
        alerta.textContent = `${nombreUsuario}, por favor, ingresa una descripción y un gasto válido.`;
        alerta.style.display = "block";
        return;
    }
    presupuestoRestante -= gasto;
    gastosTotales += gasto;
    listaGastos.push({ descripcion, monto: gasto });
    if (presupuestoRestante < 0) {
        alerta.textContent = `¡${nombreUsuario}, te has excedido por $${Math.abs(presupuestoRestante).toFixed(2)}!`;
        alerta.style.display = "block";
    } else if (presupuestoRestante === 0) {
        alerta.textContent = `¡${nombreUsuario}, has utilizado todo tu presupuesto!`;
        alerta.style.display = "block";
    } else {
        alerta.style.display = "none";
    }
    mostrarMensajeEnTabla(descripcion, gasto);
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`;
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

// Reiniciar toda la aplicación
botonReiniciar.addEventListener('click', function () {
    localStorage.removeItem('gestionPresupuesto');
    location.reload();
});

// Finalizar la gestión del presupuesto
botonFinalizar.addEventListener('click', function () {
    if (presupuestoRestante === 0) {
        alerta.textContent = `${nombreUsuario}, has utilizado todo tu presupuesto. Considera reducir gastos para que puedas ahorrar tu dinero.`;
    } else if (gastosTotales <= presupuestoMensual) {
        alerta.textContent = `¡Felicidades, ${nombreUsuario}! Quedó un saldo a tu favor que puedes ahorrar e invertir. ¡Sigue así!`;
    } else {
        alerta.textContent = `${nombreUsuario}, no te financies con dinero prestado. Reduce tus gastos y aprende a ahorrar.`;
    }
    alerta.style.display = "block";
    formularioPresupuesto.style.display = "none";
    formularioGasto.querySelectorAll('input, button').forEach(el => el.disabled = true);
    botonFinalizar.disabled = true;
    guardarEnLocalStorage();
});

// Mostrar un gasto en la tabla de gastos
function mostrarMensajeEnTabla(descripcion, monto) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${descripcion}</td>
        <td>$${monto.toFixed(2)}</td>
        <td><button class="btn-eliminar">Eliminar</button></td>
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
