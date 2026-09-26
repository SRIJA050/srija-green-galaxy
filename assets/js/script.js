// =========================================================
// SRIJA GREEN GALAXY - WEBSITE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
// =========================================
// CART SIDEBAR
// =========================================

const cartBtn = document.getElementById("cartBtn");
const sideCart = document.getElementById("sideCart");
const closeCart = document.getElementById("closeCart");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openCart() {
    if (!sideCart || !sidebarOverlay) return;

    sideCart.classList.add("open");
    sidebarOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCartSidebar() {
    if (sideCart) {
        sideCart.classList.remove("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("open");
    }

    document.body.style.overflow = "";
}

if (cartBtn) {
    cartBtn.addEventListener("click", openCart);
}

if (closeCart) {
    closeCart.addEventListener("click", closeCartSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeCartSidebar);
}


// =========================================
// WISHLIST SIDEBAR
// =========================================

const wishlistBtn = document.getElementById("wishlistBtn");
const sideWishlist = document.getElementById("sideWishlist");
const closeWishlist = document.getElementById("closeWishlist");

function openWishlist() {
    if (!sideWishlist || !sidebarOverlay) return;

    sideWishlist.classList.add("open");
    sidebarOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeWishlistSidebar() {
    if (sideWishlist) {
        sideWishlist.classList.remove("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("open");
    }

    document.body.style.overflow = "";
}

if (wishlistBtn) {
    wishlistBtn.addEventListener("click", openWishlist);
}

if (closeWishlist) {
    closeWishlist.addEventListener("click", closeWishlistSidebar);
}
   
    // =========================================
// HERO NUMBER COUNTING ANIMATION
// =========================================

const counters = document.querySelectorAll(".count-number");

counters.forEach(function (counter) {

    const target = Number(counter.getAttribute("data-target"));
    const duration = 2500;
    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsed = currentTime - startTime;

        // Constant speed from 0 to target
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(target * progress);

        // Add % symbol only for percentage counter
        if (counter.dataset.suffix === "%") {
            counter.textContent = currentValue + "%";
        } else {
            counter.textContent = currentValue;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Make absolutely sure final value is correct
            if (counter.dataset.suffix === "%") {
                counter.textContent = target + "%";
            } else {
                counter.textContent = target;
            }
        }
    }

    requestAnimationFrame(updateCounter);
});


    //const sections = document.querySelectorAll("section");
    const sections = document.querySelectorAll("section:not(.gallery-section)");

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-section");
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    sections.forEach(function (section) {
        section.classList.add("animate-section");
        observer.observe(section);
    });


    // -----------------------------------------------------
    // Smooth scrolling for same-page links
    // -----------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    // -----------------------------------------------------
    // Current year in footer
    // -----------------------------------------------------

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // -----------------------------------------------------
    // Mobile navigation helper
    // -----------------------------------------------------

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.forEach(function (item) {
                    item.classList.remove("active");
                });

                this.classList.add("active");

            });

        });

    }

});
// =========================================
// TRUE EARTH-SUN STYLE IMPACT ORBIT
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const orbit = document.querySelector(".orbit-container");
    const images = document.querySelectorAll(".orbit-image");

    if (!orbit || images.length !== 6) return;

    const total = images.length;

    let angle = -90;
    let currentFront = 0;

    let lastTime = performance.now();

    // Orbit radius
    const radiusX = 220;
    const radiusY = 220;

    // Normal orbit speed
    const orbitSpeed = 0.018;

    // Front image timing
    const normalOrbitTime = 2000;
    const frontHoldTime = 2000;

    let phase = "orbit";
    let phaseStart = performance.now();

    function animate(time) {

        const delta = time - lastTime;
        lastTime = time;

        if (phase === "orbit") {

            // Move the complete group around the center
            angle += orbitSpeed * delta;

            if (time - phaseStart >= normalOrbitTime) {
                phase = "focus";
                phaseStart = time;
            }

        } else if (phase === "focus") {

            // Keep orbit moving while front image comes forward
            angle += orbitSpeed * delta;

            if (time - phaseStart >= 1500) {
                phase = "hold";
                phaseStart = time;
            }

        } else if (phase === "hold") {

            // Front image stays large for 2 seconds
            if (time - phaseStart >= frontHoldTime) {
                phase = "return";
                phaseStart = time;
            }

        } else if (phase === "return") {

            // Orbit continues while images return
            angle += orbitSpeed * delta;

            if (time - phaseStart >= 1500) {

                currentFront++;

                if (currentFront >= total) {
                    currentFront = 0;
                }

                phase = "orbit";
                phaseStart = time;
            }
        }

        updateOrbit(time);

        requestAnimationFrame(animate);
    }
    function updateOrbit(time) {

    images.forEach(function (image, index) {

        const imageAngle =
            angle + (360 / total) * index;

        const radians =
            imageAngle * Math.PI / 180;

        // Normal circular orbit position
        const orbitX =
            Math.cos(radians) * radiusX;

        const orbitY =
            Math.sin(radians) * radiusY;

        let x = orbitX;
        let y = orbitY;

        let scale = 1;
        let opacity = 1;

        /*
         * =====================================
         * IMAGE COMES TO CENTER / SUN POSITION
         * =====================================
         */

        if (phase === "focus") {

            if (index === currentFront) {

                const progress =
                    Math.min(
                        1,
                        (time - phaseStart) / 1500
                    );

                /*
                 * Orbit position -> CENTER
                 */
                const ease =
                    1 - Math.pow(1 - progress, 3);

                x = orbitX * (1 - ease);
                y = orbitY * (1 - ease);

                /*
                 * Grow only while moving
                 * towards the center.
                 */
                scale =
                    1 + (0.75 * ease);

                opacity = 1;

            } else {

                /*
                 * Other five disappear slowly.
                 */
                opacity =
                    Math.max(
                        0,
                        1 -
                        ((time - phaseStart) / 1500)
                    );

                scale = 1;
            }
        }


        /*
         * =====================================
         * CENTER / SUN POSITION
         * =====================================
         */

        else if (phase === "hold") {

            if (index === currentFront) {

                // EXACT CENTER
                x = 0;
                y = 0;

                // Large image
                scale = 1.75;

                opacity = 1;

            } else {

                x = orbitX;
                y = orbitY;

                opacity = 0;
                scale = 1;
            }
        }


        /*
         * =====================================
         * CENTER -> ORBIT
         * =====================================
         */

        else if (phase === "return") {

            if (index === currentFront) {

                const progress =
                    Math.min(
                        1,
                        (time - phaseStart) / 1500
                    );

                /*
                 * Center -> original orbit
                 */
                const ease =
                    progress * progress * (3 - 2 * progress);

                x = orbitX * ease;
                y = orbitY * ease;

                scale =
                    1.75 -
                    (0.75 * ease);

                opacity = 1;

            } else {

                /*
                 * Other five appear at the
                 * same time.
                 */
                const progress =
                    Math.min(
                        1,
                        (time - phaseStart) / 1500
                    );

                x = orbitX;
                y = orbitY;

                opacity = progress;
                scale = 1;
            }
        }


        /*
         * =====================================
         * NORMAL ORBIT
         * =====================================
         */

        else {

            x = orbitX;
            y = orbitY;

            scale = 1;
            opacity = 1;
        }


        /*
         * IMPORTANT:
         *
         * translate = position around Sun
         * scale = size
         *
         * Image itself NEVER rotates.
         */
        image.style.transform =
            `translate(${x}px, ${y}px) scale(${scale})`;

        image.style.opacity = opacity;

        image.style.zIndex =
            index === currentFront ? 20 : 5;
    });
}
    

    requestAnimationFrame(animate);

});
// =========================================
// PRODUCT QUANTITY CONTROLS
// =========================================

