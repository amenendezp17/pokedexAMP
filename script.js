// --- Constantes y Variables Globales ---

const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMONS_PER_PAGE = 12; // Cantidad de Pokémon por página
const TOTAL_POKEMONS = 151; // La primera generación

let currentPage = 0; // Índice de la página actual
let allPokemonData = []; // Almacena la lista completa de Pokémon (nombre y URL)

// Referencias a elementos del DOM
const pokemonGrid = document.getElementById('pokemon-list');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const modalOverlay = document.getElementById('modalOverlay');
const detailName = document.getElementById('detail-name');
const detailImage = document.getElementById('detail-image');
const detailStats = document.getElementById('detail-stats');

// --- Funciones de Utilidad ---

/**
 * Normaliza el nombre de Pokémon (capitaliza la primera letra).
 */
function capitalize(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// --- Funciones de Carga de Datos y Paginación ---

/**
 * Obtiene la lista inicial de todos los Pokémon y comienza la paginación.
 */
async function fetchAllPokemonInitialData() {
    try {
        const response = await fetch(`${POKEMON_API_BASE_URL}?limit=${TOTAL_POKEMONS}&offset=0`);
        const data = await response.json();
        
        allPokemonData = data.results; 
        
        displayPage(currentPage); 
        
    } catch (error) {
        console.error("Error al obtener la lista inicial de Pokémon:", error);
        pokemonGrid.innerHTML = '<h2>Error al cargar los Pokémon. Intenta recargar.</h2>';
    }
}

/**
 * Muestra los Pokémon correspondientes a la página actual, incluyendo solo el sprite.
 */
async function displayPage(pageNumber) {
    pokemonGrid.innerHTML = ''; // Limpiar la cuadrícula
    const startIndex = pageNumber * POKEMONS_PER_PAGE;
    const endIndex = Math.min(startIndex + POKEMONS_PER_PAGE, TOTAL_POKEMONS);

    const pokemonOnPage = allPokemonData.slice(startIndex, endIndex);

    // 1. Actualizar estado de los botones de paginación
    backButton.disabled = pageNumber === 0;
    nextButton.disabled = endIndex >= TOTAL_POKEMONS;

    if (pokemonOnPage.length === 0) {
        pokemonGrid.innerHTML = '<p>No hay Pokémon para mostrar en esta página.</p>';
        return;
    }

    // 2. Mapear y crear las tarjetas (cuadrados) con sprites
    const cardPromises = pokemonOnPage.map(async (pokemon) => {
        const urlParts = pokemon.url.split('/');
        const id = urlParts[urlParts.length - 2]; 

        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.dataset.id = id; 
        
        try {
            const detailResponse = await fetch(`${POKEMON_API_BASE_URL}${id}`);
            const detailData = await detailResponse.json();
            const imageUrl = detailData.sprites.front_default; // URL del sprite
            
            // Inyectamos SOLO la imagen. El número de ID no se muestra.
            card.innerHTML = `
                <img src="${imageUrl}" alt="${capitalize(detailData.name)}">
            `;
            
        } catch (error) {
            console.error(`Error al cargar sprite para #${id}:`, error);
            card.innerHTML = `<span>Error</span>`; // Opción de respaldo si falla
        }
        
        // 3. Añadir evento click para mostrar el detalle (modal)
        card.addEventListener('click', () => showPokemonDetail(id));
        
        return card;
    });

    // 4. Esperar a que se creen y se añadan todas las tarjetas a la cuadrícula
    const cards = await Promise.all(cardPromises);
    cards.forEach(card => pokemonGrid.appendChild(card));
}

// --- Funcionalidad de la Ventana Modal ---

/**
 * Obtiene los detalles de un Pokémon y muestra el modal.
 */
async function showPokemonDetail(id) {
    try {
        const response = await fetch(`${POKEMON_API_BASE_URL}${id}`);
        const pokemon = await response.json();

        // 1. Inyectar datos en el modal
        detailName.textContent = capitalize(pokemon.name);
        detailImage.src = pokemon.sprites.front_default || ''; 
        detailImage.alt = capitalize(pokemon.name);

        // Generar la lista de estadísticas
        detailStats.innerHTML = `
            <p><strong>Número:</strong> #${pokemon.id}</p>
            <p><strong>Tipo(s):</strong> ${pokemon.types.map(t => capitalize(t.type.name)).join(' / ')}</p>
            <hr>
            <h4>Estadísticas Base</h4>
            <p><strong>HP:</strong> ${pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 'N/A'}</p>
            <p><strong>Ataque:</strong> ${pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 'N/A'}</p>
            <p><strong>Defensa:</strong> ${pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 'N/A'}</p>
            <p><strong>Velocidad:</strong> ${pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 'N/A'}</p>
        `;

        // 2. Mostrar el modal (con efecto de expansión)
        modalOverlay.classList.add('active'); 
        
    } catch (error) {
        console.error(`Error al obtener detalles del Pokémon ${id}:`, error);
        alert('No se pudieron cargar los detalles de este Pokémon.');
    }
}

/**
 * Oculta el modal de detalles.
 */
function hidePokemonDetail() {
    modalOverlay.classList.remove('active'); 
}

// --- Event Listeners ---

// Paginación: Botón Anterior
backButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displayPage(currentPage);
    }
});

// Paginación: Botón Siguiente
nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE);
    if (currentPage < totalPages - 1) {
        currentPage++;
        displayPage(currentPage);
    }
});

// Cierre de Modal: Al hacer clic fuera del área del modal
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        hidePokemonDetail();
    }
});

// --- Inicialización ---

// Iniciar la aplicación al cargar el script
fetchAllPokemonInitialData();