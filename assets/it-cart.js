// querySelectorAll()
// Select all elements with class (inside the class all elements are selected)

const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
// console.log(addToCartForms);
addToCartForms.forEach((form) => {
  // console.log(form);
  form.addEventListener("submit", async (event) => {
    // check which event calling
    // console.log(event);
    // Prevent normal submission
    event.preventDefault();

    // Submit form with ajax
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form),
    });

    // Get new cart object
    const res = await fetch("/cart.json");
    const cartIt = await res.json();
    // check JSON file data
    // console.log(cartIt);

    // Update cart count (number of items in the cart )
    document.querySelectorAll(".cart-count-it").forEach((cartcount) => {
      // check which event calling ( it contain cart-count-it div)
      // console.log(cartcount);
      cartcount.textContent = cartIt.item_count;
      // check number of items in the cart
      console.log(cartcount.textContent);
    });

    // manually display message
    // form.querySelector(".it-cart-added-success").classList.add("active");

    // Display message using js
    const messageIt = document.createElement("p");
    messageIt.classList.add("it-quick-added-success");
    messageIt.textContent = "Added to cart! using js";
    form.appendChild(messageIt);
  });
});
