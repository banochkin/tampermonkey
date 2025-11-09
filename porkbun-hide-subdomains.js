// ==UserScript==
// @name         Porkbun Hide Subdomains
// @namespace    https://porkbun.com/
// @version      1.0.1
// @description  Hide all domains that are third-level or deeper in Porkbun search results
// @author       banochkin.com DAO
// @match        https://porkbun.com/checkout/search*
// @icon         https://porkbun.com/images/favicons/android-icon-192x192.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function isSubdomain(domain) {
        domain = domain.trim().replace(/\.$/, '');
        const parts = domain.split('.');
        return parts.length > 2;
    }

    function hideSubdomains() {
        const rows = document.querySelectorAll('.searchResultRowDomain');
        rows.forEach(el => {
            const domain = el.textContent.trim();
            if (isSubdomain(domain)) {
                const well = el.closest('.well');
                if (well) well.style.display = 'none';
            }
        });
    }

    function boldRenewalPrices() {
        const renewalElements = document.querySelectorAll('.renewsAtContainer');
        renewalElements.forEach(el => {
            el.style.fontWeight = 'bold';
            el.style.fontSize = '13px'
        });
    }

    function applyModifications() {
        hideSubdomains();
        boldRenewalPrices();
    }

    const observer = new MutationObserver(applyModifications);
    observer.observe(document.body, { childList: true, subtree: true });

    applyModifications();
})();
