// El script primero solicita el nombre del usuario y luego lo saluda
const nombreUsuario = prompt("Hola amigo/a, ¿cómo te llamas?");  // Se pide el nombre del usuario
if (nombreUsuario) {  // Si el usuario proporciona un nombre, se muestra un saludo
    alert(`${nombreUsuario}, te damos la bienvenida a la gestión de tu presupuesto.`);  // Saludo con el nombre del usuario
}

// Pedimos al usuario el monto de presupuesto
const presupuestoMensual = parseFloat(prompt("¿Cuánto dinero tienes disponible para tu presupuesto mensual?"));  // Se solicita el presupuesto mensual como número
if (isNaN(presupuestoMensual) || presupuestoMensual <= 0) {  // Verificación de que el presupuesto es válido (número positivo)
    alert("Ése presupuesto no parece correcto, intenta nuevamente.");  // Mensaje si el presupuesto es inválido
    throw new Error("Presupuesto no válido.");  // Lanza un error y detiene la ejecución si el presupuesto no es válido
}

let presupuestoRestante = presupuestoMensual;  // Inicializa el saldo restante con el presupuesto mensual proporcionado

// Obtiene el elemento 'mensajes' donde se mostrarán los mensajes en el DOM
const cajaMensajes = document.getElementById('mensajes');

// Función para mostrar un mensaje en el DOM
function mostrarMensaje(message) {
    const elementoMensaje = document.createElement('p');  // Crea un nuevo párrafo
    elementoMensaje.textContent = message;  // Asigna el mensaje al contenido del párrafo
    cajaMensajes.appendChild(elementoMensaje);  // Añade el párrafo al contenedor de mensajes
}

while (true) {  // Bucle infinito para seguir solicitando gastos
    let gasto = parseFloat(prompt(`Tu saldo restante es $${presupuestoRestante}. Ingresa el monto de un gasto:`));  // Se solicita un gasto del usuario

    if (isNaN(gasto) || gasto <= 0) {  // Verifica si el gasto es válido (número positivo)
        alert("Ése monto no es válido. Ingresa nuevamente.");  // Mensaje si el monto ingresado no es válido
        continue;  // Continúa al siguiente ciclo del bucle sin restar el gasto
    }

    presupuestoRestante -= gasto;  // Resta el gasto al saldo restante

    if (presupuestoRestante < 0) {  // Si el saldo restante es negativo (exceso de gasto)
        alert(`¡${nombreUsuario}, has gastado más dinero del que tienes! Te has excedido por $${Math.abs(presupuestoRestante).toFixed(2)}.`);  // Alerta de exceso de gasto
        mostrarMensaje(`${nombreUsuario}, estás gastando más dinero del que tienes presupuestado. Evita apoyarte en dinero prestado.`);  // Mensaje en el DOM
    } else if (presupuestoRestante === 0) {  // Si el saldo restante es exactamente cero
        alert("¡Te gastaste todo el presupuesto!");  // Mensaje de que se ha agotado el presupuesto
        mostrarMensaje(`¡${nombreUsuario}, has gastado todo tu presupuesto mensual! El próximo mes adminístralo mejor.`);  // Mensaje en el DOM
    } else {  // Si queda presupuesto disponible
        alert(`${nombreUsuario}, te quedan $${presupuestoRestante.toFixed(2)} para este mes.`);  // Muestra el saldo restante
        mostrarMensaje(`¡Felicidades ${nombreUsuario}!, te quedaron $${presupuestoRestante.toFixed(2)}. Te recomiendo ahorrar este dinero.`);  // Mensaje en el DOM
    }

    // Pregunta si el usuario desea seguir registrando más gastos
    const seguirCalculando = confirm("¿Quieres registrar otro gasto?");
    if (!seguirCalculando) {  // Si el usuario elige no seguir calculando
        mostrarMensaje(`Gestión de presupuesto terminada. Tu saldo final es de $${presupuestoRestante.toFixed(2)}.`);  // Muestra el saldo final
        break;  // Sale del bucle
    }
}