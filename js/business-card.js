// Business card generator module

/**
 * Opens a printable business card page
 * @param {string} personId - Person ID
 * @param {string} countryCode - Country code ('ch', 'th', or null for single country)
 */
function openBusinessCard(personId, countryCode = null) {
    // Get current language from i18n system
    const currentLang = getCurrentLanguage();

    const url = countryCode
        ? `business-card.html?person=${personId}&country=${countryCode}&lang=${currentLang}`
        : `business-card.html?person=${personId}&lang=${currentLang}`;
    window.open(url, '_blank');
}
