// Index page renderer module

/**
 * Main function to render the index page
 * @returns {Promise<void>}
 */
async function renderIndex() {
    try {
        // Load all people and tiles
        const people = await loadAllPeople();
        const tiles = await loadAllTiles();

        if ((!people || people.length === 0) && (!tiles || tiles.length === 0)) {
            showIndexError('Keine Inhalte gefunden');
            return;
        }

        // Render all cards
        const container = document.getElementById('family-members');
        if (!container) {
            console.error('Family members container not found');
            return;
        }

        // Clear loading message
        container.innerHTML = '';

        // Combine people and tiles, then sort by displayOrder
        const allItems = [
            ...people.map(p => ({ type: 'person', data: p, displayOrder: p.displayOrder })),
            ...tiles.map(t => ({ type: 'tile', data: t, displayOrder: t.displayOrder }))
        ].sort((a, b) => a.displayOrder - b.displayOrder);

        // Create and append cards
        allItems.forEach(item => {
            let cardHTML;
            if (item.type === 'person') {
                cardHTML = createPersonCard(item.data);
            } else {
                cardHTML = createTileCard(item.data);
            }
            container.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (error) {
        console.error('Error rendering index:', error);
        showIndexError('Fehler beim Laden der Inhalte');
    }
}

/**
 * Creates HTML for a person card
 * @param {Object} person - Person object
 * @returns {string} HTML string for person card
 */
function createPersonCard(person) {
    return `
        <a href="profile.html?person=${person.id}" class="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 group">
            <div class="flex items-center space-x-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-${person.theme.gradientFrom} to-${person.theme.gradientTo} rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    ${person.initial}
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">${escapeHtml(person.fullName)}</h2>
                    <p class="text-gray-600" data-i18n="view_contact">Kontaktinformationen ansehen →</p>
                </div>
            </div>
        </a>
    `;
}

/**
 * Creates HTML for a tile card
 * @param {Object} tile - Tile object
 * @returns {string} HTML string for tile card
 */
function createTileCard(tile) {
    const lang = getCurrentLanguage ? getCurrentLanguage() : 'de';
    const title = typeof tile.title === 'object' ? (tile.title[lang] || tile.title.de) : tile.title;
    const description = typeof tile.description === 'object' ? (tile.description[lang] || tile.description.de) : tile.description;

    // Determine target attribute for external links
    const target = tile.type === 'external' ? ' target="_blank" rel="noopener noreferrer"' : '';

    return `
        <a href="${escapeHtml(tile.url)}"${target} class="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 group">
            <div class="flex items-center space-x-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-${tile.theme.gradientFrom} to-${tile.theme.gradientTo} rounded-full flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform duration-300">
                    ${tile.icon}
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">${escapeHtml(title)}</h2>
                    <p class="text-gray-600">${escapeHtml(description)} ${tile.type === 'external' ? '↗' : '→'}</p>
                </div>
            </div>
        </a>
    `;
}

/**
 * Shows an error message on index page
 * @param {string} message - Error message
 */
function showIndexError(message) {
    const container = document.getElementById('family-members');
    if (container) {
        container.innerHTML = `
            <div class="col-span-full">
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Fehler!</strong>
                    <span class="block sm:inline">${escapeHtml(message)}</span>
                </div>
            </div>
        `;
    }
}
