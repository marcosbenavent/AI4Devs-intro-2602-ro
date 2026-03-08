# Prompt utilizado
**Chatbot utilizado:** Gemini [cite: 2026-03-05]

## El Prompt Maestro

"Actúa como un programador senior especialista en JavaScript y buenas prácticas. Crea una solución para una página web de inversión de texto siguiendo estos requisitos técnicos y visuales:

### 1. Estructura y Lógica:

- Crea un campo de entrada (input) donde el usuario escriba su cadena de texto.
- Implementa la lógica para que el texto se invierta automáticamente (ej: 'AI4Devs' -> 'sveD4AI') y se muestre en tiempo real en un elemento de resultado mientras el usuario escribe.
- Añade un botón llamado 'Invertir' que permanezca oculto y solo aparezca mediante una transición suave cuando el texto introducido supere los 3 caracteres.
- Incluye un botón de 'Copiar' junto al resultado para que el usuario pueda llevarse el texto invertido al portapapeles.
- Añade botones de 'Ejemplo rápido' (como 'AI4Devs' o 'Marcos Benavent') que al hacer clic rellenen el input automáticamente.

### 2. Diseño Visual (UI/UX):

- Aplica un estilo moderno y atractivo con Tema Oscuro (Dark Mode).
- Utiliza una tipografía expresiva de Google Fonts (evita fuentes genéricas como Arial o Roboto).
- Implementa animaciones suaves para la aparición del botón y los cambios de texto.
- El diseño debe ser centrado, limpio y responsivo.

### 3. Formato de entrega:

- Escribe todo el código (HTML, CSS y JavaScript) en un único bloque de código.
- Asegúrate de que el JavaScript esté bien comentado y use nombres de variables descriptivos.
- No utilices librerías externas ni dependencias, salvo la conexión a Google Fonts."

**Nota:** Los archivos se guardan en la carpeta `reversestring-MB`, y el `index.html` debe cargar el script con `<script src="script.js"></script>`.
