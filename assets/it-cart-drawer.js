// open Cart Drawer
function openCartDrawer() {
  document.querySelector(".it-cart-drawer").classList.add("drawer_active");
}
// Close Cart Drawer
function closeCartDrawer() {
  document.querySelector(".it-cart-drawer").classList.remove("drawer_active");
}

// Update cart count
function updateCartItemCounts(count) {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

async function updateCartDrawer() {
  const res = await fetch("/?section_id=cart-drawer");
  const text = await res.text();
  const html = document.createElement("div");
  html.innerHTML = text;

  const newBox = html.querySelector(".cart-drawer").innerHTML;

  document.querySelector(".cart-drawer").innerHTML = newBox;

  addCartDrawerListeners();
}
