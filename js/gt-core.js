/*
=====================================================
Genially Tools Core (GT Core)
Version : 1.1.0
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

}

};

console.log("GT Core chargé");
