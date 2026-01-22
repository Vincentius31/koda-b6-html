const API_URL =
  "https://raw.githubusercontent.com/Vincentius31/koda-b6-html/refs/heads/main/data/menu.json";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
}

function goToDetail(productId) {
  window.location.href = `detail-product.html?id=${productId}`;
}

function createMenuCard(menu) {
  const card = document.createElement("div");
  card.classList.add("relative", "bg-transparent");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("w-full", "aspect-square", "overflow-hidden");

  const img = document.createElement("img");
  img.src = menu.img.imageDepan;
  img.alt = menu.nameProduct;
  img.classList.add("w-full", "h-full", "object-cover");

  imgWrapper.appendChild(img);

  const content = document.createElement("div");
  content.classList.add(
    "relative",
    "-mt-[65px]",
    "mx-3",
    "bg-white",
    "shadow-lg",
    "p-3",
  );

  const title = document.createElement("h3");
  title.classList.add("font-semibold", "text-lg", "mb-1");
  title.textContent = menu.nameProduct;

  const desc = document.createElement("p");
  desc.classList.add("text-sm", "text-gray-500", "mb-3");
  desc.textContent = menu.description;

  const price = document.createElement("p");
  price.classList.add("font-bold", "text-gray-800", "mb-4");

  const discount = document.createElement("span");
  discount.classList.add("text-sm", "text-orange-400","ml-2")
  discount.textContent = formatRupiah(menu.priceDiscount);

  const original = document.createElement("span");
  original.classList.add("text-sm", "text-gray-400", "line-through", "ml-2");
  original.textContent = formatRupiah(menu.priceProduct);

  price.appendChild(discount);
  price.appendChild(original);

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("flex", "items-center", "gap-3");

  const btnBuy = document.createElement("button");
  btnBuy.classList.add(
    "flex-1",
    "bg-orange-500",
    "hover:bg-orange-600",
    "text-white",
    "text-sm",
    "font-semibold",
    "py-3",
    "rounded-lg",
    "transition",
  );
  btnBuy.textContent = "Buy";
  btnBuy.addEventListener("click", () => {
    goToDetail(menu.id);
  });

  const btnCart = document.createElement("button");
  btnCart.classList.add(
    "border",
    "border-orange-500",
    "text-orange-500",
    "bg-white",
    "p-3",
    "rounded-lg",
    "hover:bg-orange-50",
    "transition",
  );

  const cartIcon = document.createElement("img");
  cartIcon.src = "img/icon/ShoppingCart-Orange.png";
  cartIcon.classList.add("w-5", "h-5");

  btnCart.appendChild(cartIcon);

  btnWrapper.appendChild(btnBuy);
  btnWrapper.appendChild(btnCart);

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(price);
  content.appendChild(btnWrapper);

  card.appendChild(imgWrapper);
  card.appendChild(content);

  return card;
}

async function loadFavouriteMenu(container) {
  try {
    const response = await fetch(API_URL);
    const menus = await response.json();

    const favouriteMenus = menus.filter(
      (menu) => menu.statusFavourite === "True",
    );

    container.innerHTML = "";

    favouriteMenus.forEach((menu) => {
      container.appendChild(createMenuCard(menu));
    });
  } catch (error) {
    console.error("Gagal mengambil data menu:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const favouriteContainer = document.getElementById("menu-favourite");

  if (!favouriteContainer) {
    console.error("Element dengan id 'menu-favourite' tidak ditemukan");
    return;
  }

  loadFavouriteMenu(favouriteContainer);
});
