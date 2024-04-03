/**
 * Class that represents the application view. The view displays information 
 * contained in the model: type & color. The view does not obtain the information 
 * directly from the model, it uses the controller as a mediator which instructs 
 * it when and what to display. 
 * 
 * The view holds references to all UI elements with which the user interacts with
 * AND for which the event-handling mechanism needs to be implemented.
 */
export class ClothesView {
    constructor() {
        this.ClothesForm = document.querySelector("#form-clothes");
        this.selectsDiv = document.querySelector("#div-selects");
        this.selects = null;
        this.clothesDiv = document.querySelector("#div-clothes");
    }

    /**
     * Renders HTML select elements. The options are not loaded in the process,
     * meaning that there are no Option elements as part of the select element.
     *  
     * @param {Array} selectIDs - array of strings (select ids)  
     */
    renderSelects(selectIDs) {
        selectIDs.forEach((name) => {
            let select = document.createElement('select');
            select.setAttribute("id", name);
            select.setAttribute("name", name);
            select.options.add(new Option(` -- Select a ${name} -- `, 'undefined'));
            this.selectsDiv.appendChild(select);
        });

        this.selects = this.selectsDiv.querySelectorAll('select');
    }

    /**
     * Resets all next selects, selects that are siblings to the one defined by
     * this method parameter.
     * 
     * @param {type} selectID - the ID of the select which next siblings are going to be reset
     */
    resetNextSiblings(selectID) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        let nextSelect = select.nextElementSibling;
        while (nextSelect) {
            nextSelect.length = 1;
            nextSelect = nextSelect.nextElementSibling;
        }
    }

    /**
     * Adds options to a select.
     * 
     * @param {String} selectID
     * @param {Array} options - array of strings (option names)
     */
    addOptions(selectID, options) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        select.length = 1;
        options.forEach((option) => {
            select.options.add(new Option(option, option));
        });
    }

    /**
     * Renders the image based on the current selects' values.
     * 
     * @returns {undefined}
     */
    renderClothes() {
        let imgSrc = "";
        let i = 0;
        this.selects.forEach((select) => {
            imgSrc += `${select.value}-`;
        });
        imgSrc = imgSrc.slice(0, -1); //remove the last character '-'.
        let imgParts = imgSrc.split('-');

        document.getElementById('typeimgs').src = `media/${imgParts[0]}.png`;
        document.getElementById('colorimgs').src = `media/${imgParts[1]}.png`;
        document.getElementById('lastimgs').src = `media/${imgParts[2]}.png`;

        localStorage.setItem('type', imgParts[0]);
        localStorage.setItem('color', imgParts[1]);
        localStorage.setItem('last', imgParts[2]);


    }



}