import { selectData } from '../store/selectData.js';

/**
 * Represents the application model. The model contains the data, the information 
 * regarding the clothes about colors
 */
export class ClothesModel {
    static store = selectData; // external resource

    /**
     * Creates an object representing the Clothes model.
     * 
     * @returns {ClothesModel} The object representing the Clothes model.
     */
    constructor() {
        this.type = "undefined";
        this.color = "undefined";
        this.last = "undefined";
    }

    /**
     * Returns an array of this object's properties names.
     * The returned array is used by View to dynamically render the selects. 
     * For each Model property, a select is being rendered in View.
     * 
     * @returns {Array} array of property names (strings)
     */
    getProperties() {
        return Object.keys(this);
    }

    /**
     * Gets the data from the external resource to be used as select options.
     * 
     * @param {String} selectID - select ID
     * @returns {Array} array of select's options (strings)
     */
    getOptions(selectID) {
        // 1. extract the data from the external resource (ClothesModel.store).
        let options; // a JS object
        switch (selectID) {
            case 'type':
                options = Object.keys(ClothesModel.store);
                break;
            case 'color':
                console.log(ClothesModel.store[this.type])
                options = Object.keys(ClothesModel.store[this.type]);
                break;
            case 'last':
                options = Object.keys(ClothesModel.store[this.type][this.color]);
                break;
        }

        // 2. return select options
        return options;
    }

    /**
     * Resets this object's properties to "undefined". Not all properties are
     * going to be reset, only those that are listed after the property defined 
     * by this method parameter. 
     * 
     * @param {type} property - property from which the reset starts.
     */
    resetNextProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);
        while (++index < properties.length) {
            this[properties[index]] = "undefined";
        }
    }

    /**
     * Stores Clothes data accross browser sessions. Window.localStorage is used 
     * to store the model as a JSON string under the key 'Clothes'.
     */
    persist() {

        localStorage.setItem('Clothes', JSON.stringify(this));

    }
}