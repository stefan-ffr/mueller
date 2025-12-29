// Index page renderer module

/**
 * Main function to render the index page
 * @returns {Promise<void>}
 */
async function renderIndex() {
    try {
        // Load all people
        const people = await loadAllPeople();

        if (!people || people.length === 0) {
            showIndexError('Keine Familienmitglieder gefunden');
            return;
        }

        // Render all person cards
        const container = document.getElementById('family-members');
        if (!container) {
            console.error('Family members container not found');
            return;
        }

        // Clear loading message
        container.innerHTML = '';

        // Create and append person cards
        people.forEach(person => {
            const cardHTML = createPersonCard(person);
            container.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (error) {
        console.error('Error rendering index:', error);
        showIndexError('Fehler beim Laden der Familienmitglieder');
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
