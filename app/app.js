// app.js — one job: wire the page together. It reads the controls, asks
// filters.js for the visible deals, and asks render.js to draw them.

import { CATEGORIES, CHECKED_AT, DEALS, SALE_WINDOW, STORES } from './deals.js';
import { applyFilters, sortDeals } from './filters.js';
import { renderDeals, renderStats } from './render.js';

const grid = document.getElementById('dealGrid');
const countLine = document.getElementById('resultCount');
const searchBox = document.getElementById('searchBox');
const categorySelect = document.getElementById('categorySelect');
const storeSelect = document.getElementById('storeSelect');
const discountSelect = document.getElementById('discountSelect');
const signalSelect = document.getElementById('signalSelect');
const sortSelect = document.getElementById('sortSelect');
const clearButton = document.getElementById('clearFilters');

document.getElementById('checkedLine').textContent =
  `All prices checked ${CHECKED_AT} · Sale window: ${SALE_WINDOW}`;

function fillOptions(select, values) {
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
}

fillOptions(categorySelect, CATEGORIES);
fillOptions(storeSelect, STORES);

function currentState() {
  return {
    query: searchBox.value,
    category: categorySelect.value,
    store: storeSelect.value,
    minDiscount: Number(discountSelect.value) || 0,
    signal: signalSelect.value,
    sort: sortSelect.value,
  };
}

function refresh() {
  const state = currentState();
  const visible = sortDeals(applyFilters(DEALS, state), state.sort);
  renderDeals(grid, visible);
  countLine.textContent =
    visible.length === DEALS.length
      ? `Showing all ${visible.length} deals`
      : `Showing ${visible.length} of ${DEALS.length} deals`;
}

for (const control of [searchBox, categorySelect, storeSelect, discountSelect, signalSelect, sortSelect]) {
  control.addEventListener('input', refresh);
  control.addEventListener('change', refresh);
}

clearButton.addEventListener('click', () => {
  searchBox.value = '';
  categorySelect.value = 'All';
  storeSelect.value = 'All';
  discountSelect.value = '0';
  signalSelect.value = 'All';
  sortSelect.value = 'signal';
  refresh();
});

renderStats(document.getElementById('statsBar'));
refresh();
