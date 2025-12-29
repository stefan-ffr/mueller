// Utility functions

/**
 * Gets URL parameter by name
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value or null if not found
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Escapes HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Gets flag emoji for country code
 * @param {string} code - Country code (ch, th, etc.)
 * @returns {string} Flag emoji
 */
function getFlagForCountry(code) {
    const flags = {
        'ch': '🇨🇭',
        'th': '🇹🇭',
        'de': '🇩🇪',
        'at': '🇦🇹',
        'us': '🇺🇸',
        'gb': '🇬🇧',
        'fr': '🇫🇷',
        'it': '🇮🇹'
    };
    return flags[code.toLowerCase()] || '🌍';
}

/**
 * Formats phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
function formatPhone(phone) {
    if (!phone) return '';

    // Remove all spaces
    const cleaned = phone.replace(/\s/g, '');

    // Swiss numbers: +41 XX XXX XX XX
    if (cleaned.startsWith('+41')) {
        const number = cleaned.substring(3);
        if (number.length === 9) {
            return `+41 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5, 7)} ${number.substring(7)}`;
        }
    }

    // Thai numbers: +66 XX XXX XXXX
    if (cleaned.startsWith('+66')) {
        const number = cleaned.substring(3);
        if (number.length === 9) {
            return `+66 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
        }
    }

    // Default: return original
    return phone;
}

/**
 * Formats address object to HTML string
 * @param {Object} address - Address object
 * @returns {string} Formatted HTML address
 */
function formatAddress(address) {
    const parts = [];

    if (address.street) parts.push(escapeHtml(address.street));

    if (address.district) {
        parts.push(escapeHtml(address.district));
    }

    if (address.amphoe) {
        parts.push(escapeHtml(address.amphoe));
    }

    const cityLine = [];
    // Add CH- prefix for Swiss postal codes
    if (address.postalCode) {
        const postalCode = address.country === 'Schweiz' || address.country === 'Switzerland'
            ? `CH-${address.postalCode}`
            : address.postalCode;
        cityLine.push(escapeHtml(postalCode));
    }
    if (address.city) cityLine.push(escapeHtml(address.city));
    if (cityLine.length > 0) parts.push(cityLine.join(' '));

    if (address.country) parts.push(escapeHtml(address.country));

    return parts.join('<br>');
}

/**
 * Formats address object to plain text string (for vCard)
 * @param {Object} address - Address object
 * @returns {string} Formatted plain text address
 */
function formatAddressPlain(address) {
    const parts = [];

    if (address.street) parts.push(address.street);
    if (address.district) parts.push(address.district);
    if (address.amphoe) parts.push(address.amphoe);

    const cityLine = [];
    if (address.city) cityLine.push(address.city);
    if (cityLine.length > 0) parts.push(cityLine.join(' '));

    return parts.join(', ');
}
