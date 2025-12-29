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
    if (address.postalCode) cityLine.push(escapeHtml(address.postalCode));
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
