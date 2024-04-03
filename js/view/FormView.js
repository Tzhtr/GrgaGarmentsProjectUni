/**
 * Represents the View. View holds refences to all GUI elements user interacts with.
 * The View exposes methods to interact with the view elements. 
 */
export class FormView {
    constructor() {
        this.inputs = null;
        this.form = document.querySelector('#orderForm');
        this.capColor = localStorage.getItem("type");
        this.jacketColor = localStorage.getItem("color");
        this.pantsColor = localStorage.getItem("last");
    }

    createInputs(dataObject) {
        for (let property in dataObject) {
            this.form.querySelector('fieldset').insertAdjacentHTML('beforeend',
                `<p>${property}
                        <input name='${property}' 
                               value='${dataObject[property]}' 
                               type='text' size='30'/>
                     </p>`);
        }
        this.inputs = this.form.querySelectorAll('input[type=text]');
    }

    getClothesData() {
        document.getElementById('capImage').src = `media/${this.capColor}.png`;
        document.getElementById('jacketImage').src = `media/${this.jacketColor}.png`;
        document.getElementById('pantsImage').src = `media/${this.pantsColor}.png`;
        const colorsParagraph = document.getElementById('colorsPara');
        colorsParagraph.innerHTML = `<strong> Cap color:</strong > ${this.capColor} <br>
                                <strong>Jacket color:</strong> ${this.jacketColor}<br>
                                <strong>Pants color:</strong> ${this.pantsColor}`;
    }


}

