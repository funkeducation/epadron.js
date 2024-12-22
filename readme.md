# Proyecto JavaScript Coderhouse 63335

_Éste repositorio se ha creado para cargar el proyecto de JavaScript para la comisión #63335 de Coderhouse._

## Contenido

_Este código en JavaScript permite gestionar un presupuesto personal, realizando un seguimiento de los gastos y mostrando la información actualizada en la interfaz. Aquí tienes un resumen de su funcionamiento:_

* Variables Iniciales: Se definen varias variables para almacenar el presupuesto inicial, el presupuesto restante, los gastos totales, y una lista de los gastos registrados.

* Elementos del DOM: Se obtiene la referencia de los elementos HTML (formularios, tabla de gastos, alertas, etc.) para interactuar con ellos en el código.

* Interacción con el Usuario: Al cargar la página, se solicita el nombre del usuario. El nombre se usa para personalizar la interfaz, incluyendo el título de la página.

* Manejo del Presupuesto Inicial:
    * El usuario ingresa un presupuesto a través de un formulario.
    * Si el presupuesto es válido, se actualiza la interfaz con el presupuesto inicial y el presupuesto restante, y se muestra el formulario para ingresar gastos.

* Manejo de los Gastos:
    * El usuario ingresa los gastos mediante un formulario, con una descripción y un monto.
    * Si los valores son válidos, el gasto se resta del presupuesto restante y se agrega a la lista de gastos.
    * Si el presupuesto restante es negativo o se ha agotado, se muestra una alerta informando al usuario.
    * Los gastos se muestran en una tabla.

* Finalización del Proceso:
    * Un botón permite finalizar la entrada de gastos. Dependiendo de si el usuario se ha excedido o no del presupuesto, se muestra un mensaje de alerta.
    * Después de finalizar, se deshabilitan los formularios y botones para evitar que el usuario continúe ingresando gastos, o borrar gastos ya ingresados.

* Reinicio del Proceso: Un botón permite recargar la página y reiniciar el proceso desde el principio.

* Filtrar Gastos:
    * Se incluyen funciones para filtrar los gastos por descripción o por monto, y se muestran los resultados filtrados en una nueva tabla.

Este sistema permite que el usuario gestione su presupuesto, registre sus gastos y reciba alertas cuando se acerque o se exceda del límite presupuestario.

## Autor

* **Edgar Alfonso Padrón Centeno** - *Desarrollador* - [funkeducation](https://github.com/funkeducation)

## Requerimientos 2da Pre-Entrega

* **Variables necesarias:** Las variables cubren lo necesario para manejar el presupuesto y los gastos.
* **Funciones esenciales:** Las funciones cubren adecuadamente los requerimientos para la interacción con el usuario (presupuesto y gastos).
* **Objetos JS:** Están presentes en forma de objetos simples dentro de listaGastos.
* **Arrays:** El uso del array listaGastos es adecuado, y se aprovecha para almacenar y filtrar los gastos.
* **Métodos de búsqueda y filtrado:** El filtrado de gastos está bien implementado utilizando los métodos adecuados (filter()), y muestra los resultados correctamente.

## Dirección del Sitio Web

* [https://funkeducation.github.io/epadron.js/](https://funkeducation.github.io/epadron.js/)