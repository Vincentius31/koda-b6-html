$(document).ready(function () {
  console.log('login.js running');

  const navAuth = $('#navAuth');
  if (!navAuth.length) return;

  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (user) {
    navAuth.html(`
      <a href="#" class="hover:text-orange-400 transition">
        <img src="img/icon/Search.png" alt="Bag" class="w-5 h-5">
      </a>

      <a href="checkout-product.html" class="hover:text-orange-400 transition">
          <img src="img/icon/ShoppingCart.png" alt="Cart" class="w-5 h-5">
      </a>
      
      <a href="profile.html"
        class="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 transition">
        Profile
      </a>

      <button id="btnLogout"
        class="bg-red-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-600 transition">
        Logout
      </button>
    `);

    $('#btnLogout').on('click', function () {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    });

  } else {
    navAuth.html(`
      <a href="login.html"
        class="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 transition">
        Sign In
      </a>

      <a href="register.html"
        class="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-600 transition">
        Sign Up
      </a>
    `);
  }
});
