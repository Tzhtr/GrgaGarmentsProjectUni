/**
 * Class that represents the application controller. The controller is responsible 
 * for accessing data from the model and displaying it on the view.
 * The controller contains the code that handles different types of events. The
 * controller's methods are event handlers.
 */
export class ClothesController {
    /**
     * Creates an object representing the Clothes controller.
     * 
     * @param {type} model - The model the controller interacts with.
     * @param {type} view - The view the controller interatcs with.
     * @returns {ClothesController} The object representing the Clothes controller.
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 1. render all selects
        let properties = this.model.getProperties();
        this.view.renderSelects(properties);

        // 2. populate the first select
        let firstSelectID = properties[0];
        this.view.addOptions(firstSelectID, this.model.getOptions(firstSelectID));

        // 3. register one event handler for all select 'change' events
        this.view.selects.forEach((select) => {
            select.addEventListener('change', this.handleSelectChange);
        });

        // 4. register form submit handler
        this.view.ClothesForm.addEventListener('submit', this.handleFormSubmit);

    }

    /**
    * Handles "change" events fired by input fields.
    * On change, the model is updated to reflect the new values and the view 
    * is tasked with enabling/disabling the submit button.
    * 
    * @param {Event} event - the event to be processed 
    */
    handleSelectChange = (event) => {
        let select = event.target;

        this.model[select.id] = select.value;
        this.model.resetNextProperties(select.id);

        this.view.resetNextSiblings(select.id);
        let nextSelect = select.nextElementSibling;
        if (select.selectedIndex > 0 && nextSelect) {
            this.view.addOptions(nextSelect.id, this.model.getOptions(nextSelect.id));
        }

        //2.2. Update the ClothesDiv 
        this.view.renderClothes();
    }
    /**
         * Handles "submit" events fired by the form.
         * On submit, the view renders the image, and then, it's reset to initial
         * values. 
         * 
         * @param {Event} event - the event to be processed 
         */
    handleFormSubmit = (event) => {
        this.model.persist();
    }
}

