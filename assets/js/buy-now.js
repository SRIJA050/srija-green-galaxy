document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PRODUCT SLIDERS
    ========================== */

    function startSlider(selector) {

        const slider = document.querySelector(selector);

        if (!slider) return;

        const images = slider.querySelectorAll(".slider-image");

        let current = 0;

        images.forEach(function (image, index) {

            image.classList.remove("active");

            if (index === 0) {
                image.classList.add("active");
            }

        });

        setInterval(function () {

            images[current].classList.remove("active");

            current++;

            if (current >= images.length) {
                current = 0;
            }

            images[current].classList.add("active");

        }, 2000);
    }

    startSlider(".biopot-slider");
    startSlider(".ganesha-slider");


    /* =========================
       ORDER CALCULATION
    ========================== */

    const form = document.getElementById("orderForm");
    const quantity = document.getElementById("quantity");
    const displayTotal = document.getElementById("displayTotal");
    const totalAmount = document.getElementById("totalAmount");
    const orderType = document.getElementById("orderType");

    const productOptions =
        document.querySelectorAll('input[name="product"]');


    function getSelectedProduct() {

        const selected =
            document.querySelector('input[name="product"]:checked');

        return selected ? selected.value : "";

    }


    function calculateTotal() {

        const product = getSelectedProduct();

        let qty = parseInt(quantity.value);

        if (isNaN(qty) || qty < 1) {
            qty = 1;
            quantity.value = 1;
        }

        let price = 0;
        let productName = "";


        if (product === "biopot-plant") {

            price = 100;
            productName = "Biopot with Plant";

        }

        else if (product === "biopot-empty") {

            price = 20;
            productName = "Empty Biopot";

        }

        else if (product === "ganesh-normal") {

            price = 100;
            productName = "Normal Ganesh Idol";

        }
        if (
    product === "ganesh-normal" &&
    customerDistance > 50 &&
    qty < 5
) {

    showOrderMessage(
        "For deliveries more than 50 km from Gadwal, Normal Ganesh orders require a minimum quantity of 5.",
        "error"
    );

    return;

}

        else if (product === "ganesh-gift") {

            price = 500;
            productName = "Gift / Decoration Ganesh Idol";

        }


        const total = price * qty;

        displayTotal.textContent =
            "₹" + total.toLocaleString("en-IN");

        totalAmount.value =
            "₹" + total.toLocaleString("en-IN");

        orderType.value =
            productName + " × " + qty;

    }


    productOptions.forEach(function (option) {

        option.addEventListener(
            "change",
            calculateTotal
        );

    });


    quantity.addEventListener(
        "input",
        calculateTotal
    );


    calculateTotal();


    /* =========================
       MESSAGE
    ========================== */

    function showOrderMessage(message, type) {

        const box =
            document.getElementById("orderMessage");

        if (!box) return;

        box.textContent = message;

        box.className =
            "order-message " + type;

        box.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =========================
       SUCCESS POPUP
    ========================== */

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
                    Order Received Successfully
                </h2>

                <p>
                    Thank you for choosing
                    <strong>Srija Green Galaxy</strong>.
                </p>

                <p>
                    Your order details have been
                    received successfully.
                    Our team will contact you shortly
                    to confirm your order and delivery.
                </p>

                <p class="order-success-contact">

                    For any questions or assistance,
                    please contact our team.

                </p>

                <div class="order-success-buttons">

                    <a href="index.html"
                       class="order-home-btn">
                        Back to Home
                    </a>

                    <a href="contact.html"
                       class="order-contact-btn">
                        Contact Us
                    </a>

                </div>

            </div>

        `;

        document.body.appendChild(overlay);

    }


    /* =========================
       FORM SUBMISSION
    ========================== */

    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        const product =
            getSelectedProduct();

        const qty =
            parseInt(quantity.value);

        const address =
            document.getElementById("address")
                .value.trim();
        let customerDistance = null;
        if (product === "ganesh-normal") {

    try {

        const location =
            await getLocationFromAddress(address);

        customerDistance =
            calculateDistance(
                GADWAL_LAT,
                GADWAL_LON,
                location.lat,
                location.lon
            );

    } catch (error) {

        showOrderMessage(
            "We could not verify the delivery location. Please enter a complete address with city and PIN code.",
            "error"
        );

        return;

    }

}
        const GADWAL_LAT = 16.2350;
        const GADWAL_LON = 77.7956;
        function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
}
async function getLocationFromAddress(address) {

    const url =
        "https://nominatim.openstreetmap.org/search" +
        "?format=json" +
        "&addressdetails=1" +
        "&limit=1" +
        "&countrycodes=in" +
        "&q=" +
        encodeURIComponent(address);

    const response = await fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Location service unavailable");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("Address location not found");
    }

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Location service unavailable");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("Address location not found");
    }

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

        /* PRODUCT CHECK */

        if (!product) {

            showOrderMessage(
                "Please select a product before placing your order.",
                "error"
            );

            return;

        }


        /* EMPTY BIOPOT RULE */

        if (
            product === "biopot-empty" &&
            qty <= 100
        ) {

            showOrderMessage(
                "Empty Biopots can be ordered only for quantities above 100.",
                "error"
            );

            return;

        }

        /* BIOPOT WITH PLANT */

if (
    product === "biopot-plant" &&
    qty < 10
) {

    showOrderMessage(
        "Biopots with plants require a minimum order of 10.",
        "error"
    );

    return;
}



        /* ADDRESS CHECK */

        if (address.length < 10) {

            showOrderMessage(
                "Please enter your complete delivery address.",
                "error"
            );

            return;

        }


        /* UPDATE TOTAL */

        calculateTotal();


        /* SAVE ORDER */

        localStorage.setItem(
            "srijaOrderProduct",
            product
        );

        localStorage.setItem(
            "srijaOrderQuantity",
            qty
        );

        localStorage.setItem(
            "srijaOrderAddress",
            address
        );


        /* =========================
           SEND TO WEB3FORMS
        ========================== */

        const submitButton =
            document.getElementById("orderButton");

        const originalText =
            submitButton.textContent;


        submitButton.disabled = true;

        submitButton.textContent =
            "Processing Order...";


        try {

            const formData =
                new FormData(form);


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


            if (result.success) {

                /* Hide form */

                form.style.display = "none";


                /* Show professional popup */

                showSuccessPopup();


            } else {

                showOrderMessage(
                    "We could not submit your order. Please try again.",
                    "error"
                );

                submitButton.disabled = false;

                submitButton.textContent =
                    originalText;

            }


        } catch (error) {

            showOrderMessage(
                "Something went wrong while submitting your order. Please try again.",
                "error"
            );

            submitButton.disabled = false;

            submitButton.textContent =
                originalText;

        }

    });


    /* =========================
       CURRENT YEAR
    ========================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });

});