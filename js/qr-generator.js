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

    try {
        new QRCode(container, {
            text: data,
            width: 200,
            height: 200,
            colorDark: colorDark,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        container.innerHTML = '<p class="text-red-600 text-sm">Fehler beim Generieren des QR-Codes</p>';
    }
}

/**
 * Generates all QR codes for a person's profile
 * @param {Object} person - Person object
 */
function generateProfileQRCodes(person) {
    const pageUrl = window.location.href.split('?')[0] + '?person=' + person.id;
    const colorDark = person.theme.colorDark;
    const vcard = generateVCard(person);

    if (person.countries.length === 1) {
        // Single country: Link + vCard QR codes
        generateQRCode('qrcode-link', pageUrl, colorDark);
        generateQRCode('qrcode-vcard', vcard, colorDark);
    } else {
        // Dual country: CH + TH + vCard QR codes
        generateQRCode('qrcode-ch', pageUrl, colorDark);
        generateQRCode('qrcode-th', pageUrl, colorDark);
        generateQRCode('qrcode-vcard', vcard, colorDark);
    }
}
