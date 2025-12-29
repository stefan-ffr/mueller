// Data loader module

// Manifest of available people (update this when adding new family members)
const PEOPLE_MANIFEST = ['elisabeth', 'stefan', 'rolf', 'samret', 'sky'];

// Cache for loaded data
const dataCache = {
    people: {},
    translations: null,
    shared: null
};

/**
 * Loads shared data (addresses, etc.) from JSON file
 * @returns {Promise<Object>} Shared data object
 */
async function loadShared() {
    // Return from cache if already loaded
    if (dataCache.shared) {
        return dataCache.shared;
    }

    try {
        const response = await fetch('data/shared.json');
        if (!response.ok) {
            throw new Error('Failed to load shared data');
        }
        const data = await response.json();

        // Cache the data
        dataCache.shared = data;
        return data;
    } catch (error) {
        console.error('Error loading shared data:', error);
        throw error;
    }
}

/**
 * Resolves address references in person data
 * @param {Object} person - Person object
 * @param {Object} shared - Shared data object
 * @returns {Object} Person with resolved addresses
 */
function resolveAddressReferences(person, shared) {
    if (!shared || !shared.addresses) {
        return person;
    }

    // Clone person to avoid mutating cached data
    const resolved = JSON.parse(JSON.stringify(person));

    // Check each country's address
    resolved.countries.forEach(country => {
        if (country.address && typeof country.address === 'string') {
            // Address is a reference like "@shared/emmenbruecke"
            if (country.address.startsWith('@shared/')) {
                const addressKey = country.address.substring(8); // Remove "@shared/"
                const sharedAddress = shared.addresses[addressKey];

                if (sharedAddress) {
                    country.address = sharedAddress;
                } else {
                    console.warn(`Shared address not found: ${addressKey}`);
                }
            }
        }
    });

    return resolved;
}

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

        // Load shared data and resolve address references
        const shared = await loadShared();
        const resolved = resolveAddressReferences(data, shared);

        // Cache the resolved data
        dataCache.people[personId] = resolved;
        return resolved;
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
