// vCard generation module

/**
 * Generates vCard data from person object
 * @param {Object} person - Person object
 * @param {string|null} countryFilter - Country code filter (null, 'ch', or 'th')
 * @param {boolean} simplified - Generate simplified vCard for QR code (no addresses)
 * @returns {string} vCard formatted string
 */
function generateVCard(person, countryFilter = null, simplified = false) {
    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `FN:${person.fullName}\n`;
    vcard += `N:${person.lastName};${person.firstName};;;\n`;

    // Filter countries if needed
    const countries = countryFilter
        ? person.countries.filter(c => c.code === countryFilter)
        : person.countries;

    // Add phone numbers
    countries.forEach(country => {
        if (country.phone) {
            vcard += `TEL;TYPE=CELL:${country.phone.replace(/\s/g, '')}\n`;
        }
    });

    // Add email (only once, from first country that has it)
    const emailCountry = countries.find(c => c.email);
    if (emailCountry && emailCountry.email) {
        vcard += `EMAIL:${emailCountry.email}\n`;
    }

    // Add addresses (skip if simplified version for QR code)
    if (!simplified) {
        countries.forEach(country => {
            if (country.address) {
                const addr = country.address;
                const street = addr.street || '';
                const city = addr.city || '';
                const postalCode = addr.postalCode || '';
                const countryName = addr.country || '';

                // Build extended address from district and amphoe if present
                let extendedAddr = '';
                if (addr.district) {
                    extendedAddr += addr.district;
                }
                if (addr.amphoe) {
                    if (extendedAddr) extendedAddr += ', ';
                    extendedAddr += addr.amphoe;
                }

                vcard += `ADR;TYPE=HOME:;;${street}${extendedAddr ? ', ' + extendedAddr : ''};${city};;${postalCode};${countryName}\n`;
            }
        });
    }

    vcard += 'END:VCARD';
    return vcard;
}

/**
 * Gets filename for vCard download
 * @param {Object} person - Person object
 * @param {string|null} countryFilter - Country code filter
 * @returns {string} Filename
 */
function getVCardFilename(person, countryFilter) {
    const baseName = person.fullName.replace(/\s/g, '_');

    if (!countryFilter) {
        return `${baseName}_Komplett.vcf`;
    } else if (countryFilter === 'ch') {
        return `${baseName}_Schweiz.vcf`;
    } else if (countryFilter === 'th') {
        return `${baseName}_Thailand.vcf`;
    }

    return `${baseName}.vcf`;
}

/**
 * Triggers vCard download
 * @param {Object} person - Person object
 * @param {string|null} countryFilter - Country code filter
 */
function downloadVCard(person, countryFilter = null) {
    const vcard = generateVCard(person, countryFilter);
    const filename = getVCardFilename(person, countryFilter);

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
