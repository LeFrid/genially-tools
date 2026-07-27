/*
=====================================================
Genially Tools Core (GT Core)
Version : 1.0.0
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
     * Efface toutes les variables GT
     */
    clear() {

        Object.keys(localStorage).forEach(key => {

            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }

        });

    }

};

console.log("GT Core chargé");
