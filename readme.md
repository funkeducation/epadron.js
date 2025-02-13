# Proyecto JavaScript Coderhouse 63335

_Este repositorio contiene el proyecto **Gestión de Presupuesto Personal**, desarrollado como parte de la comisión #63335 del curso de JavaScript en Coderhouse. El objetivo principal es proporcionar una herramienta interactiva para gestionar presupuestos personales y realizar un seguimiento de los gastos, utilizando JavaScript para manipular el DOM, manejar eventos y consumir datos dinámicamente._

## Características

### Funcionalidades principales:
1. **Ingreso de presupuesto inicial**:
   - Permite al usuario definir un presupuesto inicial.
   - Personaliza la experiencia con el nombre ingresado.

2. **Registro de gastos**:
   - Los usuarios pueden registrar gastos con una descripción, monto y fecha automática.
   - Calcula automáticamente el presupuesto restante y notifica si se excede.

3. **Filtrado y búsqueda avanzada**:
   - Filtra gastos por descripción utilizando _Fuse.js_ para búsqueda inteligente.
   - Filtra por rango de montos con validaciones.
   - Muestra los resultados filtrados en una tabla adicional.

4. **Interacción con el usuario**:
   - Captura eventos del usuario para procesar datos ingresados.
   - Incluye animaciones con _animate.css_ para mejorar la experiencia.
   - Botón de "Finalizar Ingreso de Gastos" con confirmación antes de desactivar la edición.

5. **Persistencia de datos**:
   - Los datos se guardan en _Local Storage_ para mantener el estado entre sesiones.
   - Restaura automáticamente el presupuesto y los gastos al recargar la página.

6. **Carga de datos desde JSON**:
   - Se pueden cargar datos desde un archivo JSON local.
   - Confirmación antes de importar datos desde JSON para evitar duplicados.

7. **Gráficos dinámicos**:
   - Integración con _Chart.js_ para visualizar un resumen de gastos en un gráfico de pastel.
   - Actualización dinámica del gráfico conforme se agregan o eliminan gastos.

8. **Confirmaciones y validaciones interactivas**:
   - Confirmación antes de reiniciar el presupuesto.
   - Confirmación antes de finalizar el ingreso de gastos.
   - Confirmación antes de cargar datos desde JSON.

### Tecnologías y Conceptos Utilizados:
_El proyecto implementa varios aspectos clave de JavaScript:_

1. **Manipulación avanzada del DOM y eventos.**
   - Uso de _document.createElement_, _innerHTML_ y _addEventListener_.
   - Generación dinámica de tablas, botones y gráficos.

2. **Uso de librerías.**
   - _dayjs_: Para formateo de fechas.
   - _Fuse.js_: Para búsqueda inteligente.
   - _Chart.js_: Para gráficos dinámicos.
   - _Animate.css_: Para animaciones en la UI.

3. **Manejo de almacenamiento local.**
   - Uso de _localStorage_ para guardar y restaurar datos de la sesión.

4. **Diseño responsivo y accesibilidad.**
   - Adaptaciones en _CSS_ para diferentes tamaños de pantalla.
   - Ajuste dinámico de interfaz para una mejor experiencia de usuario.

## Estructura del Proyecto

### Archivos principales:
- **index.html**: Estructura HTML de la interfaz del usuario.
- **style.css**: Hoja de estilos para el diseño visual.
- **script.js**: Lógica principal del proyecto en JavaScript.
- **data/gastos.json**: Archivo JSON para almacenar y cargar datos de prueba.

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
4. Registra tus gastos y utiliza las herramientas de filtrado y búsqueda.
5. Visualiza el resumen de gastos en el gráfico dinámico.
6. Usa las opciones para reiniciar presupuesto, limpiar gastos o finalizar el proceso.

## Autor

* **Edgar Alfonso Padrón Centeno** - *Desarrollador* - [funkeducation](https://github.com/funkeducation)

## Dirección del Sitio Web

* [https://funkeducation.github.io/epadron.js/](https://funkeducation.github.io/epadron.js/)