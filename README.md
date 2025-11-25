# pokedexAMP

# Pokédex Retro Interactiva
Este proyecto es una Pokédex interactiva que permite explorar la primera generación de Pokémon (los primeros 151) con un diseño inspirado en la estética retro de las consolas de videojuegos.

# 🎨 Diseño y Estilo
El diseño de la interfaz (UI) fue creado previamente en Figma, lo que permitió definir la distribución de la pantalla principal, las tarjetas de Pokémon (cuadrados blancos) y la ventana de detalles. El resultado simula la apariencia de una consola portátil clásica con un esquema de colores distintivo.

# 💻 Tecnologías Usadas
La Pokédex está construida utilizando las tecnologías fundamentales del desarrollo web, con planes para su distribución como aplicación de escritorio:

Estructura: HTML5 para la maqueta y la jerarquía de los elementos.

Estilo: CSS3 para el diseño retro, la cuadrícula de las tarjetas, los efectos de expansión de la ventana de detalle (modal) y el estilo de los botones.

Funcionalidad (Core): JavaScript (ES6+) para la lógica principal de la aplicación.

Datos: PokéApi (API pública gratuita) para obtener todos los datos, sprites y estadísticas de los Pokémon.

Empaquetado: Electron para convertir la aplicación web en un programa ejecutable de escritorio (.exe).

# ✨ Funcionalidades Clave
Índice Visual con Sprites: Muestra una cuadrícula de 12 tarjetas por página, cada una con el sprite oficial del Pokémon correspondiente, obtenida directamente de la PokéApi.

Paginación Funcional: Permite navegar a través de las diferentes páginas de la Pokédex usando los botones "Back" (Atrás) y "Next" (Siguiente).

Ventana de Detalle Interactiva: Al hacer clic en cualquier tarjeta, se activa una ventana modal (central y con efecto de expansión) que muestra la información detallada del Pokémon:

Nombre y número.

Sprite principal a gran escala.

Tipos (Fuego, Agua, etc.).

Estadísticas base (HP, Ataque, Defensa, Velocidad).
