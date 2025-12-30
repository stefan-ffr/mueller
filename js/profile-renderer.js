// Profile page renderer module

/**
 * Main function to render a profile page
 * @param {string} personId - Person ID to render
 * @returns {Promise<void>}
 */
async function renderProfile(personId) {
    try {
        // Load person data
        const person = await loadPerson(personId);

        if (!person) {
            showError('Person nicht gefunden');
            return;
        }

        // Set page title
        document.title = `${person.fullName} - Kontakt`;

        // Apply theme
        applyTheme(person.theme);

        // Render sections
        renderHeader(person);

        if (person.quickContacts) {
            renderQuickContact(person);
        }

        renderCountrySections(person);
        renderQRSection(person);
        renderDownloadButtons(person);

        // Generate QR codes
        generateProfileQRCodes(person);

        // Update language buttons for this theme
        updateLanguageButtons();

    } catch (error) {
        console.error('Error rendering profile:', error);
        showError('Fehler beim Laden des Profils. Bitte versuchen Sie es erneut.');
    }
}

/**
 * Shows an error message
 * @param {string} message - Error message
 */
function showError(message) {
    const content = document.getElementById('profile-content');
    if (content) {
        content.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Fehler!</strong>
                <span class="block sm:inline">${escapeHtml(message)}</span>
            </div>
        `;
    }
}

/**
 * Applies person theme to page
 * @param {Object} theme - Theme object
 */
function applyTheme(theme) {
    const body = document.getElementById('profile-body');
    if (body) {
        body.className = `bg-gradient-to-br ${theme.bgGradient} min-h-screen`;
        body.setAttribute('data-theme-color', theme.buttonColor);
    }

    const backLink = document.getElementById('back-link');
    if (backLink) {
        backLink.className = `inline-flex items-center text-${theme.textColor} hover:opacity-80`;
    }
}

/**
 * Renders the header section
 * @param {Object} person - Person object
 */
function renderHeader(person) {
    const content = document.getElementById('profile-content');
    if (!content) return;

    const headerHTML = `
        <div class="bg-white rounded-lg shadow-xl p-8 mb-6">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div class="w-32 h-32 bg-gradient-to-br from-${person.theme.gradientFrom} to-${person.theme.gradientTo} rounded-full flex items-center justify-center text-white text-5xl font-bold flex-shrink-0">
                    ${person.initial}
                </div>
                <div class="text-center md:text-left flex-grow">
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">${escapeHtml(person.fullName)}</h1>
                    <p class="text-gray-600 text-lg" data-i18n="member">Familienmitglied</p>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = headerHTML;
}

/**
 * Renders quick contact section (for Sky)
 * @param {Object} person - Person object
 */
function renderQuickContact(person) {
    if (!person.quickContacts || person.quickContacts.length === 0) return;

    const content = document.getElementById('profile-content');
    if (!content) return;

    const quickContactHTML = `
        <div class="bg-gradient-to-r from-${person.theme.gradientFrom} to-${person.theme.gradientTo} rounded-lg shadow-xl p-8 mb-6 text-white">
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <span class="text-3xl mr-3">⚡</span>
                <span data-i18n="quick_contact">Schnellkontakt</span>
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
                ${person.quickContacts.map(contact => `
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p class="font-bold mb-3 capitalize" data-i18n="${contact.label}">${escapeHtml(contact.label)}</p>
                        <div class="flex gap-2">
                            <a href="tel:${contact.phone}" class="flex-1 bg-white text-${person.theme.textColor} hover:bg-${person.theme.bgGradient.split(' ')[0].replace('from-', '')} font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <span data-i18n="call">Anrufen</span>
                            </a>
                            <a href="sms:${contact.phone}" class="flex-1 bg-white text-${person.theme.textColor} hover:bg-${person.theme.bgGradient.split(' ')[0].replace('from-', '')} font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                                <span data-i18n="message">SMS</span>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    content.insertAdjacentHTML('beforeend', quickContactHTML);
}

/**
 * Renders country contact sections
 * @param {Object} person - Person object
 */
function renderCountrySections(person) {
    const content = document.getElementById('profile-content');
    if (!content) return;

    // Create individual country cards
    const countryCards = person.countries.map(country => {
        return `
            <div class="bg-white rounded-lg shadow-xl p-8">
                <div class="flex items-center mb-6">
                    <span class="text-3xl mr-3">${country.flag}</span>
                    <h2 class="text-2xl font-bold text-gray-800" data-i18n="${country.code === 'ch' ? 'switzerland' : (country.code === 'th' ? 'thailand' : 'contact')}">${escapeHtml(country.name)}</h2>
                </div>

                <div class="space-y-4">
                    ${country.phone ? `
                        <div class="flex items-start">
                            <svg class="w-6 h-6 text-${person.theme.textColor} mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            <div>
                                <p class="text-gray-600 text-sm" data-i18n="phone">Telefon</p>
                                <a href="tel:${country.phone.replace(/\s/g, '')}" class="text-lg text-${person.theme.textColor} hover:underline">${escapeHtml(formatPhone(country.phone))}</a>
                            </div>
                        </div>
                    ` : ''}

                    ${country.email ? `
                        <div class="flex items-start">
                            <svg class="w-6 h-6 text-${person.theme.textColor} mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            <div>
                                <p class="text-gray-600 text-sm" data-i18n="email">E-Mail</p>
                                <a href="mailto:${country.email}" class="text-lg text-${person.theme.textColor} hover:underline">${escapeHtml(country.email)}</a>
                            </div>
                        </div>
                    ` : ''}

                    ${country.address ? `
                        <div class="flex items-start">
                            <svg class="w-6 h-6 text-${person.theme.textColor} mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <div>
                                <p class="text-gray-600 text-sm" data-i18n="address">Adresse</p>
                                <p class="text-lg text-gray-800">${formatAddress(country.address)}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Wrap in grid if multiple countries, otherwise single card
    const containerClass = person.countries.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6' : 'mb-6';
    const countrySectionHTML = `
        <div class="${containerClass}">
            ${countryCards}
        </div>
    `;

    content.insertAdjacentHTML('beforeend', countrySectionHTML);
}

/**
 * Renders QR code section
 * @param {Object} person - Person object
 */
function renderQRSection(person) {
    const content = document.getElementById('profile-content');
    if (!content) return;

    let qrHTML = '';

    if (person.countries.length === 1) {
        // Single country: Link + vCard
        qrHTML = `
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-xl p-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 text-center" data-i18n="qr_link">QR-Code Link</h3>
                    <div id="qrcode-link" class="flex justify-center mb-4"></div>
                    <p class="text-sm text-gray-600 text-center" data-i18n="qr_link_desc">Link zur Profilseite</p>
                </div>

                <div class="bg-white rounded-lg shadow-xl p-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 text-center" data-i18n="qr_vcard">QR-Code vCard</h3>
                    <div id="qrcode-vcard" class="flex justify-center mb-4"></div>
                    <p class="text-sm text-gray-600 text-center" data-i18n="qr_vcard_desc">Alle Kontaktdaten</p>
                </div>
            </div>
        `;
    } else {
        // Dual country: CH vCard + TH vCard + Link (country-specific vCards, then link)
        qrHTML = `
            <div class="grid md:grid-cols-3 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-xl p-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 text-center" data-i18n="qr_ch">vCard Schweiz</h3>
                    <div id="qrcode-ch" class="flex justify-center mb-4"></div>
                    <p class="text-sm text-gray-600 text-center" data-i18n="qr_ch_desc">Nur Schweizer Kontaktdaten</p>
                </div>

                <div class="bg-white rounded-lg shadow-xl p-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 text-center" data-i18n="qr_th">vCard Thailand</h3>
                    <div id="qrcode-th" class="flex justify-center mb-4"></div>
                    <p class="text-sm text-gray-600 text-center" data-i18n="qr_th_desc">Nur Thailand Kontaktdaten</p>
                </div>

                <div class="bg-white rounded-lg shadow-xl p-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 text-center" data-i18n="qr_link">QR-Code Link</h3>
                    <div id="qrcode-link" class="flex justify-center mb-4"></div>
                    <p class="text-sm text-gray-600 text-center" data-i18n="qr_link_desc">Link zur Profilseite</p>
                </div>
            </div>
        `;
    }

    content.insertAdjacentHTML('beforeend', qrHTML);
}

/**
 * Renders download buttons
 * @param {Object} person - Person object
 */
function renderDownloadButtons(person) {
    const content = document.getElementById('profile-content');
    if (!content) return;

    let buttonsHTML = '';

    if (person.countries.length === 1) {
        // Single download button + print button (hidden on mobile)
        buttonsHTML = `
            <div class="flex flex-col gap-4 mb-6">
                <button onclick="downloadVCard(getCachedPerson('${person.id}'), null)" class="bg-${person.theme.buttonColor} hover:bg-${person.theme.buttonHover} text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                    <span data-i18n="download">📥 Kontakt herunterladen</span>
                </button>
                <button onclick="openBusinessCard('${person.id}')" class="hidden md:block bg-${person.theme.buttonColor} hover:bg-${person.theme.buttonHover} text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                    <span data-i18n="print_card">🖨️ Visitenkarte drucken</span>
                </button>
            </div>
        `;
    } else {
        // Download buttons
        buttonsHTML = `
            <div class="grid md:grid-cols-3 gap-4 mb-4">
                <button onclick="downloadVCard(getCachedPerson('${person.id}'), null)" class="bg-${person.theme.buttonColor} hover:bg-${person.theme.buttonHover} text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                    <span data-i18n="download_all">📥 Komplett</span>
                </button>
                <button onclick="downloadVCard(getCachedPerson('${person.id}'), 'ch')" class="bg-${person.theme.buttonColor} hover:bg-${person.theme.buttonHover} text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                    <span data-i18n="download_ch">📥 Nur Schweiz</span>
                </button>
                <button onclick="downloadVCard(getCachedPerson('${person.id}'), 'th')" class="bg-${person.theme.buttonColor} hover:bg-${person.theme.buttonHover} text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                    <span data-i18n="download_th">📥 Nur Thailand</span>
                </button>
            </div>
            <div class="hidden md:flex justify-center">
                <button onclick="openBusinessCard('${person.id}')" class="bg-${person.theme.buttonColor} hover:bg-${person.theme.buttonHover} text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                    <span data-i18n="print_card">🖨️ Visitenkarte drucken (beide Seiten)</span>
                </button>
            </div>
        `;
    }

    content.insertAdjacentHTML('beforeend', buttonsHTML);
}
