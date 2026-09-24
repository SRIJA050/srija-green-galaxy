document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // PRODUCT SLIDER
    // ==============================

    document.querySelectorAll(".product-slider").forEach(function (slider) {

        const images = slider.querySelectorAll(".slider-image");

        if (images.length === 0) return;

        let current = 0;

        images[0].classList.add("active");

        setInterval(function () {

            images[current].classList.remove("active");

            current++;

            if (current >= images.length) {
                current = 0;
            }

            images[current].classList.add("active");

        }, 2000);

    });


    // ==============================
    // FORM ELEMENTS
    // ==============================

    const form = document.getElementById("orderForm");

    const quantityInput =
        document.getElementById("quantity");

    const totalAmount =
        document.getElementById("totalAmount");

    const productOptions =
        document.querySelectorAll(
            'input[name="product"]'
        );


    if (!form) {
        console.error("orderForm not found");
        return;
    }

    if (!quantityInput) {
        console.error("quantity input not found");
        return;
    }

    if (!totalAmount) {
        console.error("totalAmount element not found");
        return;
    }


    // ==============================
    // PRICE CALCULATION
    // ==============================

    function calculateTotal() {

        const selected =
            document.querySelector(
                'input[name="product"]:checked'
            );

        const quantity =
            parseInt(quantityInput.value) || 0;

        let price = 0;

        if (selected) {

            if (selected.value === "biopot-plant") {
                price = 100;
            }

            else if (selected.value === "biopot-empty") {
                price = 20;
            }

            else if (selected.value === "ganesh-normal") {
                price = 100;
            }

            else if (selected.value === "ganesh-gift") {
                price = 500;
            }
        }

        const total = price * quantity;

        totalAmount.textContent =
            "₹" + total.toLocaleString("en-IN");
    }


    // Product change
    productOptions.forEach(function (radio) {

        radio.addEventListener(
            "change",
            calculateTotal
        );

    });


    // Quantity change
    quantityInput.addEventListener(
        "input",
        calculateTotal
    );


    // Initial calculation
    calculateTotal();


    // ==============================
    // MESSAGE
    // ==============================

    function showMessage(message, type) {

        const box =
            document.getElementById("orderMessage");

        if (!box) {
            alert(message);
            return;
        }

        box.textContent = message;

        box.className =
            "order-message " + type;

        box.style.display = "block";
    }


    // ==============================
    // SUCCESS POPUP
    // ==============================

    function showSuccessPopup() {

        const overlay =
            document.createElement("div");

        overlay.className =
            "order-success-overlay";

        overlay.innerHTML = `

            <div class="order-success-popup">

                <div class="order-success-icon">
                    ✓
                </div>

                <h2>
                    Order Submitted Successfully!
                </h2>

                <p>
                    Thank you for choosing
                    <strong>Srija Green Galaxy</strong>.
                </p>

                <p>
                    Your order has been received successfully.
                    Our team will contact you soon.
                </p>

                <p class="order-success-contact">
                    For assistance:
                    <br>
                    <strong>+91-9440981551</strong>
                    <br>
                    <strong>+91-7013906160</strong>
                </p>

                <div class="order-success-buttons">

                    <a
                        href="index.html"
                        class="order-home-btn"
                    >
                        Go to Home
                    </a>

                    <a
                        href="contact.html"
                        class="order-contact-btn"
                    >
                        Contact Us
                    </a>

                </div>

            </div>

        `;

        document.body.appendChild(overlay);
    }


    // ==============================
    // SUBMIT ORDER
    // ==============================

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const selected =
                document.querySelector(
                    'input[name="product"]:checked'
                );

            const quantity =
                parseInt(quantityInput.value) || 0;

            const address =
                document.getElementById("address").value.trim();


            // ==============================
            // BASIC VALIDATION
            // ==============================

            if (!selected) {

                showMessage(
                    "Please select a product.",
                    "error"
                );

                return;
            }


            if (quantity <= 0) {

                showMessage(
                    "Please enter a valid quantity.",
                    "error"
                );

                return;
            }


            if (address === "") {

                showMessage(
                    "Please enter your complete delivery address.",
                    "error"
                );

                return;
            }


            // ==============================
            // BIOPOT WITH PLANT
            // Minimum 10
            // ==============================

            if (
                selected.value === "biopot-plant" &&
                quantity < 10
            ) {

                showMessage(
                    "Biopot with Plant orders require a minimum quantity of 10.",
                    "error"
                );

                return;
            }


            // ==============================
            // EMPTY BIOPOT
            // Minimum 101
            // ==============================

            if (
                selected.value === "biopot-empty" &&
                quantity <= 100
            ) {

                showMessage(
                    "Empty Biopot orders require a minimum quantity of 101.",
                    "error"
                );

                return;
            }


            // ==============================
            // NORMAL GANESH
            // ==============================

            if (
                selected.value === "ganesh-normal"
            ) {

                /*
                 * IMPORTANT:
                 *
                 * We are NOT using automatic
                 * address geolocation anymore.
                 *
                 * The customer must select
                 * whether the delivery is within
                 * 50 km of Gadwal.
                 */

                const deliveryArea =
                    document.querySelector(
                        'input[name="delivery-area"]:checked'
                    );


                if (!deliveryArea) {

                    showMessage(
                        "Please select your delivery location range.",
                        "error"
                    );

                    return;
                }


                if (
                    deliveryArea.value === "outside-50" &&
                    quantity < 5
                ) {

                    showMessage(
                        "Normal Ganesh orders outside 50 km from Gadwal require a minimum quantity of 5.",
                        "error"
                    );

                    return;
                }
            }


            // ==============================
            // SUBMIT TO WEB3FORMS
            // ==============================

            const formData =
                new FormData(form);


            // Prevent redirect
            formData.delete("redirect");


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Submitting...";

            }


            try {

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                console.log(
                    "Web3Forms:",
                    result
                );


                if (result.success) {

                    form.style.display =
                        "none";

                    showSuccessPopup();

                }

                else {

                    showMessage(
                        "Unable to submit the order. Please try again.",
                        "error"
                    );

                }

            }

            catch (error) {

                console.error(error);

                showMessage(
                    "Something went wrong while submitting the order. Please try again.",
                    "error"
                );

            }


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Order Now";

            }

        }
    );

});