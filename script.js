const products = [
  // Coffee
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    price: 3.99,
    image: "https://blogstudio.s3.theshoppad.net/coffeeheroau/ec178d83e5f597b162cda1e60cb64194.jpg",
    description: "Strong coffee shot",
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Coffee",
    price: 4.99,
    image: "https://www.livingnorth.com/images/media/articles/food-and-drink/eat-and-drink/coffee.png?",
    description: "Coffee with milk foam",
  },
  {
    id: 3,
    name: "Latte",
    category: "Coffee",
    price: 4.99,
    image: "https://staresso.com/cdn/shop/articles/What_is_a_latte.jpg?v=1716606481",
    description: "Coffee with steamed milk",
  },
  {
    id: 4,
    name: "Americano",
    category: "Coffee",
    price: 3.99,
    image: "https://fibercreme.com/wp-content/uploads/2024/10/Header.jpg",
    description: "Coffee with hot water",
  },
  {
    id: 5,
    name: "Mocha",
    category: "Coffee",
    price: 5.49,
    image: "https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/the_perfect_mocha_coffee_29100_16x9.jpg.webp",
    description: "Coffee with chocolate",
  },
  // Cakes
  {
    id: 6,
    name: "Chocolate Cake",
    category: "Cakes",
    price: 5.99,
    image: "https://cambreabakes.com/wp-content/uploads/2024/05/chocolate-raspberry-cake-featured.jpg",
    description: "Rich chocolate cake",
  },
  {
    id: 7,
    name: "Cheesecake",
    category: "Cakes",
    price: 5.99,
    image: "https://www.seriouseats.com/thmb/Mykce8jNBk43y7fKyIjaPm2BB58=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2017__06__20170526-no-bake-cheesecake-vicky-wasik-18-89991c64ba544e19bc05c774c499438c.jpg",
    description: "Creamy cheesecake",
  },
  {
    id: 8,
    name: "Carrot Cake",
    category: "Cakes",
    price: 5.99,
    image: "https://static01.nyt.com/images/2020/11/01/dining/Carrot-Cake-textless/Carrot-Cake-textless-videoSixteenByNineJumbo1600.jpg",
    description: "Moist carrot cake",
  },
  {
    id: 9,
    name: "Red Velvet",
    category: "Cakes",
    price: 6.49,
    image: "https://img.freepik.com/premium-photo/slice-red-velvet-cake-with-fresh-strawberries-delicious-layered-dessert_102556-1984.jpg",
    description: "Classic red velvet cake",
  },
  // Snacks
  {
    id: 10,
    name: "Croissant",
    category: "Snacks",
    price: 2.99,
    image: "https://thefoodiebunch.com/wp-content/uploads/2022/08/The-Perfect-Croissant-Recipe.png",
    description: "Buttery croissant",
  },
  {
    id: 11,
    name: "Sandwich",
    category: "Snacks",
    price: 6.99,
    image: "https://images.arla.com/recordid/15F33607-F6D9-4952-B6AA210D3033BF14/club-sandwich1.jpg?format=jpg&width=1200&height=630&mode=crop",
    description: "Fresh sandwich",
  },
  {
    id: 12,
    name: "Muffin",
    category: "Snacks",
    price: 3.49,
    image: "https://www.giallozafferano.com/images/269-26998/Chocolate-Chip-Muffins_650x433_wm.jpg",
    description: "Freshly baked muffin",
  },
  {
    id: 13,
    name: "Cookies",
    category: "Snacks",
    price: 2.49,
    image: "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2022/02/Chocolate-chip-cookies-14.jpg",
    description: "Homemade cookies",
  },
  {
    id: 14,
    name: "Brownie",
    category: "Snacks",
    price: 3.99,
    image: "https://www.allrecipes.com/thmb/Bf_v7CGEIk1T0KOYsBeGdcs56Lo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-9599-Quick-Easy-Brownies-ddmfs-4x3-697df57aa40a45f8a7bdb3a089eee2e5.jpg",
    description: "Chocolate brownie",
  },
];

// These variables must be declared globally
let activeCategory = 'All';
let searchQuery = '';
let cart = [];
let currentSlide = 0;
let slideInterval;
const totalSlides = 2;

$(document).ready(function () {
  showProducts();
  setupEvents();
  setupSmoothScroll();
  startSlider();
  setupSliderControls();
});

function showProducts() {
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  $('#products-grid').empty();

  if (filteredProducts.length === 0) {
    $('#no-products').removeClass('hidden');
  } else {
    $('#no-products').addClass('hidden');
    filteredProducts.forEach(product => {
      $('#products-grid').append(`
        <div class="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
          <img src="${product.image}" alt="${product.name}" class="object-cover w-full h-72">
          <div class="p-4">
            <h3 class="mb-2 text-xl font-bold">${product.name}</h3>
            <p class="mb-2 text-gray-600">${product.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-orange-600">$${product.price.toFixed(2)}</span>
              <button class="px-4 py-2 text-white transition-colors bg-orange-600 rounded add-to-cart hover:bg-orange-700" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `);
    });
  }
}