// =========================================
// PRODUCT QUANTITY CONTROLS
// =========================================

document.querySelectorAll(".shop-product-card").forEach(function (card) {

    const minusBtn = card.querySelector(".quantity-minus");
    const plusBtn = card.querySelector(".quantity-plus");
    const quantityValue = card.querySelector(".quantity-value");

    if (!minusBtn || !plusBtn || !quantityValue) {
        return;
    }

    let quantity = Number(quantityValue.textContent) || 1;

    minusBtn.addEventListener("click", function () {

        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }

    });

    plusBtn.addEventListener("click", function () {

        quantity++;
        quantityValue.textContent = quantity;

    });

});
// =========================================
// SHOPPING CART + WISHLIST
// =========================================


let shoppingCart =
    JSON.parse(localStorage.getItem("srijaShoppingCart")) || [];

let wishlistItems =
    JSON.parse(localStorage.getItem("srijaWishlist")) || [];


// =========================================
// ADD TO CART
// =========================================

document.querySelectorAll(".shop-product-card").forEach(function (card) {

    const addButton = card.querySelector(".add-to-cart-btn");

    if (!addButton) return;

    addButton.addEventListener("click", function () {

        const productId = card.getAttribute("data-product-id");
        const productName = card.getAttribute("data-product-name");
        const productPrice = Number(
            card.getAttribute("data-product-price")
        );

        const quantityElement =
            card.querySelector(".quantity-value");

        const quantity =
            Number(quantityElement.textContent);

        const existingProduct =
            shoppingCart.find(function (item) {
                return item.id === productId;
            });

        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            shoppingCart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: quantity
            });

        }

        updateCartCount();
        updateCartSidebar();
        localStorage.setItem(
            "srijaShoppingCart",
            JSON.stringify(shoppingCart)
        );

        // Open cart directly
        const sideCart =
            document.getElementById("sideCart");

        const sidebarOverlay =
            document.getElementById("sidebarOverlay");

        if (sideCart) {
            sideCart.classList.add("open");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("open");
        }

        document.body.style.overflow = "hidden";

    });

});


// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    let totalQuantity = 0;

    shoppingCart.forEach(function (item) {

        totalQuantity += item.quantity;

    });

    cartCount.textContent = totalQuantity;

}

// =========================================
// UPDATE CART SIDEBAR
// =========================================

function updateCartSidebar() {

    const cartContent =
        document.getElementById("cartContent");

    const cartTotal =
        document.getElementById("sidebarCartTotal");

    if (!cartContent || !cartTotal) return;


    // EMPTY CART

    if (shoppingCart.length === 0) {

        cartContent.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add sustainable products to your cart
                    to see them here.
                </p>

                <a href="products.html"
                   class="cart-shop-btn">
                    Explore Products
                </a>

            </div>
        `;

        cartTotal.textContent = "₹0";

        updateCartCount();

        return;
    }


    let total = 0;

    cartContent.innerHTML = "";


    // CREATE CART ITEMS

    shoppingCart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-product-item";


        cartItem.innerHTML = `

            <div class="cart-product-info">

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-product-price">
                    ₹${item.price} each
                </p>


                <div class="cart-quantity-selector">

                    <button
                        type="button"
                        class="cart-minus"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="cart-plus"
                        data-index="${index}">
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="cart-remove-btn"
                    data-index="${index}">
                    Remove
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;


        cartContent.appendChild(cartItem);

    });


    // UPDATE TOTAL

    cartTotal.textContent =
        "₹" + total;


    // =====================================
    // CART PLUS BUTTONS
    // =====================================

    cartContent
        .querySelectorAll(".cart-plus")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );

                    shoppingCart[index].quantity++;
                    updateCartSidebar();
                    updateCartCount();

                    localStorage.setItem(
                        "srijaShoppingCart",
                        JSON.stringify(shoppingCart)
                    );

                }
            );

        });


    // =====================================
    // CART MINUS BUTTONS
    // =====================================

    cartContent
        .querySelectorAll(".cart-minus")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    if (
                        shoppingCart[index].quantity > 1
                    ) {

                        shoppingCart[index].quantity--;

                    } else {

                        shoppingCart.splice(
                            index,
                            1
                        );

                    }


                  updateCartSidebar();
                updateCartCount();

                localStorage.setItem(
                    "srijaShoppingCart",
                    JSON.stringify(shoppingCart)
                );
                }
            );

        });


    // =====================================
    // REMOVE BUTTONS
    // =====================================

    cartContent
        .querySelectorAll(".cart-remove-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    shoppingCart.splice(
                        index,
                        1
                    );


                    updateCartSidebar();

                    updateCartCount();
                    localStorage.setItem(
                        "srijaShoppingCart",
                        JSON.stringify(shoppingCart)
                    );
                }
            );

        });

}




