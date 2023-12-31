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
  });
});
