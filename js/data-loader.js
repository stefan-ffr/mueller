// Data loader module

// Manifest of available people (update this when adding new family members)
const PEOPLE_MANIFEST = ['elisabeth', 'stefan', 'rolf', 'samret', 'sky'];

// Cache for loaded data
const dataCache = {
    people: {},
    translations: null
};

/**
 * Loads a person's data from JSON file
 * @param {string} personId - Person ID
 * @returns {Promise<Object>} Person data
 */
async function loadPerson(personId) {
    // Return from cache if already loaded
    if (dataCache.people[personId]) {
        return dataCache.people[personId];
    }

    try {
        const response = await fetch(`data/${personId}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load person: ${personId}`);
        }
        const data = await response.json();

        // Cache the data
        dataCache.people[personId] = data;
        return data;
    } catch (error) {
        console.error(`Error loading person ${personId}:`, error);
        throw error;
    }
}

/**
 * Loads all people from manifest
 * @returns {Promise<Array>} Array of person objects sorted by displayOrder
 */
async function loadAllPeople() {
    const promises = PEOPLE_MANIFEST.map(id =>
        loadPerson(id).catch(err => {
            console.error(`Failed to load ${id}:`, err);
            return null;
        })
    );

    const results = await Promise.all(promises);
    const people = results.filter(person => person !== null);

    // Sort by displayOrder
    people.sort((a, b) => a.displayOrder - b.displayOrder);

    return people;
}

/**
 * Loads translations from JSON file
 * @returns {Promise<Object>} Translations object
 */
async function loadTranslations() {
    // Return from cache if already loaded
    if (dataCache.translations) {
        return dataCache.translations;
    }

    try {
        const response = await fetch('data/translations.json');
        if (!response.ok) {
            throw new Error('Failed to load translations');
        }
        const data = await response.json();

        // Cache the data
        dataCache.translations = data;
        return data;
    } catch (error) {
        console.error('Error loading translations:', error);
        throw error;
    }
}

/**
 * Gets cached person data (synchronous)
 * @param {string} personId - Person ID
 * @returns {Object|null} Person data or null if not cached
 */
function getCachedPerson(personId) {
    return dataCache.people[personId] || null;
}

/**
 * Gets all cached people (synchronous)
 * @returns {Array} Array of cached person objects
 */
function getAllCachedPeople() {
    return Object.values(dataCache.people).sort((a, b) => a.displayOrder - b.displayOrder);
}
