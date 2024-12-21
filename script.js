// Variables de presupuesto
let presupuestoMensual = 0; // Almacena el presupuesto inicial ingresado por el usuario
let presupuestoRestante = 0; // Almacena el presupuesto que queda después de registrar gastos
let nombreUsuario = ''; // Almacena el nombre del usuario
let gastosTotales = 0; // Suma total de los gastos registrados
let listaGastos = []; // Array para almacenar los detalles de los gastos

// Elementos del DOM
const formularioPresupuesto = document.getElementById('formularioPresupuesto'); // Formulario para ingresar el presupuesto inicial
const formularioGasto = document.getElementById('formularioGasto'); // Formulario para registrar nuevos gastos
const alerta = document.getElementById('alerta'); // Elemento para mostrar mensajes al usuario
const tablaGastos = document.getElementById('tablaGastos'); // Tabla donde se muestran los gastos registrados
const presupuestoInicialEl = document.getElementById('presupuestoInicial'); // Elemento para mostrar el presupuesto inicial en la interfaz
const presupuestoRestanteEl = document.getElementById('presupuestoRestante'); // Elemento para mostrar el presupuesto restante en la interfaz
const infoPresupuesto = document.getElementById('infoPresupuesto'); // Contenedor con la información del presupuesto
const botonReiniciar = document.getElementById('botonReiniciar'); // Botón para reiniciar el proceso
const botonFinalizar = document.getElementById('botonFinalizar'); // Botón para finalizar la entrada de gastos

// Solicitar el nombre del usuario al cargar la página
window.onload = function () {
    nombreUsuario = prompt("¡Hola! ¿Cómo te llamas?"); // Solicita el nombre del usuario
    if (!nombreUsuario) {
        nombreUsuario = "Usuario"; // Valor predeterminado si el usuario no ingresa un nombre
    }
    // Actualiza el título de la página con el nombre del usuario
    document.title = `Gestión de Presupuesto - ${nombreUsuario}`;
};

// Mostrar mensajes en la tabla de gastos
function mostrarMensajeEnTabla(descripcion, monto) {
    const fila = document.createElement('tr'); // Crea una fila de tabla
    fila.innerHTML = `<td>${descripcion}</td><td>$${monto.toFixed(2)}</td>`; // Agrega una descripción y el monto
    tablaGastos.appendChild(fila); // Añade la fila a la tabla de gastos
}

// Manejar el presupuesto inicial
formularioPresupuesto.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const inputPresupuesto = document.getElementById('presupuesto'); // Campo de texto para el presupuesto
    presupuestoMensual = parseFloat(inputPresupuesto.value); // Convierte el valor ingresado a un número

    if (isNaN(presupuestoMensual) || presupuestoMensual <= 0) { // Verifica si el valor es válido
        alerta.textContent = `${nombreUsuario}, por favor, ingresa un presupuesto válido.`; // Mensaje de error
        alerta.style.display = "block";
        return;
    }

    // Actualiza la interfaz con el presupuesto inicial
    presupuestoInicialEl.textContent = `Presupuesto inicial de ${nombreUsuario}: $${presupuestoMensual.toFixed(2)}`;
    presupuestoRestante = presupuestoMensual; // Inicializa el presupuesto restante
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`; // Muestra el presupuesto restante
    alerta.style.display = "none"; // Oculta cualquier alerta previa
    formularioPresupuesto.style.display = "none"; // Oculta el formulario de presupuesto
    formularioGasto.style.display = "block"; // Muestra el formulario de gastos
    infoPresupuesto.style.display = "block"; // Muestra la sección de información de presupuesto
});

// Manejar los gastos
formularioGasto.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const inputDescripcion = document.getElementById('descripcionGasto'); // Campo de texto para la descripción del gasto
    const inputGasto = document.getElementById('gasto'); // Campo de texto para el gasto
    const descripcion = inputDescripcion.value.trim(); // Obtiene la descripción del gasto
    const gasto = parseFloat(inputGasto.value); // Convierte el valor ingresado a un número

    if (!descripcion || isNaN(gasto) || gasto <= 0) { // Verifica si los valores son válidos
        alerta.textContent = `${nombreUsuario}, por favor, ingresa una descripción y un gasto válido.`; // Mensaje de error
        alerta.style.display = "block";
        return;
    }

    presupuestoRestante -= gasto; // Resta el gasto al presupuesto restante
    gastosTotales += gasto; // Suma el gasto al total de gastos
    listaGastos.push({ descripcion, monto: gasto }); // Agrega el gasto al array

    if (presupuestoRestante < 0) { // Si el presupuesto restante es negativo
        alerta.textContent = `¡${nombreUsuario}, te has excedido por $${Math.abs(presupuestoRestante).toFixed(2)}!`; // Mensaje de alerta
        alerta.style.display = "block";
    } else if (presupuestoRestante === 0) { // Si el presupuesto se agota exactamente
        alerta.textContent = `¡${nombreUsuario}, has utilizado todo tu presupuesto!`; // Mensaje de advertencia
        alerta.style.display = "block";
    } else { // Si aún queda presupuesto
        alerta.style.display = "none"; // Oculta la alerta
    }

    mostrarMensajeEnTabla(descripcion, gasto); // Muestra el gasto en la tabla
    presupuestoRestanteEl.textContent = `$${presupuestoRestante.toFixed(2)}`; // Actualiza el presupuesto restante en la interfaz
    inputDescripcion.value = ''; // Limpia el campo de texto de la descripción
    inputGasto.value = ''; // Limpia el campo de texto del gasto
});

// Finalizar el proceso de ingresos de gastos
botonFinalizar.addEventListener('click', function () {
    // Verificar el estado del presupuesto restante
    if (presupuestoRestante === 0) { // Si el presupuesto restante es exactamente cero
        alerta.textContent = `${nombreUsuario}, has utilizado todo tu presupuesto. Considera reducir gastos para que puedas ahorrar más dinero.`; // Mensaje informativo
        alerta.style.display = "block";
    } else if (gastosTotales <= presupuestoMensual) { // Si el usuario no excedió su presupuesto
        alerta.textContent = `¡Felicidades, ${nombreUsuario}! Has gastado menos de tu presupuesto. ¡Sigue haciéndolo así!`; // Mensaje de felicitación
        alerta.style.display = "block";
    } else { // Si el usuario excedió su presupuesto
        alerta.textContent = `${nombreUsuario}, ¡Deja de gastar dinero que no tienes! Te has excedido del presupuesto.`; // Mensaje de advertencia
        alerta.style.display = "block";
    }

    // Deshabilitar el formulario de gastos y el botón de "Agregar Gasto"
    formularioGasto.querySelector('input').disabled = true; // Deshabilita el campo de ingreso de gasto (Descripción)
    formularioGasto.querySelector('button').disabled = true; // Deshabilita el botón para agregar el gasto
    botonFinalizar.disabled = true; // Deshabilita el botón "Finalizar" para evitar clics repetidos

    // Deshabilitar el campo "Monto del gasto"
    const inputMontoGasto = document.getElementById('gasto'); // Obtener el campo de monto del gasto
    inputMontoGasto.disabled = true; // Desactivar el campo de monto del gasto
});


// Reiniciar todo el proceso
botonReiniciar.addEventListener('click', function () {
    location.reload(); // Recarga la página para reiniciar el estado
});