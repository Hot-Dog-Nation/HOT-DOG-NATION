/**
 * HOT DOG NATION — MASTER CLIENT APPLICATION
 * Tagline: "EVERY BITE FEELS ENOUGH"
 * Features: Menu Filter, Cart System, Build Your Own Customizer, WhatsApp Checkout, Lightbox
 */

(function () {
  'use strict';

  // ---------------- STATE ----------------
  const state = {
    menu: [],
    info: {},
    activeCategory: 'all',
    activeVegFilter: 'all', // 'all', 'veg', 'nonveg'
    searchQuery: '',
    cart: [],
    byo: {
      base: 'base-nonveg', // 'base-veg' or 'base-nonveg'
      sausageUpgrade: 'sausage-std',
      cheese: false,
      bacon: false,
      extraSausage: false,
      sauces: ['sauce-mayo', 'sauce-mustard', 'sauce-ketchup'],
      toppings: ['top-onions', 'top-jalapenos']
    }
  };

  // ---------------- DOM REFS ----------------
  let dom = {};

  // ---------------- INITIALIZATION ----------------
  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    loadData();
    cacheDom();
    bindEvents();
    renderRestaurantInfo();
    renderStoreStatus();
    setInterval(renderStoreStatus, 30000);
    renderBestsellers();
    renderMenu();
    updateCartUI();
    updateByoUI();
  }

  function loadData() {
    if (window.HOTDOG_NATION_DATA) {
      state.menu = window.HOTDOG_NATION_DATA.getStoredMenu();
      state.info = window.HOTDOG_NATION_DATA.getRestaurantInfo();
    }
    // Load cart from localStorage
    try {
      const storedCart = localStorage.getItem('hotdog_nation_cart');
      if (storedCart) {
        state.cart = JSON.parse(storedCart);
      }
    } catch (e) {
      console.warn('Could not read cart from storage', e);
      state.cart = [];
    }
  }

  function cacheDom() {
    dom = {
      // Navbar & Announcement
      announcementBar: document.getElementById('announcementBar'),
      cartCountBadges: document.querySelectorAll('.cart-count-badge'),
      cartTotalNav: document.getElementById('cartTotalNav'),
      cartDrawer: document.getElementById('cartDrawer'),
      cartDrawerBackdrop: document.getElementById('cartDrawerBackdrop'),
      cartDrawerPanel: document.getElementById('cartDrawerPanel'),
      cartItemsList: document.getElementById('cartItemsList'),
      cartEmptyState: document.getElementById('cartEmptyState'),
      cartFilledState: document.getElementById('cartFilledState'),
      cartSubtotalText: document.getElementById('cartSubtotalText'),
      cartDeliveryFeeText: document.getElementById('cartDeliveryFeeText'),
      cartTotalText: document.getElementById('cartTotalText'),
      openCartBtns: document.querySelectorAll('.open-cart-btn'),
      closeCartBtn: document.getElementById('closeCartBtn'),
      checkoutBtn: document.getElementById('checkoutBtn'),

      // Mobile Menu
      mobileMenuDrawer: document.getElementById('mobileMenuDrawer'),
      openMobileMenuBtn: document.getElementById('openMobileMenuBtn'),
      closeMobileMenuBtn: document.getElementById('closeMobileMenuBtn'),
      mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),

      // Dynamic Content
      bestsellersGrid: document.getElementById('bestsellersGrid'),
      menuGrid: document.getElementById('menuGrid'),
      menuItemCount: document.getElementById('menuItemCount'),
      categoryTabs: document.querySelectorAll('.category-tab-btn'),
      vegFilterBtns: document.querySelectorAll('.veg-filter-btn'),
      menuSearchInput: document.getElementById('menuSearchInput'),

      // Build Your Own Customizer
      byoBaseBtns: document.querySelectorAll('.byo-base-btn'),
      byoSausageRadios: document.querySelectorAll('input[name="byoSausage"]'),
      byoSausageContainer: document.getElementById('byoSausageContainer'),
      byoAddonCheckboxes: document.querySelectorAll('.byo-addon-cb'),
      byoSauceCheckboxes: document.querySelectorAll('.byo-sauce-cb'),
      byoToppingCheckboxes: document.querySelectorAll('.byo-topping-cb'),
      byoTotalDisplay: document.getElementById('byoTotalDisplay'),
      byoBreakdownSummary: document.getElementById('byoBreakdownSummary'),
      byoAddToCartBtn: document.getElementById('byoAddToCartBtn'),

      // BYO Visual Preview Elements
      byoVisualFrank: document.getElementById('byoVisualFrank'),
      byoVisualCheese: document.getElementById('byoVisualCheese'),
      byoVisualBacon: document.getElementById('byoVisualBacon'),
      byoVisualSauce: document.getElementById('byoVisualSauce'),
      byoVisualToppings: document.getElementById('byoVisualToppings'),

      // Checkout Modal
      checkoutModal: document.getElementById('checkoutModal'),
      closeCheckoutBtn: document.getElementById('closeCheckoutBtn'),
      checkoutForm: document.getElementById('checkoutForm'),
      orderTypeRadios: document.querySelectorAll('input[name="orderType"]'),
      deliveryAddressWrapper: document.getElementById('deliveryAddressWrapper'),
      deliveryAddressInput: document.getElementById('deliveryAddressInput'),
      checkoutModalSummary: document.getElementById('checkoutModalSummary'),
      submitWhatsAppBtn: document.getElementById('submitWhatsAppBtn'),

      // Lightbox
      lightboxModal: document.getElementById('lightboxModal'),
      lightboxImg: document.getElementById('lightboxImg'),
      lightboxCaption: document.getElementById('lightboxCaption'),
      closeLightboxBtn: document.getElementById('closeLightboxBtn'),
      galleryCards: document.querySelectorAll('.gallery-card')
    };
  }

  function bindEvents() {
    // Open/Close Cart
    dom.openCartBtns.forEach(btn => btn.addEventListener('click', openCart));
    if (dom.closeCartBtn) dom.closeCartBtn.addEventListener('click', closeCart);
    if (dom.cartDrawerBackdrop) dom.cartDrawerBackdrop.addEventListener('click', closeCart);

    // Mobile Menu
    if (dom.openMobileMenuBtn) dom.openMobileMenuBtn.addEventListener('click', openMobileMenu);
    if (dom.closeMobileMenuBtn) dom.closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    dom.mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // Category Tabs
    dom.categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dom.categoryTabs.forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
        state.activeCategory = tab.dataset.category;
        renderMenu();
      });
    });

    // Veg / Non-Veg Filter Buttons
    dom.vegFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.vegFilterBtns.forEach(b => b.classList.remove('active-pill'));
        btn.classList.add('active-pill');
        state.activeVegFilter = btn.dataset.filter;
        renderMenu();
      });
    });

    // Menu Search
    if (dom.menuSearchInput) {
      dom.menuSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderMenu();
      });
    }

    // BYO Base Selection (Veg vs Non-Veg)
    dom.byoBaseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.byoBaseBtns.forEach(b => b.classList.remove('active-base'));
        btn.classList.add('active-base');
        state.byo.base = btn.dataset.base;
        
        // Show/hide sausage options depending on veg/nonveg base
        if (state.byo.base === 'base-veg') {
          if (dom.byoSausageContainer) dom.byoSausageContainer.classList.add('opacity-40', 'pointer-events-none');
          // uncheck bacon & extra sausage if veg selected
          state.byo.bacon = false;
          state.byo.extraSausage = false;
          const baconCb = document.getElementById('cb-addon-bacon');
          const sausageCb = document.getElementById('cb-addon-extra-sausage');
          if (baconCb) { baconCb.checked = false; baconCb.disabled = true; }
          if (sausageCb) { sausageCb.checked = false; sausageCb.disabled = true; }
        } else {
          if (dom.byoSausageContainer) dom.byoSausageContainer.classList.remove('opacity-40', 'pointer-events-none');
          const baconCb = document.getElementById('cb-addon-bacon');
          const sausageCb = document.getElementById('cb-addon-extra-sausage');
          if (baconCb) baconCb.disabled = false;
          if (sausageCb) sausageCb.disabled = false;
        }

        updateByoUI();
      });
    });

    // BYO Sausage Upgrade Radios
    dom.byoSausageRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.byo.sausageUpgrade = e.target.value;
        updateByoUI();
      });
    });

    // BYO Add-ons
    dom.byoAddonCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const addonId = cb.dataset.addon;
        if (addonId === 'addon-cheese') state.byo.cheese = cb.checked;
        if (addonId === 'addon-bacon') state.byo.bacon = cb.checked;
        if (addonId === 'addon-extra-sausage') state.byo.extraSausage = cb.checked;
        updateByoUI();
      });
    });

    // BYO Sauces
    dom.byoSauceCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.value;
        if (cb.checked) {
          if (!state.byo.sauces.includes(id)) state.byo.sauces.push(id);
        } else {
          state.byo.sauces = state.byo.sauces.filter(s => s !== id);
        }
        updateByoUI();
      });
    });

    // BYO Toppings
    dom.byoToppingCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.value;
        if (cb.checked) {
          if (!state.byo.toppings.includes(id)) state.byo.toppings.push(id);
        } else {
          state.byo.toppings = state.byo.toppings.filter(t => t !== id);
        }
        updateByoUI();
      });
    });

    // Add BYO to Cart
    if (dom.byoAddToCartBtn) {
      dom.byoAddToCartBtn.addEventListener('click', addByoToCart);
    }

    // Checkout Modal
    if (dom.checkoutBtn) {
      dom.checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    if (dom.closeCheckoutBtn) {
      dom.closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    }
    dom.orderTypeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'delivery') {
          if (dom.deliveryAddressWrapper) dom.deliveryAddressWrapper.classList.remove('hidden');
          if (dom.deliveryAddressInput) dom.deliveryAddressInput.required = true;
        } else {
          if (dom.deliveryAddressWrapper) dom.deliveryAddressWrapper.classList.add('hidden');
          if (dom.deliveryAddressInput) dom.deliveryAddressInput.required = false;
        }
        updateCheckoutModalSummary();
      });
    });

    if (dom.checkoutForm) {
      dom.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    // Lightbox Gallery
    dom.galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.dataset.caption || (img ? img.alt : 'Hot Dog Nation Special');
        if (img && dom.lightboxImg) {
          dom.lightboxImg.src = img.src;
          if (dom.lightboxCaption) dom.lightboxCaption.textContent = caption;
          dom.lightboxModal.classList.remove('hidden');
          document.body.classList.add('overflow-hidden');
        }
      });
    });

    if (dom.closeLightboxBtn) {
      dom.closeLightboxBtn.addEventListener('click', closeLightbox);
    }
    if (dom.lightboxModal) {
      dom.lightboxModal.addEventListener('click', (e) => {
        if (e.target === dom.lightboxModal) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        closeCart();
        closeCheckoutModal();
      }
    });
  }

  // ---------------- STORE OPEN/CLOSED STATUS ----------------
  function renderStoreStatus() {
    if (!window.HOTDOG_NATION_DATA || !window.HOTDOG_NATION_DATA.getStoreOpenStatus) return;
    const status = window.HOTDOG_NATION_DATA.getStoreOpenStatus();

    // 1. Navbar badge
    const navStatus = document.getElementById('navStoreStatus');
    if (navStatus) {
      if (status.isOpen) {
        navStatus.className = 'hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-neutral-900 text-xs font-bold font-brand tracking-wide bg-emerald-100 text-emerald-800 retro-shadow';
        navStatus.innerHTML = `
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>OPEN NOW</span>
        `;
      } else {
        navStatus.className = 'hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-neutral-900 text-xs font-bold font-brand tracking-wide bg-red-100 text-red-800 retro-shadow';
        navStatus.innerHTML = `
          <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span>CLOSED NOW</span>
        `;
      }
    }

    // 2. Hero pill
    const heroStatus = document.getElementById('heroStoreStatus');
    if (heroStatus) {
      if (status.isOpen) {
        heroStatus.className = 'inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 border-2 border-neutral-900 px-3.5 py-1.5 rounded-full retro-shadow text-xs sm:text-sm font-extrabold uppercase tracking-wide';
        heroStatus.innerHTML = `
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>🟢 OPEN NOW (11:00 AM – 11:30 PM)</span>
        `;
      } else {
        heroStatus.className = 'inline-flex items-center gap-2 bg-red-50 text-red-900 border-2 border-neutral-900 px-3.5 py-1.5 rounded-full retro-shadow text-xs sm:text-sm font-extrabold uppercase tracking-wide';
        heroStatus.innerHTML = `
          <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span>🔴 CURRENTLY CLOSED (Opens 11:00 AM)</span>
        `;
      }
    }

    // 3. Checkout notification banner
    const closedNotice = document.getElementById('checkoutClosedNotice');
    if (closedNotice) {
      if (status.isOpen) {
        closedNotice.classList.add('hidden');
      } else {
        closedNotice.classList.remove('hidden');
      }
    }
  }

  // ---------------- RESTAURANT INFO IN DOM ----------------
  function renderRestaurantInfo() {
    const info = state.info;
    // Announcement
    if (dom.announcementBar) {
      dom.announcementBar.innerHTML = `
        <div class="marquee-track flex items-center gap-12 font-bold text-xs uppercase tracking-wider">
          <span class="flex items-center gap-2"><i class="fa-solid fa-hotdog text-amber-300"></i> ${escapeHtml(info.announcementText)}</span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-location-dot text-amber-300"></i> ${escapeHtml(info.address)}</span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-clock text-amber-300"></i> ${escapeHtml(info.openingHours)}</span>
          <span class="flex items-center gap-2"><i class="fa-brands fa-whatsapp text-green-400"></i> FAST WHATSAPP ORDERS: ${escapeHtml(info.phone)}</span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-hotdog text-amber-300"></i> ${escapeHtml(info.announcementText)}</span>
        </div>
      `;
    }

    // Update phone & whatsapp links in page
    document.querySelectorAll('.info-phone-text').forEach(el => el.textContent = info.phone);
    document.querySelectorAll('.info-address-text').forEach(el => el.textContent = info.address);
    document.querySelectorAll('.info-hours-text').forEach(el => el.textContent = info.openingHours);
    document.querySelectorAll('.info-whatsapp-link').forEach(el => {
      el.href = `https://wa.me/${info.whatsappNumber}?text=${encodeURIComponent('Hi Hot Dog Nation! I would like to order delicious food.')}`;
    });
    document.querySelectorAll('.info-maps-link').forEach(el => el.href = info.googleMapsUrl);
    document.querySelectorAll('.info-instagram-link').forEach(el => el.href = info.instagramUrl);
  }

  // ---------------- BESTSELLERS SECTION ----------------
  function renderBestsellers() {
    if (!dom.bestsellersGrid) return;
    const bestsellers = state.menu.filter(item => item.isBestseller).slice(0, 6);

    dom.bestsellersGrid.innerHTML = bestsellers.map(item => `
      <div class="retro-card group flex flex-col justify-between bg-white relative">
        <div class="relative overflow-hidden aspect-[4/3] bg-amber-50">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute top-3 left-3 flex items-center gap-2">
            ${item.isVeg ? '<span class="veg-indicator bg-white p-1 rounded shadow" title="Vegetarian"></span>' : '<span class="nonveg-indicator bg-white p-1 rounded shadow" title="Non-Vegetarian"></span>'}
            <span class="bg-amber-400 text-black font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">★ FAVORITE</span>
          </div>
          <div class="absolute bottom-3 right-3 bg-black/85 backdrop-blur-sm text-white font-brand text-xl px-3 py-1 rounded-lg border border-yellow-400 shadow">
            ₹${item.price}
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h3 class="font-brand text-xl text-neutral-900 group-hover:text-red-600 transition-colors">${escapeHtml(item.name)}</h3>
            </div>
            <p class="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">${escapeHtml(item.description)}</p>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-neutral-100">
            <span class="text-xs font-semibold text-neutral-500 flex items-center gap-1.5">
              <i class="fa-regular fa-clock text-amber-500"></i> ${escapeHtml(item.prepTime || '8-10m')}
            </span>
            <button onclick="window.HOTDOG_NATION_APP.addToCart('${item.id}')" class="retro-btn retro-btn-red text-sm px-4 py-2 rounded-lg font-brand gap-2">
              <i class="fa-solid fa-plus text-xs"></i> ADD TO ORDER
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ---------------- EXPLORE OUR MENU SECTION ----------------
  function renderMenu() {
    if (!dom.menuGrid) return;

    let items = state.menu;

    // Filter Category
    if (state.activeCategory !== 'all') {
      items = items.filter(item => item.category === state.activeCategory);
    }

    // Filter Veg / Non-Veg
    if (state.activeVegFilter === 'veg') {
      items = items.filter(item => item.isVeg === true);
    } else if (state.activeVegFilter === 'nonveg') {
      items = items.filter(item => item.isVeg === false);
    }

    // Filter Search
    if (state.searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(state.searchQuery) ||
        item.description.toLowerCase().includes(state.searchQuery) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(state.searchQuery)))
      );
    }

    if (dom.menuItemCount) {
      dom.menuItemCount.textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'} found`;
    }

    if (items.length === 0) {
      dom.menuGrid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-3xl">🌭</div>
          <h4 class="font-brand text-2xl text-neutral-800 mb-2">NO CRAVINGS MATCHED</h4>
          <p class="text-neutral-500 max-w-md mx-auto text-sm">We couldn't find items matching your search or filter. Try switching tabs or searching for something else!</p>
          <button onclick="window.HOTDOG_NATION_APP.resetMenuFilters()" class="retro-btn retro-btn-yellow mt-5 px-5 py-2 text-sm rounded-lg">
            RESET ALL FILTERS
          </button>
        </div>
      `;
      return;
    }

    dom.menuGrid.innerHTML = items.map(item => `
      <div class="retro-card group flex flex-col justify-between bg-white relative">
        <div class="relative overflow-hidden aspect-[16/10] bg-neutral-100">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
            ${item.isVeg ? '<span class="veg-indicator bg-white p-1 rounded shadow" title="Vegetarian"></span>' : '<span class="nonveg-indicator bg-white p-1 rounded shadow" title="Non-Vegetarian"></span>'}
            ${item.isBestseller ? '<span class="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow">BESTSELLER</span>' : ''}
          </div>
          <div class="absolute bottom-2.5 right-2.5 bg-neutral-900/90 backdrop-blur-sm text-yellow-400 font-brand text-lg px-3 py-0.5 rounded-lg border border-yellow-400/40 shadow">
            ₹${item.price}
          </div>
        </div>

        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                ${escapeHtml(item.categoryLabel)}
              </span>
              <span class="text-xs font-bold text-neutral-400">★ ${item.rating || '4.9'}</span>
            </div>
            <h3 class="font-brand text-lg sm:text-xl text-neutral-900 mb-1.5 group-hover:text-red-600 transition-colors">
              ${escapeHtml(item.name)}
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
              ${escapeHtml(item.description)}
            </p>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-neutral-100">
            <span class="text-xs font-medium text-neutral-500">
              <i class="fa-regular fa-clock text-amber-500 mr-1"></i>${escapeHtml(item.prepTime || '10m')}
            </span>
            <button onclick="window.HOTDOG_NATION_APP.addToCart('${item.id}')" class="retro-btn retro-btn-yellow text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg font-brand gap-1.5">
              <i class="fa-solid fa-plus text-xs"></i> ADD
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ---------------- "BUILD YOUR OWN HOT DOG" CONFIGURATOR ----------------
  function calculateByoTotal() {
    let total = 100; // Base Hot Dog is ₹100
    const config = window.HOTDOG_NATION_DATA.BUILD_YOUR_OWN_CONFIG;

    // Base
    const baseObj = config.bases.find(b => b.id === state.byo.base);
    if (baseObj) total = baseObj.price;

    // Sausage Upgrade (only for Non-Veg base)
    if (state.byo.base === 'base-nonveg') {
      const sausage = config.sausageUpgrades.find(s => s.id === state.byo.sausageUpgrade);
      if (sausage) total += sausage.price;
    }

    // Addons
    if (state.byo.cheese) total += 10;
    if (state.byo.bacon && state.byo.base === 'base-nonveg') total += 50;
    if (state.byo.extraSausage && state.byo.base === 'base-nonveg') total += 50;

    return total;
  }

  function updateByoUI() {
    const total = calculateByoTotal();
    const config = window.HOTDOG_NATION_DATA.BUILD_YOUR_OWN_CONFIG;

    if (dom.byoTotalDisplay) {
      dom.byoTotalDisplay.textContent = `₹${total}`;
    }

    // Summary breakdown list
    const parts = [];
    const isVeg = state.byo.base === 'base-veg';
    parts.push(isVeg ? 'Veg Crispy Aloo Patty (₹100)' : 'Non-Veg Hot Dog Bun (₹100)');

    if (!isVeg) {
      const sausage = config.sausageUpgrades.find(s => s.id === state.byo.sausageUpgrade);
      if (sausage && sausage.price > 0) {
        parts.push(`${sausage.name} (+₹${sausage.price})`);
      }
    }

    if (state.byo.cheese) parts.push('Melted Cheese (+₹10)');
    if (state.byo.bacon && !isVeg) parts.push('Crispy Bacon (+₹50)');
    if (state.byo.extraSausage && !isVeg) parts.push('Extra Sausage (+₹50)');

    // Sauces
    const sauceNames = state.byo.sauces.map(sId => {
      const found = config.sauces.find(s => s.id === sId);
      return found ? found.name : '';
    }).filter(Boolean);
    if (sauceNames.length > 0) {
      parts.push(`Sauces: ${sauceNames.join(', ')}`);
    }

    // Toppings
    const toppingNames = state.byo.toppings.map(tId => {
      const found = config.toppings.find(t => t.id === tId);
      return found ? found.name : '';
    }).filter(Boolean);
    if (toppingNames.length > 0) {
      parts.push(`Toppings: ${toppingNames.join(', ')}`);
    }

    if (dom.byoBreakdownSummary) {
      dom.byoBreakdownSummary.innerHTML = parts.map(p => `
        <span class="inline-flex items-center px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-md border border-amber-300">
          ✓ ${escapeHtml(p)}
        </span>
      `).join('');
    }

    // Visual Preview updates
    if (dom.byoVisualFrank) {
      if (isVeg) {
        dom.byoVisualFrank.className = 'w-48 h-8 rounded-full bg-amber-700 border-2 border-amber-950 mx-auto shadow-md transform transition-all duration-300 flex items-center justify-center text-[10px] text-white font-bold tracking-wider';
        dom.byoVisualFrank.textContent = 'CRISPY ALOO PATTY';
      } else {
        dom.byoVisualFrank.className = 'w-52 h-8 rounded-full bg-red-700 border-2 border-red-950 mx-auto shadow-md transform transition-all duration-300 flex items-center justify-center text-[10px] text-white font-bold tracking-wider';
        dom.byoVisualFrank.textContent = state.byo.sausageUpgrade === 'sausage-jumbo' ? 'JUMBO FRANK' : 'GRILLED FRANK';
      }
    }

    if (dom.byoVisualCheese) {
      dom.byoVisualCheese.style.display = state.byo.cheese ? 'block' : 'none';
    }
    if (dom.byoVisualBacon) {
      dom.byoVisualBacon.style.display = (state.byo.bacon && !isVeg) ? 'block' : 'none';
    }
    if (dom.byoVisualSauce) {
      dom.byoVisualSauce.style.display = state.byo.sauces.length > 0 ? 'block' : 'none';
    }
    if (dom.byoVisualToppings) {
      dom.byoVisualToppings.style.display = state.byo.toppings.length > 0 ? 'block' : 'none';
    }
  }

  function addByoToCart() {
    const total = calculateByoTotal();
    const config = window.HOTDOG_NATION_DATA.BUILD_YOUR_OWN_CONFIG;
    const isVeg = state.byo.base === 'base-veg';

    const sauceNames = state.byo.sauces.map(sId => {
      const found = config.sauces.find(s => s.id === sId);
      return found ? found.name : '';
    }).filter(Boolean);

    const toppingNames = state.byo.toppings.map(tId => {
      const found = config.toppings.find(t => t.id === tId);
      return found ? found.name : '';
    }).filter(Boolean);

    let details = [];
    if (!isVeg) {
      const sausage = config.sausageUpgrades.find(s => s.id === state.byo.sausageUpgrade);
      if (sausage && sausage.price > 0) details.push(sausage.name);
    }
    if (state.byo.cheese) details.push('Cheese');
    if (state.byo.bacon && !isVeg) details.push('Bacon');
    if (state.byo.extraSausage && !isVeg) details.push('Extra Sausage');
    if (sauceNames.length > 0) details.push(`Sauces: ${sauceNames.join(', ')}`);
    if (toppingNames.length > 0) details.push(`Toppings: ${toppingNames.join(', ')}`);

    const customItem = {
      id: 'custom-' + Date.now(),
      name: isVeg ? 'Build Your Own Hot Dog (Veg)' : 'Build Your Own Hot Dog (Non-Veg)',
      price: total,
      quantity: 1,
      isVeg: isVeg,
      customizationSummary: details.join(' | ') || 'Custom loaded toppings',
      image: isVeg
        ? 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80'
    };

    state.cart.push(customItem);
    saveCart();
    updateCartUI();
    showToast('🌭 Custom Hot Dog added to your order!');
    openCart();
  }

  // ---------------- CART MANAGEMENT ----------------
  function addToCart(itemId) {
    const menuItem = state.menu.find(m => m.id === itemId);
    if (!menuItem) return;

    const existingIndex = state.cart.findIndex(i => i.id === itemId && !i.customizationSummary);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        isVeg: menuItem.isVeg,
        image: menuItem.image,
        category: menuItem.category
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${menuItem.name} to order!`);
  }

  function updateItemQty(cartItemId, delta) {
    const itemIndex = state.cart.findIndex(i => i.id === cartItemId);
    if (itemIndex === -1) return;

    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
    }

    saveCart();
    updateCartUI();
  }

  function removeFromCart(cartItemId) {
    state.cart = state.cart.filter(i => i.id !== cartItemId);
    saveCart();
    updateCartUI();
  }

  function saveCart() {
    try {
      localStorage.setItem('hotdog_nation_cart', JSON.stringify(state.cart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Badges
    dom.cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    });

    if (dom.cartTotalNav) {
      dom.cartTotalNav.textContent = `₹${subtotal}`;
    }

    // Update Drawer Contents
    if (!dom.cartDrawer) return;

    if (state.cart.length === 0) {
      if (dom.cartEmptyState) dom.cartEmptyState.classList.remove('hidden');
      if (dom.cartFilledState) dom.cartFilledState.classList.add('hidden');
      if (dom.cartItemsList) dom.cartItemsList.innerHTML = '';
      return;
    }

    if (dom.cartEmptyState) dom.cartEmptyState.classList.add('hidden');
    if (dom.cartFilledState) dom.cartFilledState.classList.remove('hidden');

    if (dom.cartItemsList) {
      dom.cartItemsList.innerHTML = state.cart.map(item => `
        <div class="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" class="w-14 h-14 object-cover rounded-lg border border-neutral-300">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              ${item.isVeg ? '<span class="veg-indicator"></span>' : '<span class="nonveg-indicator"></span>'}
              <h5 class="font-brand text-sm text-neutral-900 truncate">${escapeHtml(item.name)}</h5>
            </div>
            ${item.customizationSummary ? `<p class="text-[11px] text-neutral-500 line-clamp-1">${escapeHtml(item.customizationSummary)}</p>` : ''}
            <div class="text-xs font-bold text-red-600 mt-1">₹${item.price} each</div>
          </div>

          <div class="flex flex-col items-end gap-1.5">
            <div class="flex items-center bg-white border border-neutral-300 rounded-lg overflow-hidden shadow-sm">
              <button onclick="window.HOTDOG_NATION_APP.updateQty('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-neutral-700 hover:bg-amber-100 font-black text-sm">
                -
              </button>
              <span class="w-7 text-center font-bold text-xs">${item.quantity}</span>
              <button onclick="window.HOTDOG_NATION_APP.updateQty('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-neutral-700 hover:bg-amber-100 font-black text-sm">
                +
              </button>
            </div>
            <span class="font-brand text-sm text-neutral-900">₹${item.price * item.quantity}</span>
          </div>
        </div>
      `).join('');
    }

    // Subtotal & Estimated Total
    if (dom.cartSubtotalText) dom.cartSubtotalText.textContent = `₹${subtotal}`;
    const deliveryFee = subtotal >= 199 || subtotal === 0 ? 0 : 30;
    if (dom.cartDeliveryFeeText) {
      dom.cartDeliveryFeeText.textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
    }
    if (dom.cartTotalText) {
      dom.cartTotalText.textContent = `₹${subtotal + deliveryFee}`;
    }
  }

  function openCart() {
    if (!dom.cartDrawer) return;
    dom.cartDrawer.classList.remove('hidden');
    setTimeout(() => {
      dom.cartDrawerBackdrop.classList.remove('opacity-0');
      dom.cartDrawerPanel.classList.remove('translate-x-full');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeCart() {
    if (!dom.cartDrawer) return;
    dom.cartDrawerBackdrop.classList.add('opacity-0');
    dom.cartDrawerPanel.classList.add('translate-x-full');
    setTimeout(() => {
      dom.cartDrawer.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  }

  // ---------------- CHECKOUT & WHATSAPP GENERATION ----------------
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast('Your cart is empty! Add delicious hot dogs first.');
      return;
    }
    closeCart();
    updateCheckoutModalSummary();
    if (dom.checkoutModal) {
      dom.checkoutModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeCheckoutModal() {
    if (dom.checkoutModal) {
      dom.checkoutModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  function updateCheckoutModalSummary() {
    if (!dom.checkoutModalSummary) return;

    const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const selectedOrderType = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
    const deliveryFee = (selectedOrderType === 'delivery' && subtotal < 199) ? 30 : 0;
    const finalTotal = subtotal + deliveryFee;

    dom.checkoutModalSummary.innerHTML = `
      <div class="space-y-1.5 text-xs text-neutral-700 pb-3 border-b border-neutral-200">
        ${state.cart.map(i => `
          <div class="flex justify-between">
            <span>${escapeHtml(i.name)} × ${i.quantity}</span>
            <span class="font-bold">₹${i.price * i.quantity}</span>
          </div>
        `).join('')}
      </div>
      <div class="pt-2 text-xs space-y-1">
        <div class="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>₹${subtotal}</span>
        </div>
        <div class="flex justify-between text-neutral-600">
          <span>Delivery Fee (${selectedOrderType.toUpperCase()})</span>
          <span class="${deliveryFee === 0 ? 'text-emerald-600 font-bold' : ''}">${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}</span>
        </div>
        <div class="flex justify-between font-brand text-base text-neutral-900 pt-1 border-t border-neutral-200">
          <span>TOTAL PAYABLE</span>
          <span class="text-red-600">₹${finalTotal}</span>
        </div>
      </div>
    `;
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('customerNameInput')?.value.trim();
    const phone = document.getElementById('customerPhoneInput')?.value.trim();
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
    const address = document.getElementById('deliveryAddressInput')?.value.trim();
    const notes = document.getElementById('orderNotesInput')?.value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    if (orderType === 'delivery' && !address) {
      alert('Please provide your delivery address in Law Gate or LPU Campus.');
      return;
    }

    const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const deliveryFee = (orderType === 'delivery' && subtotal < 199) ? 30 : 0;
    const finalTotal = subtotal + deliveryFee;

    // Generate formatted WhatsApp message
    let lines = [];
    lines.push('🌭 *NEW ORDER — HOT DOG NATION* 🌭');
    lines.push('----------------------------------------');
    lines.push(`👤 *Customer:* ${name}`);
    lines.push(`📞 *Phone:* ${phone}`);
    lines.push(`📍 *Order Type:* ${orderType.toUpperCase()}`);
    if (orderType === 'delivery') {
      lines.push(`🏠 *Address:* ${address}`);
    }
    lines.push('----------------------------------------');
    lines.push('📋 *ITEMS ORDERED:*');

    state.cart.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.name}* x${item.quantity} — ₹${item.price * item.quantity}`);
      if (item.customizationSummary) {
        lines.push(`   ↳ _Custom: ${item.customizationSummary}_`);
      }
    });

    lines.push('----------------------------------------');
    lines.push(`💰 *Item Subtotal:* ₹${subtotal}`);
    lines.push(`🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}`);
    lines.push(`🔥 *TOTAL PAYABLE:* ₹${finalTotal}`);
    lines.push('----------------------------------------');
    if (notes) {
      lines.push(`📝 *Special Instructions:* ${notes}`);
      lines.push('----------------------------------------');
    }
    lines.push('_Order created via Hot Dog Nation Official Website_');
    lines.push('👉 _Please reply to confirm and start preparation!_');

    const whatsappMessage = lines.join('\n');
    const whatsappUrl = `https://wa.me/${state.info.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Clear cart and show notification
    state.cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    showToast('🎉 Order created! WhatsApp opened to send your order directly to Hot Dog Nation.');
  }

  // ---------------- MOBILE MENU & LIGHTBOX ----------------
  function openMobileMenu() {
    if (dom.mobileMenuDrawer) {
      dom.mobileMenuDrawer.classList.remove('hidden');
    }
  }

  function closeMobileMenu() {
    if (dom.mobileMenuDrawer) {
      dom.mobileMenuDrawer.classList.add('hidden');
    }
  }

  function closeLightbox() {
    if (dom.lightboxModal) {
      dom.lightboxModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // ---------------- TOAST UTILITY ----------------
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 bg-neutral-900 text-yellow-400 border-2 border-yellow-400 font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300';
    toast.innerHTML = `<i class="fa-solid fa-hotdog text-xl text-red-500"></i> <span>${escapeHtml(message)}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  function resetMenuFilters() {
    state.activeCategory = 'all';
    state.activeVegFilter = 'all';
    state.searchQuery = '';
    if (dom.menuSearchInput) dom.menuSearchInput.value = '';
    dom.categoryTabs.forEach(t => t.classList.remove('active-tab'));
    if (dom.categoryTabs[0]) dom.categoryTabs[0].classList.add('active-tab');
    dom.vegFilterBtns.forEach(b => b.classList.remove('active-pill'));
    if (dom.vegFilterBtns[0]) dom.vegFilterBtns[0].classList.add('active-pill');
    renderMenu();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------------- EXPOSE TO GLOBAL ----------------
  window.HOTDOG_NATION_APP = {
    addToCart,
    updateQty: updateItemQty,
    removeFromCart,
    openCart,
    closeCart,
    resetMenuFilters,
    showToast
  };

})();
