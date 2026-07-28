/*
=====================================================
Genially Tools Core (GT Core)
Version : 1.3.0
Auteur : LeFrid
=====================================================
*/

const GT = {

    // Préfixe utilisé dans le localStorage
    prefix: "GT_",

    /**
     * Enregistre une variable
     */
    set(name, value) {
        localStorage.setItem(this.prefix + name, JSON.stringify(value));
    },

    /**
     * Lit une variable
     */
    get(name) {

        const value = localStorage.getItem(this.prefix + name);

        if (value === null) {
            return null;
        }

        return JSON.parse(value);

    },

    /**
     * Supprime une variable
     */
remove(name) {
    localStorage.removeItem(this.prefix + name);
},

/**
 * Lit les paramètres de l'URL
 */
params() {

        const params = {};
        const urlParams = new URLSearchParams(window.location.search);

        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }

        return params;

    },

    /**
     * Remplace les variables {nom} par leur valeur enregistrée
     */
    render(template, options = {}) {

        if (typeof template !== "string") {
            return "";
        }

        const variableClass = options.variableClass || "variable";
        const uppercase = options.uppercase === true;
        const missingValue = options.missingValue || "";

        /**
         * Sécurise le texte avant son insertion dans le HTML
         */
        function escapeHtml(value) {
            return String(value)
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("'", "&#039;");
        }

        return template.replace(
            /\{([a-zA-Z0-9_-]+)\}/g,
            (placeholder, variableName) => {

                let value = this.get(variableName);

                if (value === null || value === undefined) {
                    value = missingValue;
                }

                if (uppercase) {
                    value = String(value).toUpperCase();
                }

                return (
                    '<span class="' +
                    escapeHtml(variableClass) +
                    '">' +
                    escapeHtml(value) +
                    "</span>"
                );
            }
        );

    },

    /**
     * Met à jour automatiquement les éléments portant
     * l'attribut data-gt-render
     */
    autoRender(selector = "[data-gt-render]", options = {}) {

        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {

            // Mémorise le modèle d'origine
            if (!element.dataset.gtTemplate) {
                element.dataset.gtTemplate = element.innerHTML;
            }

            element.innerHTML = this.render(
                element.dataset.gtTemplate,
                options
            );

        });

    }

};
