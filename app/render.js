// render.js — one job: turn deals into HTML. No filtering, no sorting,
// no data fetching; it only draws what it is handed.

import { CHECKED_AT, DEALS } from './deals.js';
import { discountPct, savedDollars, summarize } from './filters.js';

export function money(amount) {
  return '$' + amount.toFixed(2).replace(/\.00$/, '');
}

function signalClass(signal) {
  if (signal === 'NEW LOW') return 'signal-newlow';
  if (signal === 'STRONG') return 'signal-strong';
  return 'signal-routine';
}

export function dealCard(deal) {
  const pct = discountPct(deal);
  const saved = savedDollars(deal);
  return `
  <article class="card" data-id="${deal.id}">
    <div class="card-top">
      <span class="category">${deal.category}</span>
      <span class="signal ${signalClass(deal.signal)}" title="${deal.evidence}">${
        deal.signal === 'NEW LOW' ? '★ NEW LOW' : deal.signal === 'STRONG' ? '● STRONG DEAL' : '○ ROUTINE SALE'
      }</span>
    </div>
    <h3 class="product">${deal.product}</h3>
    <p class="store">at <strong>${deal.store}</strong></p>
    <p class="prices">
      <span class="sale">${money(deal.sale)}</span>
      <span class="usual">${money(deal.usual)}</span>
      <span class="off">−${pct}%</span>
    </p>
    <p class="saved">You save ${money(saved)}</p>
    <p class="evidence">${deal.evidence}</p>
    <p class="meta">Price checked ${CHECKED_AT}<br>Source: ${deal.source}</p>
    <a class="cta" href="${deal.link}" target="_blank" rel="noopener">View at ${deal.store} ↗</a>
  </article>`;
}

export function renderDeals(container, deals) {
  if (!deals.length) {
    container.innerHTML =
      '<p class="empty">No deals match those filters. Try clearing the search or lowering the discount.</p>';
    return;
  }
  container.innerHTML = deals.map(dealCard).join('');
}

export function renderStats(container) {
  const s = summarize(DEALS);
  container.innerHTML = `
    <div class="stat"><strong>${s.count}</strong><span>verified deals</span></div>
    <div class="stat"><strong>${s.newLows}</strong><span>all-time lows</span></div>
    <div class="stat"><strong>${s.avgDiscount}%</strong><span>average discount</span></div>
    <div class="stat"><strong>${money(s.totalSaved)}</strong><span>total savings</span></div>
    <div class="stat"><strong>${s.stores}</strong><span>stores tracked</span></div>`;
}
