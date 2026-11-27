// filters.js — one job: take the deal list and a filter state, return the
// deals a shopper should see, in the order they should see them.

export function discountPct(deal) {
  if (!deal.usual || deal.usual <= 0) return 0;
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

export function savedDollars(deal) {
  return Math.max(0, deal.usual - deal.sale);
}

const SIGNAL_RANK = { 'NEW LOW': 0, STRONG: 1, ROUTINE: 2 };

export function applyFilters(deals, state) {
  const query = (state.query || '').trim().toLowerCase();
  return deals.filter((deal) => {
    if (state.category && state.category !== 'All' && deal.category !== state.category) return false;
    if (state.store && state.store !== 'All' && deal.store !== state.store) return false;
    if (state.minDiscount && discountPct(deal) < state.minDiscount) return false;
    if (state.signal && state.signal !== 'All' && deal.signal !== state.signal) return false;
    if (query) {
      const haystack = `${deal.product} ${deal.store} ${deal.category} ${deal.source}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function sortDeals(deals, sortKey) {
  const list = [...deals];
  switch (sortKey) {
    case 'discount':
      return list.sort((a, b) => discountPct(b) - discountPct(a) || savedDollars(b) - savedDollars(a));
    case 'savings':
      return list.sort((a, b) => savedDollars(b) - savedDollars(a) || discountPct(b) - discountPct(a));
    case 'price-low':
      return list.sort((a, b) => a.sale - b.sale);
    case 'price-high':
      return list.sort((a, b) => b.sale - a.sale);
    case 'signal':
    default:
      return list.sort(
        (a, b) =>
          SIGNAL_RANK[a.signal] - SIGNAL_RANK[b.signal] ||
          discountPct(b) - discountPct(a),
      );
  }
}

export function summarize(deals) {
  const totalSaved = deals.reduce((sum, d) => sum + savedDollars(d), 0);
  const avgDiscount =
    deals.length === 0
      ? 0
      : Math.round(deals.reduce((sum, d) => sum + discountPct(d), 0) / deals.length);
  const newLows = deals.filter((d) => d.signal === 'NEW LOW').length;
  const stores = new Set(deals.map((d) => d.store)).size;
  return { count: deals.length, totalSaved, avgDiscount, newLows, stores };
}
