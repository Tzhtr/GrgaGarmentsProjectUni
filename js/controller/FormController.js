export class FormController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.getClothesData();

        // Bind event handlers
        this.view.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.view.form.addEventListener('change', this.handleInputChange.bind(this));

        // Add event listener to the submit button for instant validation
        this.view.form.querySelector('input[type=submit]').addEventListener('click', this.handleInstantValidation.bind(this));
    }

    handleInputChange(event) {
        let input = event.target;
        this.model[input.name] = input.value; // Assign value to model property
    }

    handleFormSubmit(event) {
        event.preventDefault();
        // Save form data to local storage
    }

    // Function to handle instant validation when submit button is clicked
    handleInstantValidation(event) {
        event.preventDefault();
        if (this.model.validation()) {
            this.model.store();
        }

    }
}
