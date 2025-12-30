// Business card generator module

/**
 * Opens a printable business card page
 * @param {string} personId - Person ID
 * @param {string} countryCode - Country code ('ch', 'th', or null for single country)
 */
function openBusinessCard(personId, countryCode = null) {
    const url = countryCode
        ? `business-card.html?person=${personId}&country=${countryCode}`
        : `business-card.html?person=${personId}`;
    window.open(url, '_blank');
}
