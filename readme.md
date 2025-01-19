# Proyecto JavaScript Coderhouse 63335

_Este repositorio contiene el proyecto **Gestión de Presupuesto Personal**, desarrollado como parte de la comisión #63335 del curso de JavaScript en Coderhouse. El objetivo del proyecto es proporcionar una herramienta interactiva para gestionar presupuestos personales y realizar un seguimiento de los gastos._

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

4. **Control y alertas**:
   - Notifica al usuario si excede su presupuesto.
   - Permite finalizar la gestión o reiniciar el proceso en cualquier momento.

5. **Persistencia de datos**:
   - Los datos se guardan en el Local Storage para mantener el estado entre sesiones.

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

### Detalles del código:
1. **Variables Globales**: Manejan el estado de la aplicación, incluyendo el presupuesto inicial, restante, y la lista de gastos.
2. **Funciones Esenciales**:
   - Manejo de eventos para capturar datos del usuario.
   - Cálculo del presupuesto restante.
   - Filtrado de datos basado en descripción y rango de monto.
   - Guardado y recuperación de datos usando Local Storage.
3. **Estructuras de Datos**:
   - Uso de objetos para registrar gastos.
   - Arrays para almacenar y procesar listas de gastos.
4. **Validación y Alertas**:
   - Verifica entradas válidas para presupuesto y gastos.
   - Muestra mensajes personalizados en función del estado del presupuesto.

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

## Requerimientos 3era Pre-Entrega

* El proyecto incluye formularios interactivos que permiten al usuario ingresar datos como presupuesto inicial, descripción de gastos y montos.
* Los resultados, como el presupuesto restante y la lista de gastos, se notifican dinámicamente mediante elementos HTML actualizados (p.ej., "p", "table").
* Captura eventos como el envío de formularios (submit), clics en botones, y entradas en campos de texto.
* Procesa datos ingresados por el usuario para calcular el presupuesto restante y manejar la lista de gastos.
* Modifica el DOM para actualizar dinámicamente los valores de presupuesto y mostrar/ocultar formularios según el estado actual.

## Autor

* **Edgar Alfonso Padrón Centeno** - *Desarrollador* - [funkeducation](https://github.com/funkeducation)

## Dirección del Sitio Web

* [https://funkeducation.github.io/epadron.js/](https://funkeducation.github.io/epadron.js/)