// QR code generation module

/**
 * Generates a QR code in a specific element
 * @param {string} elementId - ID of container element
 * @param {string} data - Data to encode in QR code
 * @param {string} colorDark - Dark color for QR code
 */
function generateQRCode(elementId, data, colorDark = '#000000') {
    const container = document.getElementById(elementId);
    if (!container) {
        console.error(`Element with ID ${elementId} not found`);
        return;
    }

    // Clear existing QR code if any
    container.innerHTML = '';

    // Check if QRCode library is available
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded!');
        container.innerHTML = '<p class="text-red-600 text-sm">QRCode-Bibliothek nicht geladen</p>';
        return;
    }

    console.log(`Generating QR code for element: ${elementId}`);
    console.log(`Data length: ${data.length} characters`);

    try {
        // Try with lower error correction first
        new QRCode(container, {
            text: data,
            width: 200,
            height: 200,
            colorDark: colorDark,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.L  // Changed to L for maximum capacity
        });
        console.log(`QR code generated successfully for ${elementId}`);
    } catch (error) {
        console.error(`Error generating QR code for ${elementId}:`, error);
        console.error('Data length:', data.length);
        console.error('Data preview:', data.substring(0, 100) + '...');
        console.error('Full error:', error.message, error.stack);
        container.innerHTML = `<p class="text-red-600 text-sm">Fehler: ${error.message || 'Unbekannter Fehler'}</p>`;
    }
}

/**
 * Generates all QR codes for a person's profile
 * @param {Object} person - Person object
 */
function generateProfileQRCodes(person) {
    const pageUrl = window.location.href.split('?')[0] + '?person=' + person.id;
    const colorDark = person.theme.colorDark;

    console.log('Generating QR codes for:', person.fullName);

    if (person.countries.length === 1) {
        // Single country: Link + vCard QR codes
        const vcardSimplified = generateVCardForQR(person);
        console.log('Simplified vCard length:', vcardSimplified.length);

        generateQRCode('qrcode-link', pageUrl, colorDark);
        generateQRCode('qrcode-vcard', vcardSimplified, colorDark);
    } else {
        // Dual country: CH vCard + TH vCard + Link to full profile
        const vcardCH = generateVCardForQR(person, 'ch');
        const vcardTH = generateVCardForQR(person, 'th');

        console.log('CH vCard length:', vcardCH.length);
        console.log('TH vCard length:', vcardTH.length);

        generateQRCode('qrcode-ch', vcardCH, colorDark);
        generateQRCode('qrcode-th', vcardTH, colorDark);
        generateQRCode('qrcode-link', pageUrl, colorDark);
    }
}

/**
 * Converts German umlauts to ASCII equivalents for better QR code encoding
 * @param {string} text - Text to convert
 * @returns {string} ASCII-safe text
 */
function toASCII(text) {
    return text
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/Ä/g, 'Ae')
        .replace(/Ö/g, 'Oe')
        .replace(/Ü/g, 'Ue')
        .replace(/ß/g, 'ss');
}

/**
 * Generates a minimal vCard specifically for QR codes
 * @param {Object} person - Person object
 * @param {string} countryCode - Optional country code ('ch' or 'th') to generate country-specific vCard
 * @returns {string} Minimal vCard string (ASCII-safe for QR codes)
 */
function generateVCardForQR(person, countryCode = null) {
    // Convert names to ASCII to reduce QR code size (umlauts cause encoding issues)
    const fullName = toASCII(person.fullName);
    const lastName = toASCII(person.lastName);
    const firstName = toASCII(person.firstName);

    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `FN:${fullName}\n`;
    vcard += `N:${lastName};${firstName};;;\n`;

    if (countryCode) {
        // Generate country-specific vCard
        const country = person.countries.find(c => c.code === countryCode);
        if (country) {
            if (country.phone) {
                vcard += `TEL;TYPE=CELL:${country.phone.replace(/\s/g, '')}\n`;
            }
            if (country.email) {
                vcard += `EMAIL:${country.email}\n`;
            }
            if (country.address) {
                vcard += `ADR;TYPE=HOME:;;${toASCII(country.address.street || '')};${toASCII(country.address.city || '')};${toASCII(country.address.district || '')};${country.address.postalCode || ''};${toASCII(country.address.country || '')}\n`;
            }
        }
    } else {
        // Generate vCard with all countries' data
        // Add ALL phone numbers (most important)
        person.countries.forEach(country => {
            if (country.phone) {
                vcard += `TEL;TYPE=CELL:${country.phone.replace(/\s/g, '')}\n`;
            }
        });

        // Add email (only once, from first country that has it)
        const emailCountry = person.countries.find(c => c.email);
        if (emailCountry && emailCountry.email) {
            vcard += `EMAIL:${emailCountry.email}\n`;
        }

        // NO ADDRESSES for QR code - they make it too large
    }

    vcard += 'END:VCARD';
    return vcard;
}
