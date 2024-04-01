// open Cart Drawer function
function openCartDrawer() {
  document.querySelector(".it-cart-drawer").classList.add("drawer_active");
}

// Close Cart Drawer function
function closeCartDrawer() {
  document.querySelector(".it-cart-drawer").classList.remove("drawer_active");
}

// header cart icon area
// When we click it and then open the cart drawer otherwise it redirects to the cart page
document.querySelectorAll('a[href="/cart"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    // It prevents you from going to the cart page
    e.preventDefault();
    openCartDrawer();
  });
});

// Create a function that calculates the total number of items in the shopping cart.
function updateCartItemCounts(count) {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

// when  added any cart then open cart drawer
document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  form.addEventListener("submit ", async (e) => {
    // prevent default cart to the cart drawer
    e.preventDefault();

    // Submit form with ajax
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form),
    });

    // Total cart item counts and push it updateCartItemCounts() function
    const res = await fetch("/cart.js");
    const cart = await res.json();
    // console.log(cart);
    // console.log(cart.item_count);
    updateCartItemCounts(cart.item_count);

    // Update cart
    await updateCartDrawer();

    // Open cart drawer
    openCartDrawer();
  });
});

// update cart drawer
async function updateCartDrawer() {
  const res = await fetch("/?section_id=cart-drawer");
  const text = await res.text();
  const html = document.createElement("div");
  html.innerHTML = text;

  const newBox = html.querySelector(".cart-drawer").innerHTML;

  document.querySelector(".cart-drawer").innerHTML = newBox;

  addCartDrawerListeners();
}

function addCartDrawerListeners() {
  // Update quantities
  document
    .querySelectorAll(".cart-drawer-quantity-selector button")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        // Get line item key
        const rootItem =
          button.parentElement.parentElement.parentElement.parentElement
            .parentElement;
        const key = rootItem.getAttribute("data-line-item-key");

        // Get new quantity
        const currentQuantity = Number(
          button.parentElement.querySelector("input").value
        );
        const isUp = button.classList.contains(
          "cart-drawer-quantity-selector-plus"
        );
        const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

        // Ajax update
        const res = await fetch("/cart/update.js", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates: { [key]: newQuantity } }),
        });
        const cart = await res.json();

        updateCartItemCounts(cart.item_count);

        // Update cart
        updateCartDrawer();
      });
    });

  document.querySelector(".cart-drawer-box").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document
    .querySelectorAll(".cart-drawer-header-right-close, .it-cart-drawer")
    .forEach((el) => {
      el.addEventListener("click", () => {
        //  console.log(el);
        // console.log("closing drawer");
        // this a callback function to close drawer
        closeCartDrawer();
      });
    });
}

addCartDrawerListeners();
