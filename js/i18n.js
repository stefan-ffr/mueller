// Internationalization module

let currentLanguage = 'de';
let translations = {};

/**
 * Initializes the i18n system
 * @returns {Promise<void>}
 */
async function initI18n() {
    // Load translations
    translations = await loadTranslations();

    // Get saved language or detect browser language
    let lang = localStorage.getItem('language');

    if (!lang) {
        lang = detectBrowserLanguage();
        localStorage.setItem('language', lang);
    }

    currentLanguage = lang;
    updatePageLanguage();
}

/**
 * Detects browser language
 * @returns {string} Language code (de, en, or th)
 */
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.toLowerCase().split('-')[0];

    if (langCode === 'de') return 'de';
    if (langCode === 'th') return 'th';
    return 'en';
}

/**
 * Sets and persists the current language
 * @param {string} lang - Language code
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not available`);
        return;
    }

    localStorage.setItem('language', lang);
    currentLanguage = lang;
    updatePageLanguage();
}

/**
 * Gets the current language
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Translates a key
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function translate(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return key;
}

/**
 * Updates all elements with data-i18n attribute
 */
function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translate(key);
    });

    // Update language button states
    updateLanguageButtons();
}

/**
 * Updates language button active states
 */
function updateLanguageButtons() {
    // Remove active class from all buttons
    document.querySelectorAll('[id^="lang-"]').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'bg-blue-600', 'bg-green-600', 'bg-pink-600', 'bg-cyan-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });

    // Add active class to current language button
    const activeBtn = document.getElementById(`lang-${currentLanguage}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-gray-200', 'text-gray-700');

        // Use appropriate color based on page theme (will be set by profile-renderer)
        const themeColor = document.body.getAttribute('data-theme-color') || 'purple-600';
        activeBtn.classList.add(`bg-${themeColor}`, 'text-white');
    }
}
