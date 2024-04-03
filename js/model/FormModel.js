export class FormModel {
    constructor() {
        this.name = "";
        this.email = "";
        this.address = "";
        this.phone = "";
        this.creditCard = "";
        this.terms = false; // Assuming terms checkbox state is boolean
        this.init();
    }

    init() {
        let formData = JSON.parse(localStorage.getItem('formData'));
        if (formData) {
            for (let field in formData) {
                this[field] = formData[field];
            }
        }
    }

    store() {
        console.log("halo")
        var itemss = {
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
            creditCard: this.creditCard,
            terms: this.terms
        }
        localStorage.setItem('formData', JSON.stringify(itemss));
    }

    validation() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var phone = document.getElementById("phone").value;
        var creditCard = document.getElementById("creditCard").value;

        var errorMessage = "";

        // Check if name is filled
        if (name.trim() === "") {
            errorMessage += "Name is required.<br>";
        }

        // Check if email is filled and valid
        if (email.trim() === "") {
            errorMessage += "Email is required.<br>";
        } else if (!this.validateEmail(email)) {
            errorMessage += "Invalid email format.<br>";
        }

        // Check if address is filled
        if (address.trim() === "") {
            errorMessage += "Address is required.<br>";
        }

        // Check if phone is filled and contains only numbers
        if (phone.trim() === "") {
            errorMessage += "Phone number is required.<br>";
        } else if (!/^\d+$/.test(phone)) {
            errorMessage += "Phone number must contain only numbers.<br>";
        }

        // Check if credit card number is filled
        if (creditCard.trim() === "") {
            errorMessage += "Credit card number is required.<br>";
        }

        // Display error message if any
        if (errorMessage !== "") {
            document.getElementById("error-message").innerHTML = errorMessage;
        } else {
            document.getElementById("error-message").innerHTML = ""; // Clear any previous error messages
            return true;
        }

    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

}