// =========================================
// WISHLIST
// =========================================

document.querySelectorAll(".product-wishlist-btn")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const card =
                button.closest(".shop-product-card");

            if (!card) return;


            const productId =
                card.getAttribute("data-product-id");

            const productName =
                card.getAttribute("data-product-name");

            const productPrice =
                Number(
                    card.getAttribute("data-product-price")
                );


            const existing =
                wishlistItems.find(function (item) {

                    return item.id === productId;

                });


            if (existing) {

                // Remove from wishlist

                wishlistItems =
                    wishlistItems.filter(function (item) {

                        return item.id !== productId;

                    });

                button.textContent = "♡";

            } else {

                // Add to wishlist

                wishlistItems.push({

                    id: productId,
                    name: productName,
                    price: productPrice

                });

                button.textContent = "♥";

            }


            updateWishlistCount();

            updateWishlistSidebar();

        });

    });


// =========================================
// UPDATE WISHLIST COUNT
// =========================================

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (!wishlistCount) return;

    wishlistCount.textContent =
        wishlistItems.length;

}


// =========================================
// UPDATE WISHLIST SIDEBAR
// =========================================

function updateWishlistSidebar() {

    const wishlistContent =
        document.getElementById("wishlistContent");

    if (!wishlistContent) return;


    if (wishlistItems.length === 0) {

        wishlistContent.innerHTML = `

            <div class="empty-wishlist">

                <div class="empty-wishlist-icon">
                    ♡
                </div>

                <h3>
                    Your wishlist is empty
                </h3>

                <p>
                    Save your favourite sustainable
                    products here for later.
                </p>

                <a href="products.html"
                   class="wishlist-shop-btn">
                    Explore Products
                </a>

            </div>

        `;

        return;

    }


    wishlistContent.innerHTML = "";


    wishlistItems.forEach(function (item) {

        const wishlistItem =
            document.createElement("div");

        wishlistItem.className =
            "wishlist-product-item";


        wishlistItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>

            <button
                type="button"
                class="wishlist-remove-btn"
                data-id="${item.id}">
                ×
            </button>

        `;


        wishlistContent.appendChild(
            wishlistItem
        );

    });


    // Remove buttons

    document.querySelectorAll(
        ".wishlist-remove-btn"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    button.getAttribute("data-id");

                wishlistItems =
                    wishlistItems.filter(
                        function (item) {

                            return item.id !== id;

                        }
                    );


                // Reset product heart

                document
                    .querySelectorAll(
                        ".shop-product-card"
                    )
                    .forEach(function (card) {

                        if (
                            card.getAttribute(
                                "data-product-id"
                            ) === id
                        ) {

                            const heart =
                                card.querySelector(
                                    ".product-wishlist-btn"
                                );

                            if (heart) {
                                heart.textContent = "♡";
                            }

                        }

                    });


                updateWishlistCount();

                updateWishlistSidebar();

            }
        );

    });

}
// =========================================
// CHECKOUT ORDER SUMMARY
// =========================================

const checkoutOrderItems =
    document.getElementById("checkoutOrderItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

if (checkoutOrderItems && checkoutTotal) {

    const checkoutCart =
        JSON.parse(
            localStorage.getItem("srijaShoppingCart")
        ) || [];

    if (checkoutCart.length === 0) {

        checkoutOrderItems.innerHTML = `
            <div class="checkout-order-item">
                <h3>Your cart is empty</h3>
                <p>Please add products before checkout.</p>
            </div>
        `;

        checkoutTotal.textContent = "₹0";

    } else {

        let total = 0;

        checkoutOrderItems.innerHTML = "";

        checkoutCart.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            const orderItem =
                document.createElement("div");

            orderItem.className =
                "checkout-order-item";

            orderItem.innerHTML = `
                <h3>${item.name}</h3>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

                <strong>
                    ₹${itemTotal}
                </strong>
            `;

            checkoutOrderItems.appendChild(orderItem);

        });

        checkoutTotal.textContent =
            "₹" + total;
    }
}
// =========================================
// CHECKOUT ORDER SUBMISSION
// =========================================

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const checkoutCart =
            JSON.parse(
                localStorage.getItem("srijaShoppingCart")
            ) || [];

        if (checkoutCart.length === 0) {

            alert("Your cart is empty. Please add a product first.");
            return;

        }
        const deliveryArea =
    document.getElementById("deliveryArea").value;


for (const item of checkoutCart) {

    if (
        item.id === "biopot-with-plant" &&
        item.quantity < 10
    ) {
        alert(
            "Biopot with Plant requires a minimum order of 10."
        );
        return;
    }

    if (
        item.id === "empty-biopot" &&
        item.quantity < 101
    ) {
        alert(
            "Empty Biopot requires a minimum order of 101."
        );
        return;
    }

    if (
        item.id === "eco-ganesha" &&
        deliveryArea === "Outside 50 km of Gadwal" &&
        item.quantity < 5
    ) {
        alert(
            "For Eco-Friendly Ganesha orders outside 50 km of Gadwal, the minimum quantity is 5."
        );
        return;
    }
}

        const name =
            document.getElementById("customerName").value;

        const phone =
            document.getElementById("customerPhone").value;

        const email =
            document.getElementById("customerEmail").value;

        const address =
            document.getElementById("customerAddress").value;


        const message =
            document.getElementById("customerMessage").value;


        let total = 0;

        let orderDetails = "";

        checkoutCart.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            orderDetails +=
                item.name +
                " | Quantity: " +
                item.quantity +
                " | ₹" +
                item.price +
                " each | Total: ₹" +
                itemTotal +
                "\n";
        });


        const formData = new FormData();

        formData.append(
            "access_key",
            "71831565-eb99-40b2-9b47-d5cd59218b4b"
        );

        formData.append(
            "subject",
            "New Order - Srija Green Galaxy"
        );

        formData.append(
            "from_name",
            "Srija Green Galaxy Website"
        );

        formData.append(
            "name",
            name
        );

        formData.append(
            "phone",
            phone
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "address",
            address
        );

        formData.append(
            "delivery_area",
            deliveryArea
        );

        formData.append(
            "order_details",
            orderDetails
        );

        formData.append(
            "total_amount",
            "₹" + total
        );

        formData.append(
            "message",
            message
        );


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


            if (result.success) {

    // Clear the cart
    localStorage.removeItem(
        "srijaShoppingCart"
    );

    // Reset the checkout form
    checkoutForm.reset();

    // Show designed success popup
    const orderPopup =
        document.getElementById("orderSuccessPopup");

    if (orderPopup) {

        orderPopup.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}else {

                alert(
                    "Order could not be submitted. Please try again."
                );

                console.log(result);
            }

        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong. Please try again."
            );
        }

    });

}
// =========================================
// ORDER SUCCESS POPUP
// =========================================

const orderPopup =
    document.getElementById("orderSuccessPopup");

const closeOrderPopup =
    document.getElementById("closeOrderPopup");

if (closeOrderPopup) {

    closeOrderPopup.addEventListener("click", function () {

        orderPopup.classList.remove("show");

        document.body.style.overflow = "";

    });

}
/* =====================================================
   BENEFIT CARDS
   CONTINUOUS AUTOMATIC UPWARD SCROLL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const panel =
        document.querySelector(".benefits-scroll-panel");

    if (!panel) return;


    let autoScrolling = true;
    let resumeTimer = null;

    // Automatic movement speed
    const autoSpeed = 0.45;


    // IMPORTANT:
    // Disable CSS smooth scrolling for JavaScript animation.
    panel.style.scrollBehavior = "auto";


    function automaticScroll() {

        if (autoScrolling) {

            const maxScroll =
                panel.scrollHeight -
                panel.clientHeight;


            /*
             * Move upward continuously
             */
            if (panel.scrollTop < maxScroll) {

                panel.scrollTop += autoSpeed;

            }


            /*
             * Reached the bottom
             * → immediately restart from top
             */
            else {

                panel.scrollTop = 0;

            }

        }


        requestAnimationFrame(
            automaticScroll
        );

    }


    // Start automatic movement
    automaticScroll();


    /* =================================================
       MANUAL MOUSE WHEEL
    ================================================= */

    panel.addEventListener(
        "wheel",
        function () {

            // Pause automatic movement
            autoScrolling = false;

            clearTimeout(resumeTimer);


            /*
             * After user stops scrolling for 2 seconds,
             * automatic UP movement starts again.
             */
            resumeTimer = setTimeout(
                function () {

                    autoScrolling = true;

                },
                2000
            );

        },
        { passive: true }
    );

});
/* =====================================================
   MACHINERY SLIDER
===================================================== */

const machineryData = [

    {
        image: "assets/images/machinary/peenuts.png",
        stage: "01",
        category: "RAW MATERIAL",
        title: "Groundnut Shell Collection",
        subtitle: "Raw Material Collection",

        description1:
            "Groundnut shells are collected from farmers and local agricultural sources.",

        description2:
            "This helps convert an underutilized agricultural residue into a useful raw material for sustainable products.",

        stat1: "—",
        statLabel1: "COLLECTION CAPACITY",

        stat2: "—",
        statLabel2: "DAILY INPUT"
    },

    {
        image: "assets/images/machinary/machinary-2.png",
        stage: "02",
        category: "PROCESSING",
        title: "Shell Processing",
        subtitle: "Preparing the Raw Material",

        description1:
            "The collected groundnut shells are processed to prepare them for the next stage of production.",

        description2:
            "This stage helps achieve the required material consistency for manufacturing sustainable products.",

        stat1: "—",
        statLabel1: "PROCESSING CAPACITY",

        stat2: "—",
        statLabel2: "DAILY INPUT"
    },

    {
        image: "assets/images/machinary/machinary-3.png",
        stage: "03",
        category: "MATERIAL PREPARATION",
        title: "Material Preparation",
        subtitle: "Preparing the Biomass",

        description1:
            "Processed groundnut shells are prepared for further production using suitable machinery.",

        description2:
            "The prepared biomass is then moved toward the product manufacturing stage.",

        stat1: "—",
        statLabel1: "MATERIAL CAPACITY",

        stat2: "—",
        statLabel2: "DAILY INPUT"
    },

    {
        image: "assets/images/machinary/machinary-4.png",
        stage: "04",
        category: "MIXING & FORMULATION",
        title: "Material Mixing",
        subtitle: "Production Preparation",

        description1:
            "The processed material is mixed and prepared according to the requirements of the final product.",

        description2:
            "This stage supports consistent quality during the manufacturing process.",

        stat1: "—",
        statLabel1: "MIXING CAPACITY",

        stat2: "—",
        statLabel2: "DAILY INPUT"
    },

    {
        image: "assets/images/machinary/machinary-5.png",
        stage: "05",
        category: "PRODUCT MANUFACTURING",
        title: "Biopot Manufacturing",
        subtitle: "Sustainable Product Production",

        description1:
            "Prepared groundnut-shell material is converted into biodegradable products such as Biopots.",

        description2:
            "The finished products provide an alternative to conventional plastic nursery containers.",

        stat1: "—",
        statLabel1: "PRODUCTION CAPACITY",

        stat2: "10,000+",
        statLabel2: "BIOPOTS / MONTH"
    }

];
let machineryIndex = 0;

let machineryAutoTimer = null;

const machineryMainImage =
    document.getElementById("machineryMainImage");

const machineryStage =
    document.getElementById("machineryStage");

const machineryCategory =
    document.getElementById("machineryCategory");

const machineryImageTitle =
    document.getElementById("machineryImageTitle");

const machineryCurrent =
    document.getElementById("machineryCurrent");

const machineryContentStage =
    document.getElementById("machineryContentStage");

const machineryContentTitle =
    document.getElementById("machineryContentTitle");

const machineryContentSubtitle =
    document.getElementById("machineryContentSubtitle");

const machineryDescription1 =
    document.getElementById("machineryDescription1");

const machineryDescription2 =
    document.getElementById("machineryDescription2");

const machineryStat1 =
    document.getElementById("machineryStat1");

const machineryStatLabel1 =
    document.getElementById("machineryStatLabel1");

const machineryStat2 =
    document.getElementById("machineryStat2");

const machineryStatLabel2 =
    document.getElementById("machineryStatLabel2");

const machineryFooterNumber =
    document.getElementById("machineryFooterNumber");

const machineryProgress =
    document.getElementById("machineryProgress");

const machineryPrev =
    document.getElementById("machineryPrev");

const machineryNext =
    document.getElementById("machineryNext");

const machineryImagePanel =
    document.querySelector(".machinery-image-panel");


/* =====================================================
   CREATE PROGRESS DOTS
===================================================== */

if (machineryProgress) {

    machineryProgress.innerHTML = "";

    machineryData.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.className = "machinery-dot";

        dot.setAttribute(
            "aria-label",
            "Go to machinery stage " + (index + 1)
        );

        dot.addEventListener("click", function () {

            machineryIndex = index;

            updateMachinery();

            restartMachineryAuto();

        });

        machineryProgress.appendChild(dot);

    });

}


/* =====================================================
   UPDATE MACHINERY CONTENT
===================================================== */

function updateMachinery() {

    const item = machineryData[machineryIndex];

    if (!item) return;


    /* IMAGE */

    if (machineryMainImage) {

        machineryMainImage.style.opacity = "0";

        setTimeout(() => {

            machineryMainImage.src = item.image;

            machineryMainImage.alt = item.title;

            machineryMainImage.style.opacity = "1";

        }, 180);

    }


    /* IMAGE SIDE */

    if (machineryStage)
        machineryStage.textContent = item.stage;

    if (machineryCategory)
        machineryCategory.textContent = item.category;

    if (machineryImageTitle)
        machineryImageTitle.textContent = item.title;

    if (machineryCurrent)
        machineryCurrent.textContent = item.stage;


    /* CONTENT SIDE */

    if (machineryContentStage)
        machineryContentStage.textContent = item.stage;

    if (machineryContentTitle)
        machineryContentTitle.textContent = item.title;

    if (machineryContentSubtitle)
        machineryContentSubtitle.textContent = item.subtitle;

    if (machineryDescription1)
        machineryDescription1.textContent = item.description1;

    if (machineryDescription2)
        machineryDescription2.textContent = item.description2;


    /* STATS */

    if (machineryStat1)
        machineryStat1.textContent = item.stat1;

    if (machineryStatLabel1)
        machineryStatLabel1.textContent = item.statLabel1;

    if (machineryStat2)
        machineryStat2.textContent = item.stat2;

    if (machineryStatLabel2)
        machineryStatLabel2.textContent = item.statLabel2;


    /* FOOTER */

    if (machineryFooterNumber)
        machineryFooterNumber.textContent = item.stage;


    /* PROGRESS DOTS */

    if (machineryProgress) {

        const dots =
            machineryProgress.querySelectorAll(".machinery-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === machineryIndex
            );

        });

    }

}


/* =====================================================
   NEXT
===================================================== */

function machineryNextSlide() {

    machineryIndex++;

    if (machineryIndex >= machineryData.length) {

        machineryIndex = 0;

    }

    updateMachinery();

    restartMachineryAuto();

}


/* =====================================================
   PREVIOUS
===================================================== */

function machineryPreviousSlide() {

    machineryIndex--;

    if (machineryIndex < 0) {

        machineryIndex = machineryData.length - 1;

    }

    updateMachinery();

    restartMachineryAuto();

}


/* =====================================================
   BUTTON EVENTS
===================================================== */

if (machineryNext) {

    machineryNext.addEventListener(
        "click",
        machineryNextSlide
    );

}


if (machineryPrev) {

    machineryPrev.addEventListener(
        "click",
        machineryPreviousSlide
    );

}


/* =====================================================
   AUTOMATIC SLIDER
   CHANGE EVERY 2 SECONDS
===================================================== */

function startMachineryAuto() {

    clearInterval(machineryAutoTimer);

    machineryAutoTimer = setInterval(() => {

        machineryIndex++;

        if (machineryIndex >= machineryData.length) {

            machineryIndex = 0;

        }

        updateMachinery();

    }, 2000);

}


function stopMachineryAuto() {

    clearInterval(machineryAutoTimer);

    machineryAutoTimer = null;

}


function restartMachineryAuto() {

    stopMachineryAuto();

    startMachineryAuto();

}


/* =====================================================
   PAUSE WHEN MOUSE IS OVER IMAGE
===================================================== */

if (machineryImagePanel) {

    machineryImagePanel.addEventListener(
        "mouseenter",
        stopMachineryAuto
    );


    machineryImagePanel.addEventListener(
        "mouseleave",
        startMachineryAuto
    );

}


/* =====================================================
   INITIAL LOAD
===================================================== */

updateMachinery();

startMachineryAuto();

/* =====================================================
   HOME PRODUCT PREVIEW SLIDERS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const previewSliders = document.querySelectorAll(
        ".preview-slider-track"
    );

    previewSliders.forEach(function (slider) {

        const slides = slider.querySelectorAll(".preview-slide");

        if (!slides.length) return;

        let currentSlide = 0;

        function showSlide() {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            slider.style.transform =
                "translateX(-" + (currentSlide * 20) + "%)";
        }

        setInterval(showSlide, 2500);

    });

});
/* =========================================================
   WHAT WE CREATE - SINGLE GRID IMAGE SLIDESHOW
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    function createImageSlider(sliderId, dotsId) {

        const slider = document.getElementById(sliderId);
        const dotsContainer = document.getElementById(dotsId);

        if (!slider || !dotsContainer) return;

        const slides = slider.querySelectorAll(".create-slide");
        const dots = dotsContainer.querySelectorAll("span");

        let current = 0;

        function showSlide(index) {

            slides.forEach(function (slide) {
                slide.classList.remove("active");
            });

            dots.forEach(function (dot) {
                dot.classList.remove("active");
            });

            slides[index].classList.add("active");
            dots[index].classList.add("active");

            current = index;
        }


        function nextSlide() {

            current++;

            if (current >= slides.length) {
                current = 0;
            }

            showSlide(current);
        }


        /* Automatically change image */

        const timer = setInterval(nextSlide, 2500);


        /* Dot click */

        dots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {

                showSlide(index);

            });

        });


        /* Start with first image */

        showSlide(0);

    }


    /* BIOPOTS */

    createImageSlider(
        "biopotSlider",
        "biopotDots"
    );


    /* VINAYAKA */

    createImageSlider(
        "ganeshaSlider",
        "ganeshaDots"
    );

});