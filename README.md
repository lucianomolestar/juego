# ENTRE TODOS — juego de mesa digital 2D

Un videojuego educativo para estudiantes de 10 años en adelante. Representa de manera indirecta conceptos como igualdad de oportunidades, acceso, participación, reglas y cooperación.

## Jugar

1. Abre `index.html` en Chrome, Firefox, Edge o Safari. No requiere Node, Python ni servidores.
2. Selecciona de 1 a 4 jugadores y pulsa «Comenzar partida».
3. Lanza el dado, elige opciones en las cartas y ve cómo cambia la ciudad.
4. También puedes usar las secciones «Descubrir», «Cómo se juega» y «Para docentes».

## Publicar gratuitamente

Sube `index.html`, `style.css` y `app.js` a la raíz de un repositorio público de GitHub. En **Settings > Pages**, selecciona **Deploy from a branch**, rama `main`, carpeta `/ (root)`. Tras la publicación, comparte la dirección mostrada por GitHub Pages. No se necesitan bases de datos ni cuentas para jugar.

## Privacidad y funcionamiento

* Las partidas se guardan en `localStorage` del navegador; no se envía información a ningún servidor.
* El modo individual incluye un jugador automático sencillo. El multijugador es local, por turnos en un mismo dispositivo, no multijugador en tiempo real.
* Los íconos son emojis del sistema, por lo que la apariencia puede variar según dispositivo.
* El juego funciona sin conexión, salvo la descarga opcional de fuentes de Google Fonts; si fallan, utiliza fuentes alternativas.
* Los indicadores del juego son ficticios y no representan estadísticas reales sobre derechos en Perú.

## Personalizar

En `app.js` puedes editar `EVENTS` para añadir dilemas, preguntas, misiones y sorpresas, y `TOPICS` para modificar los recursos educativos. En `style.css` están los colores y estilos.

## Investigación escolar

Para demostrar impacto educativo, aplica preguntas breves antes y después de jugar y compara respuestas. No presentes mejoras hipotéticas como resultados reales. La Revolución francesa y los movimientos andinos del siglo XVIII deben explicarse explícitamente en la memoria académica, no necesariamente dentro del videojuego.
