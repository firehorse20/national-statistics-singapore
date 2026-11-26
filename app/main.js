// Singapore in Numbers — routing and controls.
//
//   #/            overview
//   #/population  #/economy  #/prices  #/labour  #/housing  #/health  #/sources
//
// Each route keeps its own control state (year range, chart/table, units).
// Clicking a control updates that route's state and re-renders in place.
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  overview,
  populationPage,
  economyPage,
  pricesPage,
  labourPage,
  housingPage,
  healthPage,
  sourcesPage,
  missingPage,
} from './views.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('nav.main-nav a'));

const ROUTES = {
  '': { title: 'Singapore in Numbers', render: overview },
  population: { title: 'Population | Singapore in Numbers', render: populationPage },
  economy: { title: 'Economy | Singapore in Numbers', render: economyPage },
  prices: { title: 'Prices | Singapore in Numbers', render: pricesPage },
  labour: { title: 'Labour | Singapore in Numbers', render: labourPage },
  housing: { title: 'Housing | Singapore in Numbers', render: housingPage },
  health: { title: 'Health | Singapore in Numbers', render: healthPage },
  sources: { title: 'Sources | Singapore in Numbers', render: sourcesPage },
};

const DEFAULT_STATE = { range: 'all', view: 'chart', unit: 'sgd' };
const stateByRoute = {};

function stateFor(route) {
  if (!stateByRoute[route]) {
    const s = { ...DEFAULT_STATE };
    if (route === 'population') s.unit = 'm';
    if (route === 'labour') s.unit = 'month';
    stateByRoute[route] = s;
  }
  return stateByRoute[route];
}

// Control groups that belong to a route's state under a different name.
function routeForControl(page) {
  if (page === 'economy-growth') return 'economy';
  if (page === 'labour-income') return 'labour';
  return page;
}

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#\/?/, '').split('/')[0];
  const entry = ROUTES[route];
  const state = stateFor(route);
  document.title = entry ? entry.title : 'Page not found | Singapore in Numbers';
  app.innerHTML = entry ? entry.render(state) : missingPage();
  for (const link of navLinks) {
    const href = link.getAttribute('href');
    const linkRoute = href.replace(/^#\/?/, '');
    link.classList.toggle('active', linkRoute === route);
    if (linkRoute === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

app.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-control]');
  if (!btn) return;
  const route = routeForControl(btn.getAttribute('data-page'));
  const state = stateFor(route);
  const control = btn.getAttribute('data-control');
  const value = btn.getAttribute('data-value');
  if (control === 'range') state.range = value;
  else if (control === 'view') state.view = value;
  else if (control === 'unit') state.unit = value;
  else return;
  render();
});

window.addEventListener('hashchange', render);
render();
