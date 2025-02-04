# Proyecto JavaScript Coderhouse 63335

_Este repositorio contiene el proyecto **Gestión de Presupuesto Personal**, desarrollado como parte de la comisión #63335 del curso de JavaScript en Coderhouse. El objetivo principal es proporcionar una herramienta interactiva para gestionar presupuestos personales y realizar un seguimiento de los gastos, utilizando JavaScript para manipular el DOM, manejar eventos y consumir datos dinámicamente._

## Características

### Funcionalidades principales:
1. **Ingreso de presupuesto inicial**:
   - Permite al usuario definir un presupuesto inicial.
   - Personaliza la experiencia con el nombre ingresado.

2. **Registro de gastos**:
   - Los usuarios pueden registrar gastos con una descripción y un monto.
   - Calcula automáticamente el presupuesto restante.

3. **Filtrado y búsqueda**:
   - Filtra gastos por descripción o rango de monto.
   - Muestra los resultados filtrados en una tabla adicional.

4. **Interacción con el usuario**:
   - Captura eventos del usuario para procesar datos ingresados.
   - Notifica al usuario si excede su presupuesto.
   - Permite finalizar la gestión o reiniciar el proceso en cualquier momento.

5. **Persistencia de datos**:
   - Los datos se guardan en el Local Storage para mantener el estado entre sesiones.

6. **Carga de datos desde JSON o API externa**:
   - Se pueden cargar datos desde un archivo JSON local o desde una API externa.
   - Uso de fetch y manejo de promesas para consumir y procesar datos dinámicamente.

7. **Botones dinámicos**:
   - El botón "Finalizar Ingreso de Gastos" permanecerá desactivado hasta que se registren gastos, garantizando una experiencia de usuario más clara y acorde al estado actual de los gastos.

   ### Tecnologías y Conceptos Utilizados:
   _El proyecto implementa varios aspectos clave de JavaScript:_

1. **Objetos y Arrays. Métodos de Arrays.**
   - Uso de objetos para estructurar los datos de los gastos.
   - Manipulación de arrays con métodos como map, filter, find, y forEach para gestionar la lista de gastos.

2. **Funciones y condicionales.**
   - Uso de funciones para modularizar la lógica de la aplicación.
   - Aplicación de condicionales (if-else) para validar entradas y manejar la interacción del usuario.

3. **Generación del DOM de forma dinámica. Eventos.**
   - Creación y modificación de elementos en el DOM mediante _document.createElement_ y _innerHTML_.
   - Uso de _addEventListener_ para capturar eventos como click, submit y input.

4. **Sintaxis avanzada.**
   - Uso de destructuring, spread/rest operators, arrow functions, y template literals para mejorar la legibilidad y eficiencia del código.

5. **Uso de librerías.**
   - Implementación de _dayjs_ para formateo de fechas.
   - Uso de _Fuse.js_ para mejorar la búsqueda y filtrado de gastos.
   - Inclusión de _animate.css_ para animaciones en la interfaz.

6. **Manejo de promesas con fetch.**
   - Uso de _fetch_ y _async/await_ para obtener datos de un JSON local.
   - Manejo de errores con _try/catch_ al consumir datos de la red.

### Interacción con la interfaz:
- Formulario para establecer el presupuesto inicial.
- Formulario dinámico para ingresar gastos.
- Tabla para visualizar los gastos registrados y las búsquedas realizadas.
- Botones para reiniciar presupuesto, limpiar gastos, o finalizar la gestión.

## Estructura del Proyecto

### Archivos principales:
- **index.html**: Estructura HTML de la interfaz del usuario.
- **style.css**: Hoja de estilos para el diseño visual.
- **script.js**: Lógica principal del proyecto en JavaScript.
- **data/gastos.json**: Archivo JSON para almacenar y cargar datos de prueba.

### Estructuras de Datos:
- Uso de objetos para representar los gastos.
- Manejo de arrays para almacenar la lista de gastos.
- Validaciones para prevenir errores en la entrada de datos.

## Uso del Proyecto

### Requisitos
- Navegador web moderno.

### Pasos:
1. Clona el repositorio:
   ```bash
   git clone https://github.com/funkeducation/epadron.js.git
   ```
2. Abre el archivo `index.html` en el navegador.
3. Ingresa tu nombre y el presupuesto inicial.
4. Registra tus gastos y utiliza las herramientas de filtrado según sea necesario.

## Autor

* **Edgar Alfonso Padrón Centeno** - *Desarrollador* - [funkeducation](https://github.com/funkeducation)

## Dirección del Sitio Web

* [https://funkeducation.github.io/epadron.js/](https://funkeducation.github.io/epadron.js/)
