/**
 * HOT DOG NATION — RESTAURANT ADMIN CONTROLLER
 * Passcode: admin123
 */

(function () {
  'use strict';

  const AUTH_KEY = 'hotdog_nation_admin_auth';
  const PASSCODE = 'admin123';

  let menuItems = [];
  let restaurantInfo = {};

  document.addEventListener('DOMContentLoaded', initAdmin);

  function initAdmin() {
    setupAuth();
    loadData();
    setupNavigationTabs();
    setupEventListeners();
  }

  function setupAuth() {
    const isAuthed = sessionStorage.getItem(AUTH_KEY) === 'true';
    const loginScreen = document.getElementById('adminLoginScreen');
    const appContainer = document.getElementById('adminAppContainer');

    if (isAuthed) {
      if (loginScreen) loginScreen.classList.add('hidden');
      if (appContainer) appContainer.classList.remove('hidden');
      renderTable();
      populateSettingsForm();
    } else {
      if (loginScreen) loginScreen.classList.remove('hidden');
      if (appContainer) appContainer.classList.add('hidden');
    }

    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('adminPasscode').value.trim();
        const err = document.getElementById('adminLoginError');
        if (code === PASSCODE) {
          sessionStorage.setItem(AUTH_KEY, 'true');
          if (err) err.classList.add('hidden');
          setupAuth();
        } else {
          if (err) err.classList.remove('hidden');
        }
      });
    }

    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem(AUTH_KEY);
        setupAuth();
      });
    }
  }

  function loadData() {
    if (window.HOTDOG_NATION_DATA) {
      menuItems = window.HOTDOG_NATION_DATA.getStoredMenu();
      restaurantInfo = window.HOTDOG_NATION_DATA.getRestaurantInfo();
    }
  }

  function setupNavigationTabs() {
    const tabBtnMenu = document.getElementById('tabBtnMenu');
    const tabBtnSettings = document.getElementById('tabBtnSettings');
    const tabContentMenu = document.getElementById('tabContentMenu');
    const tabContentSettings = document.getElementById('tabContentSettings');

    if (tabBtnMenu && tabBtnSettings) {
      tabBtnMenu.addEventListener('click', () => {
        tabBtnMenu.className = 'px-5 py-2.5 font-brand text-sm border-b-4 border-red-600 text-red-600 bg-white rounded-t-xl';
        tabBtnSettings.className = 'px-5 py-2.5 font-brand text-sm border-b-4 border-transparent text-neutral-600 hover:text-black bg-neutral-100 rounded-t-xl';
        tabContentMenu.classList.remove('hidden');
        tabContentSettings.classList.add('hidden');
      });

      tabBtnSettings.addEventListener('click', () => {
        tabBtnSettings.className = 'px-5 py-2.5 font-brand text-sm border-b-4 border-red-600 text-red-600 bg-white rounded-t-xl';
        tabBtnMenu.className = 'px-5 py-2.5 font-brand text-sm border-b-4 border-transparent text-neutral-600 hover:text-black bg-neutral-100 rounded-t-xl';
        tabContentSettings.classList.remove('hidden');
        tabContentMenu.classList.add('hidden');
        populateSettingsForm();
      });
    }
  }

  function setupEventListeners() {
    // Category filter
    const catFilter = document.getElementById('adminCategoryFilter');
    if (catFilter) {
      catFilter.addEventListener('change', renderTable);
    }

    // Add Item Modal
    const addBtn = document.getElementById('addNewItemBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => openItemModal());
    }

    const closeBtn = document.getElementById('closeItemModalBtn');
    const cancelBtn = document.getElementById('cancelItemModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeItemModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeItemModal);

    // Item Edit Form Submit
    const itemForm = document.getElementById('itemEditForm');
    if (itemForm) {
      itemForm.addEventListener('submit', handleItemFormSubmit);
    }

    // Settings Form Submit
    const settingsForm = document.getElementById('restaurantSettingsForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', handleSettingsFormSubmit);
    }

    // Reset Defaults
    const resetBtn = document.getElementById('resetDefaultsBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all menu items, prices, and restaurant info back to factory defaults?')) {
          window.HOTDOG_NATION_DATA.resetMenuToDefault();
          loadData();
          renderTable();
          populateSettingsForm();
          alert('Menu and settings successfully reset to original defaults!');
        }
      });
    }
  }

  function renderTable() {
    const tbody = document.getElementById('adminMenuTableBody');
    const catFilter = document.getElementById('adminCategoryFilter')?.value || 'all';
    const stats = document.getElementById('adminMenuStats');

    if (!tbody) return;

    let items = menuItems;
    if (catFilter !== 'all') {
      items = items.filter(i => i.category === catFilter);
    }

    if (stats) {
      stats.textContent = `Showing ${items.length} of ${menuItems.length} items`;
    }

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="p-8 text-center text-neutral-500 font-bold">
            No items in this category. Click "+ Add New Menu Item" to create one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = items.map(item => `
      <tr class="hover:bg-amber-50/50 transition-colors">
        <td class="p-3">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg border border-neutral-300">
        </td>
        <td class="p-3 font-bold text-neutral-900">
          <div>${escapeHtml(item.name)}</div>
          <div class="text-[11px] text-neutral-500 font-normal line-clamp-1">${escapeHtml(item.description)}</div>
        </td>
        <td class="p-3">
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
            ${escapeHtml(item.categoryLabel || item.category)}
          </span>
        </td>
        <td class="p-3">
          ${item.isVeg
            ? '<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700"><span class="w-2 h-2 rounded-full bg-emerald-600"></span> Veg</span>'
            : '<span class="inline-flex items-center gap-1 text-xs font-bold text-red-600"><span class="w-2 h-2 rounded-full bg-red-600"></span> Non-Veg</span>'
          }
        </td>
        <td class="p-3 font-brand text-base text-neutral-900">
          ₹${item.price}
        </td>
        <td class="p-3">
          ${item.isBestseller
            ? '<span class="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-black">Yes</span>'
            : '<span class="text-[10px] text-neutral-400">No</span>'
          }
        </td>
        <td class="p-3 text-right space-x-2">
          <button onclick="window.HOTDOG_NATION_ADMIN.editItem('${item.id}')" class="px-3 py-1 bg-neutral-100 hover:bg-yellow-400 hover:text-black text-neutral-800 text-xs font-bold rounded-md border border-neutral-300 transition-colors">
            Edit
          </button>
          <button onclick="window.HOTDOG_NATION_ADMIN.deleteItem('${item.id}')" class="px-2.5 py-1 bg-neutral-100 hover:bg-red-600 hover:text-white text-red-600 text-xs font-bold rounded-md border border-neutral-300 transition-colors">
            Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  function openItemModal(itemToEdit = null) {
    const modal = document.getElementById('itemEditModal');
    const title = document.getElementById('itemModalTitle');

    if (!modal) return;

    if (itemToEdit) {
      title.textContent = 'Edit Menu Item';
      document.getElementById('editItemId').value = itemToEdit.id;
      document.getElementById('editItemName').value = itemToEdit.name;
      document.getElementById('editItemCategory').value = itemToEdit.category;
      document.getElementById('editItemPrice').value = itemToEdit.price;
      document.getElementById('editItemIsVeg').value = itemToEdit.isVeg ? 'true' : 'false';
      document.getElementById('editItemIsBestseller').value = itemToEdit.isBestseller ? 'true' : 'false';
      document.getElementById('editItemDescription').value = itemToEdit.description;
      document.getElementById('editItemImage').value = itemToEdit.image;
    } else {
      title.textContent = 'Add New Menu Item';
      document.getElementById('editItemId').value = '';
      document.getElementById('itemEditForm').reset();
      document.getElementById('editItemImage').value = 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80';
    }

    modal.classList.remove('hidden');
  }

  function closeItemModal() {
    const modal = document.getElementById('itemEditModal');
    if (modal) modal.classList.add('hidden');
  }

  function handleItemFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('editItemId').value;
    const name = document.getElementById('editItemName').value.trim();
    const category = document.getElementById('editItemCategory').value;
    const price = parseFloat(document.getElementById('editItemPrice').value);
    const isVeg = document.getElementById('editItemIsVeg').value === 'true';
    const isBestseller = document.getElementById('editItemIsBestseller').value === 'true';
    const description = document.getElementById('editItemDescription').value.trim();
    const image = document.getElementById('editItemImage').value.trim();

    const categoryLabels = {
      hotdogs: 'Hot Dogs',
      pastas: 'Pastas',
      maggi: 'Maggi',
      salads: 'Salads',
      beverages: 'Beverages',
      addons: 'Add Ons',
      desserts: 'Desserts'
    };

    if (id) {
      // Edit existing
      const idx = menuItems.findIndex(i => i.id === id);
      if (idx > -1) {
        menuItems[idx] = {
          ...menuItems[idx],
          name,
          category,
          categoryLabel: categoryLabels[category] || category,
          price,
          isVeg,
          isBestseller,
          description,
          image
        };
      }
    } else {
      // Create new
      const newItem = {
        id: 'item-' + Date.now(),
        name,
        category,
        categoryLabel: categoryLabels[category] || category,
        price,
        isVeg,
        isBestseller,
        prepTime: '10m',
        rating: 4.9,
        description,
        image,
        tags: [categoryLabels[category]]
      };
      menuItems.unshift(newItem);
    }

    window.HOTDOG_NATION_DATA.saveMenu(menuItems);
    closeItemModal();
    renderTable();
    alert('Item successfully saved! Check your live website to see the updates.');
  }

  function deleteItem(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    if (confirm(`Are you sure you want to delete "${item.name}" from the menu?`)) {
      menuItems = menuItems.filter(i => i.id !== itemId);
      window.HOTDOG_NATION_DATA.saveMenu(menuItems);
      renderTable();
    }
  }

  function populateSettingsForm() {
    const info = restaurantInfo;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.value = val;
    };

    setVal('settingName', info.name);
    setVal('settingTagline', info.tagline);
    setVal('settingPhone', info.phone);
    setVal('settingWhatsapp', info.whatsappNumber);
    setVal('settingAddress', info.address);
    setVal('settingHours', info.openingHours);
    setVal('settingInstagram', info.instagramUrl);
    setVal('settingAnnouncement', info.announcementText);
  }

  function handleSettingsFormSubmit(e) {
    e.preventDefault();

    const info = {
      ...restaurantInfo,
      name: document.getElementById('settingName')?.value.trim() || restaurantInfo.name,
      tagline: document.getElementById('settingTagline')?.value.trim() || restaurantInfo.tagline,
      phone: document.getElementById('settingPhone')?.value.trim() || restaurantInfo.phone,
      whatsappNumber: document.getElementById('settingWhatsapp')?.value.trim().replace(/\D/g, '') || restaurantInfo.whatsappNumber,
      address: document.getElementById('settingAddress')?.value.trim() || restaurantInfo.address,
      openingHours: document.getElementById('settingHours')?.value.trim() || restaurantInfo.openingHours,
      instagramUrl: document.getElementById('settingInstagram')?.value.trim() || restaurantInfo.instagramUrl,
      announcementText: document.getElementById('settingAnnouncement')?.value.trim() || restaurantInfo.announcementText
    };

    restaurantInfo = info;
    window.HOTDOG_NATION_DATA.saveRestaurantInfo(info);
    alert('Restaurant settings saved successfully! Live website has been updated.');
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

  // Global hooks
  window.HOTDOG_NATION_ADMIN = {
    editItem: (id) => {
      const item = menuItems.find(i => i.id === id);
      if (item) openItemModal(item);
    },
    deleteItem
  };

})();
