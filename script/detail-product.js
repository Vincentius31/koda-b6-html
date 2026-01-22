const API_URL =
  "https://raw.githubusercontent.com/Vincentius31/koda-b6-html/refs/heads/main/data/menu.json";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
}

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function createProductDetail(product) {
  const grid = document.createElement("div");
  grid.classList.add("product-grid");

  const images = document.createElement("div");
  images.classList.add("product-images");

  const mainImg = document.createElement("img");
  mainImg.classList.add("main-img");
  mainImg.src = product.img.imageDepan;
  mainImg.alt = product.nameProduct;

  const thumbs = document.createElement("div");
  thumbs.classList.add("thumbs");

  const thumbList = [
    product.img.imageKedua,
    product.img.imageKetiga,
    product.img.imageKeempat,
  ];

  thumbList.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;

    img.addEventListener("click", () => {
      mainImg.src = src;
    });

    thumbs.appendChild(img);
  });

  images.appendChild(mainImg);
  images.appendChild(thumbs);

  const info = document.createElement("div");
  info.classList.add("product-info");

  const badge = document.createElement("span");
  badge.classList.add("badge-sale");
  badge.textContent = "FLASH SALE!";

  const title = document.createElement("h1");
  title.textContent = product.nameProduct;

  const price = document.createElement("div");
  price.classList.add("price");

  const oldPrice = document.createElement("span");
  oldPrice.classList.add("old");
  oldPrice.textContent = formatRupiah(product.priceProduct);

  const newPrice = document.createElement("span");
  newPrice.classList.add("new");
  newPrice.textContent = formatRupiah(product.priceDiscount);

  price.appendChild(oldPrice);
  price.appendChild(newPrice);

  const rating = document.createElement("div");
  rating.classList.add("rating");

  const star = document.createElement("img");
  star.src = "img/Frame 41.png";

  rating.appendChild(star);

  const review = document.createElement("p");
  review.classList.add("review");
  review.textContent = "200+ Review | Recommendation 👍";

  const desc = document.createElement("p");
  desc.classList.add("desc");
  desc.textContent = product.description;

  const qty = document.createElement("div");
  qty.className = "qty";

  const btnMinus = document.createElement("button");
  btnMinus.textContent = "-";

  const qtyValue = document.createElement("span");
  qtyValue.textContent = "1";

  const btnPlus = document.createElement("button");
  btnPlus.textContent = "+";

  let quantity = 1;

  btnPlus.addEventListener("click", () => {
    quantity++;
    qtyValue.textContent = quantity;
  });

  btnMinus.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
    }
  });

  qty.append(btnMinus, qtyValue, btnPlus);

const sizeOption = createToggleOption("Choose Size", [
  "Regular",
  "Medium",
  "Large",
]);

const tempOption = createToggleOption("Hot / Ice?", [
    "Ice", 
    "Hot"
]);

  function createToggleOption(titleText, options) {
  const wrapper = document.createElement("div");

  const title = document.createElement("h4");
  title.textContent = titleText;

  const optionWrapper = document.createElement("div");
  optionWrapper.className = "option";

  let selectedValue = options[0];

  options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.textContent = text;

    if (index === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      optionWrapper
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      selectedValue = text;
    });

    optionWrapper.appendChild(btn);
  });

  wrapper.append(title, optionWrapper);

  return {
    element: wrapper,
    getValue: () => selectedValue,
  };
}

  const action = document.createElement("div");
  action.classList.add("action");

  const buyBtn = document.createElement("button");
  buyBtn.classList.add("buy");
  buyBtn.textContent = "Buy";

  const cartBtn = document.createElement("button");
  cartBtn.classList.add("cart");
  cartBtn.textContent = "🛒 add to cart";

  action.appendChild(buyBtn);
  action.appendChild(cartBtn);

  info.appendChild(badge);
  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(rating);
  info.appendChild(review);
  info.appendChild(desc);
  info.appendChild(qty);
  info.appendChild(sizeOption.element);
  info.appendChild(tempOption.element);
  info.appendChild(action);

  grid.appendChild(images);
  grid.appendChild(info);

  return grid;
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product-detail");
  const productId = getProductIdFromURL();

  if (!productId) {
    container.textContent = "Product tidak ditemukan";
    return;
  }

  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    const product = products.find((p) => p.id === productId);

    if (!product) {
      container.textContent = "Product tidak ditemukan";
      return;
    }

    container.appendChild(createProductDetail(product));
  } catch (error) {
    console.error(error);
    container.textContent = "Gagal memuat data produk";
  }
});

cartBtn.addEventListener("click", () => {
  const cart = getCart();

  const cartItem = {
    id: product.id,
    name: product.nameProduct,
    price: Number(product.priceDiscount || product.priceProduct),
    image: product.img.imageDepan,
    qty: quantity,
    size: sizeOption.getValue(),
    temperature: tempOption.getValue(),
  };

  const existingItem = cart.find(
    (item) =>
      item.id === cartItem.id &&
      item.size === cartItem.size &&
      item.temperature === cartItem.temperature
  );

  if (existingItem) {
    existingItem.qty += cartItem.qty;
  } else {
    cart.push(cartItem);
  }

  saveCart(cart);
  alert("Produk berhasil ditambahkan ke cart 🛒");
});

const basePrice = Number(product.priceDiscount || product.priceProduct);

function updateTotalPrice() {
  const total = basePrice * quantity;
  newPrice.textContent = `IDR ${total.toLocaleString("id-ID")}`;
}

updateTotalPrice();

btnPlus.addEventListener("click", () => {
  quantity++;
  qtyValue.textContent = quantity;
  updateTotalPrice();
});

btnMinus.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qtyValue.textContent = quantity;
    updateTotalPrice();
  }
});