function updateCartCounts() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 0) {
    $('#cart-count, #cart-count-mobile').text(totalItems).removeClass('hidden');
  } else {
    $('#cart-count, #cart-count-mobile').addClass('hidden');
  }
}

function updateCart() {
  let $cartItemsContainer = $('#cart-items');
  $cartItemsContainer.empty();

  let total = 0;

  if (cart.length === 0) {
    $('#empty-cart-message').removeClass('hidden');
    $('#cart-footer').addClass('hidden');
  } else {
    $('#empty-cart-message').addClass('hidden');
    $('#cart-footer').removeClass('hidden');

    cart.forEach(function(item) {
      total += item.price * item.quantity;

      let cartItemHTML = `
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 mr-4 rounded object-cover">
            <div>
              <h4 class="text-lg font-semibold">${item.name}</h4>
              <p class="text-sm text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
              <div class="flex items-center mt-1 space-x-2">
                <button class="decrease-qty px-2 py-1 text-sm bg-gray-200 rounded" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-qty px-2 py-1 text-sm bg-gray-200 rounded" data-id="${item.id}">+</button>
              </div>
            </div>
          </div>
          <button class="remove-item text-red-500" data-id="${item.id}">&times;</button>
        </div>
      `;
      $cartItemsContainer.append(cartItemHTML);
    });
  }

  $('#cart-total').text(`$${total.toFixed(2)}`);
  updateCartCounts();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  openCart();
}

function openCart() {
  $('#cart-panel').addClass('open');
  $('#cart-overlay').removeClass('hidden');
}

function closeCart() {
  $('#cart-panel').removeClass('open');
  $('#cart-overlay').addClass('hidden');
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 4000);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function showSlide(slideIndex) {
  $('.slide').removeClass('opacity-100').addClass('opacity-0');
  $('.slide').eq(slideIndex).removeClass('opacity-0').addClass('opacity-100');
  $('.slide-indicator').removeClass('bg-white').addClass('bg-white bg-opacity-50');
  $('.slide-indicator').eq(slideIndex).removeClass('bg-opacity-50').addClass('bg-white');
  currentSlide = slideIndex;
}

function setupEvents() {
  $('#cart-btn').click(openCart);
  $('#close-cart, #cart-overlay, #continue-shopping').click(closeCart);

  $('.category-btn').click(function () {
    activeCategory = $(this).data('category');
    $('.category-btn').removeClass('bg-orange-600 text-white').addClass('bg-gray-200 text-gray-700');
    $(this).removeClass('bg-gray-200 text-gray-700').addClass('bg-orange-600 text-white');
    showProducts();
  });

  $('#menu-search').on('input', function () {
    searchQuery = $(this).val();
    showProducts();
  });

  $(document).on('click', '.add-to-cart', function () {
    addToCart(parseInt($(this).data('id')));
  });

  $(document).on('click', '.increase-qty', function () {
    const productId = parseInt($(this).data('id'));
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
      updateCart();
    }
  });

  $(document).on('click', '.decrease-qty', function () {
    const productId = parseInt($(this).data('id'));
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      updateCart();
    }
  });

  $(document).on('click', '.remove-item', function () {
    const productId = parseInt($(this).data('id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  });

  $('#clear-cart').click(function () {
    cart = [];
    updateCart();
  });

  $('#checkout-btn').click(function () {
    alert('Thank you for your order! Total: ' + $('#cart-total').text());
    cart = [];
    updateCart();
    closeCart();
  });

  $('#contact-form').submit(function (e) {
    e.preventDefault();
    $('#form-success').removeClass('hidden');
    this.reset();
    setTimeout(() => $('#form-success').addClass('hidden'), 3000);
  });

  // Mobile events
  $('#mobile-menu-btn').click(() => $('#mobile-menu').toggleClass('hidden'));
  $('.mobile-nav-link').click(() => $('#mobile-menu').addClass('hidden'));
  $('#cart-btn-mobile').click(openCart);
}

function setupSliderControls() {
  $('#prev-slide').click(() => {
    clearInterval(slideInterval);
    prevSlide();
    startSlider();
  });

  $('#next-slide').click(() => {
    clearInterval(slideInterval);
    nextSlide();
    startSlider();
  });

  $('.slide-indicator').click(function () {
    clearInterval(slideInterval);
    const slideIndex = parseInt($(this).data('slide'));
    showSlide(slideIndex);
    startSlider();
  });
}

function setupSmoothScroll() {
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 800);
    }
  });
}
