// HTML for each page of Singapore in Numbers, built from data.js.
// Every figure on a page names its source; every chart has a table twin.
// Controls are plain buttons; main.js re-renders on click.

import {
  RETRIEVED,
  SOURCES,
  POPULATION_SERIES,
  POPULATION_SPLIT,
  GDP_NOMINAL_SGD,
  GDP_NOMINAL_USD,
  GDP_GROWTH,
  CPI_SERIES,
  CORE_SERIES,
  UNEMPLOYMENT_SERIES,
  INCOME_SERIES,
  HDB_RPI_SERIES,
  LIFE_EXPECTANCY,
  HEADLINES,
} from './data.js';
import { lineChart, barChart, dualLineChart, donutChart, dataTable, CHART_COLORS } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function sourceByKey(key) {
  return SOURCES.find((s) => s.key === key);
}

export function sourceLine(keys) {
  const names = keys
    .map((k) => {
      const s = sourceByKey(k);
      return s ? `${s.publisher}, ${s.title}` : k;
    })
    .join('; ');
  return `<p class="source-line">Source: ${esc(names)}. Figures retrieved ${esc(RETRIEVED)}.</p>`;
}

function kpiCard(h) {
  return `<div class="kpi">
    <div class="label">${esc(h.label)}</div>
    <div class="value">${esc(h.value)}</div>
    <div class="detail">${esc(h.detail)}</div>
    <div class="src">Source: ${esc(sourceByKey(h.source).publisher)}</div>
  </div>`;
}

// Keep only the years inside the selected range.
export function inRange(series, range) {
  if (range === 'early') return series.filter((p) => p.year <= 2019);
  if (range === 'late') return series.filter((p) => p.year >= 2020);
  return series;
}

function rangeControls(state, id) {
  return `<div class="controls" role="group" aria-label="Year range">
    <span class="group-label">Years:</span>
    <button class="range-btn" data-control="range" data-page="${id}" data-value="all" aria-pressed="${state.range === 'all'}">2015–2025</button>
    <button class="range-btn" data-control="range" data-page="${id}" data-value="early" aria-pressed="${state.range === 'early'}">2015–2019</button>
    <button class="range-btn" data-control="range" data-page="${id}" data-value="late" aria-pressed="${state.range === 'late'}">2020–2025</button>
  </div>`;
}

function viewControls(state, id) {
  return `<div class="controls" role="group" aria-label="Display">
    <span class="group-label">Show as:</span>
    <button class="toggle" data-control="view" data-page="${id}" data-value="chart" aria-pressed="${state.view === 'chart'}">Chart</button>
    <button class="toggle" data-control="view" data-page="${id}" data-value="table" aria-pressed="${state.view === 'table'}">Table</button>
  </div>`;
}

function unitControls(state, id, options) {
  const btns = options
    .map(
      (o) =>
        `<button class="toggle" data-control="unit" data-page="${id}" data-value="${o.value}" aria-pressed="${state.unit === o.value}">${esc(o.label)}</button>`,
    )
    .join('');
  return `<div class="controls" role="group" aria-label="Units"><span class="group-label">Units:</span>${btns}</div>`;
}

function chartOrTable(state, chartHtml, tableHtml) {
  return state.view === 'table' ? tableHtml : chartHtml;
}

// ---------------------------------------------------------------- overview

export function overview() {
  const kpis = HEADLINES.slice(0, 6).map(kpiCard).join('');
  const popPts = POPULATION_SERIES.map((p) => ({ x: String(p.year), y: p.total }));
  const gdpPts = GDP_NOMINAL_SGD.map((p) => ({ x: String(p.year), y: p.value }));
  const cpiPts = CPI_SERIES.map((p) => ({ x: String(p.year), y: p.value }));
  const slices = POPULATION_SPLIT.map((s, i) => ({
    ...s,
    color: [CHART_COLORS.teal, CHART_COLORS.amber, '#7c8aa5'][i],
  }));
  return `
<p class="kicker">Singapore &middot; Updated ${esc(RETRIEVED)}</p>
<h1>Singapore in Numbers</h1>
<p class="lede">One country, one page per question. Population, the economy, prices,
jobs, housing and health — every figure traced to the official publication
that released it.</p>
<div class="kpi-grid">${kpis}</div>

<div class="card">
  <h3>Who lives here — 6.11 million people, June 2025</h3>
  <div class="split">
    <div class="donut-box">${donutChart(slices, { centre: '6.11m', centreSub: 'total population' })}
      <ul class="legend-list">
        ${POPULATION_SPLIT.map((s, i) => `<li><span><span class="swatch" style="display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;background:${['#0f766e', '#d97706', '#7c8aa5'][i]}"></span>${esc(s.label)}</span><strong>${esc(s.note)}</strong></li>`).join('')}
      </ul>
    </div>
    <div>
      <p>The resident population — citizens plus permanent residents — is
      4.20 million. The other 1.91 million are non-residents: foreign workers,
      dependants and students. Growth in the last year came mostly from the
      non-resident population, up 2.7%, while citizens grew 0.7%.</p>
      <p><a href="#/population">Population in full &rarr;</a></p>
    </div>
  </div>
  ${sourceLine(['PIB25'])}
</div>

<div class="card">
  <h3>How big is the economy?</h3>
  ${lineChart(gdpPts, { unit: 'sgd-bn' })}
  <p>Nominal GDP reached S$731.4 billion in 2024, and the economy grew 4.4%
  in real terms after 1.8% in 2023. GDP per person was S$101,464.</p>
  <p><a href="#/economy">Economy in full &rarr;</a></p>
  ${sourceLine(['ESS24'])}
</div>

<div class="card">
  <h3>Inflation has come back down</h3>
  ${lineChart(cpiPts, { unit: 'pct', color: CHART_COLORS.amber })}
  <p>CPI-All Items inflation averaged 0.9% in 2025, after 2.4% in 2024 and a
  peak of 6.1% in 2022. Core inflation, which leaves out accommodation and
  private transport, averaged 0.7% in 2025.</p>
  <p><a href="#/prices">Prices in full &rarr;</a></p>
  ${sourceLine(['CPI25'])}
</div>

<div class="callout"><p><strong>How to read this site.</strong> Every page shows its
figures as a chart and as a table — switch with the “Show as” buttons. Year
ranges and units change the chart in place. The Sources page lists the exact
publication behind every number, and the date it was checked.</p></div>
`;
}

// ---------------------------------------------------------------- population

export function populationPage(state) {
  const pts = inRange(POPULATION_SERIES, state.range).map((p) => ({ x: String(p.year), y: p.total }));
  const fmt = state.unit === 'people' ? (v) => `${(v * 1000000).toLocaleString('en-SG')}` : (v) => `${v} million`;
  const rows = inRange(POPULATION_SERIES, state.range);
  const table = dataTable(rows, [
    { label: 'Year (end-June)', get: (r) => String(r.year) },
    { label: 'Total population', get: (r) => fmt(r.total) },
  ]);
  const chart = lineChart(pts, { unit: 'm' });
  const slices = POPULATION_SPLIT.map((s, i) => ({
    ...s,
    color: [CHART_COLORS.teal, CHART_COLORS.amber, '#7c8aa5'][i],
  }));
  return `
<p class="kicker">People</p>
<h1>Population</h1>
<p class="lede">6.11 million people at end-June 2025 — the largest total on record.
Growth has slowed from the post-pandemic rebound, and the population keeps
ageing.</p>
<div class="kpi-grid">
  ${kpiCard(HEADLINES[0])}
  <div class="kpi"><div class="label">Residents (citizens + PRs)</div><div class="value">4.20m</div><div class="detail">Citizens 3.66m, permanent residents 0.54m</div><div class="src">Source: NPTD / Department of Statistics</div></div>
  <div class="kpi"><div class="label">Citizens aged 65 and over</div><div class="value">20.7%</div><div class="detail">June 2025, up from 13.1% a decade earlier</div><div class="src">Source: NPTD / Department of Statistics</div></div>
</div>

<div class="card">
  <h3>Who lives here — end-June 2025</h3>
  <div class="split">
    <div class="donut-box">${donutChart(slices, { centre: '6.11m', centreSub: 'total population' })}</div>
    <div>
      <ul class="legend-list">
        ${POPULATION_SPLIT.map((s, i) => `<li><span><span class="swatch" style="display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;background:${['#0f766e', '#d97706', '#7c8aa5'][i]}"></span>${esc(s.label)}</span><strong>${esc(s.note)}</strong></li>`).join('')}
      </ul>
      <p>There are 3.3 residents of working age (20–64) for each resident aged
      65 and over — the old-age support ratio in June 2025. A decade ago it
      was about 7.4.</p>
    </div>
  </div>
  ${sourceLine(['PIB25', 'DOS-PT'])}
</div>

<div class="card">
  <h3>Total population, 2015–2025</h3>
  ${rangeControls(state, 'population')}
  ${unitControls(state, 'population', [
    { value: 'm', label: 'Millions' },
    { value: 'people', label: 'People' },
  ])}
  ${viewControls(state, 'population')}
  ${chartOrTable(state, chart, table)}
  <p>The total fell in 2021 as non-residents left during the pandemic, then
  rose sharply in 2022 and 2023 as workers returned. Resident growth has been
  slow and steady throughout.</p>
  ${sourceLine(['PIB25'])}
</div>

<div class="card">
  <h3>Births and fertility</h3>
  <ul class="fact-list">
    <li><strong>29,237</strong> — citizen births in 2024, up 1.2% from 28,877 in 2023.</li>
    <li><strong>0.97</strong> — resident total fertility rate in 2024, unchanged from 2023.</li>
    <li><strong>22,955</strong> — citizen marriages in 2024, down 5.7% from 24,355 in 2023.</li>
    <li><strong>43.7 years</strong> — median age of citizens, June 2025 (43.4 a year earlier).</li>
  </ul>
  ${sourceLine(['PIB25'])}
</div>
`;
}

// ---------------------------------------------------------------- economy

export function economyPage(state) {
  const gdpSeries = state.unit === 'usd' ? GDP_NOMINAL_USD : GDP_NOMINAL_SGD;
  const unit = state.unit === 'usd' ? 'usd-bn' : 'sgd-bn';
  const money = state.unit === 'usd' ? 'US$' : 'S$';
  const gdpPts = inRange(gdpSeries, state.range).map((p) => ({ x: String(p.year), y: p.value }));
  const growthPts = inRange(GDP_GROWTH, state.range).map((p) => ({ x: String(p.year), y: p.value }));
  const gdpRows = inRange(gdpSeries, state.range);
  const gdpTable = dataTable(gdpRows, [
    { label: 'Year', get: (r) => String(r.year) },
    { label: `Nominal GDP (${money} bn)`, get: (r) => r.value.toFixed(1) },
  ]);
  const growthTable = dataTable(inRange(GDP_GROWTH, state.range), [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'Real GDP growth (%)', get: (r) => (r.value > 0 ? '+' : '') + r.value.toFixed(1) },
  ]);
  return `
<p class="kicker">Output</p>
<h1>Economy</h1>
<p class="lede">A small, open, high-income economy. Nominal GDP was S$731.4 billion
in 2024 — about US$572.9 billion — and real growth of 4.4% beat the 1.8% of
2023.</p>
<div class="kpi-grid">
  ${kpiCard(HEADLINES[1])}
  ${kpiCard(HEADLINES[2])}
  ${kpiCard(HEADLINES[3])}
</div>

<div class="card">
  <h3>Nominal GDP, 2015–2024</h3>
  ${rangeControls(state, 'economy')}
  ${unitControls(state, 'economy', [
    { value: 'sgd', label: 'S$ billion' },
    { value: 'usd', label: 'US$ billion' },
  ])}
  ${viewControls(state, 'economy')}
  ${chartOrTable(state, barChart(gdpPts, { unit }), gdpTable)}
  <p>Output dipped in 2020 with the pandemic, then jumped in 2021 and 2022 as
  trade and manufacturing recovered. In US dollars the 2023 figure is lower
  than 2022 because the Singapore dollar strengthened, not because output fell.</p>
  ${sourceLine(['ESS24', 'WB-WDI'])}
</div>

<div class="card">
  <h3>Real GDP growth, 2015–2024</h3>
  ${viewControls(state, 'economy-growth')}
  ${chartOrTable(state, barChart(growthPts, { unit: 'pct' }), growthTable)}
  <p>Growth averaged about 3% a year before the pandemic, fell 3.8% in 2020,
  then rebounded 7.6% in 2021. The 2024 figure of 4.4% was the strongest
  since the rebound.</p>
  ${sourceLine(['ESS24'])}
</div>

<div class="card">
  <h3>What the economy is made of</h3>
  <p>Manufacturing, wholesale trade, and finance and insurance are the three
  largest industries by value added, followed by business services and
  information and communications. The economy is heavily trade-oriented:
  exports of goods and services are worth well over one and a half times GDP.</p>
  <p class="small">Industry shares are published in the Economic Survey of
  Singapore 2024, “Structure of the Economy” (share of nominal value added).
  This page names the largest industries without reprinting the chart.</p>
  ${sourceLine(['ESS24'])}
</div>
`;
}

// ---------------------------------------------------------------- prices

export function pricesPage(state) {
  const cpiPts = inRange(CPI_SERIES, state.range).map((p) => ({ x: String(p.year), y: p.value }));
  const corePts = inRange(CORE_SERIES, state.range).map((p) => ({ x: String(p.year), y: p.value }));
  const rows = inRange(CPI_SERIES, state.range);
  const table = dataTable(
    rows.map((r) => ({ ...r, core: CORE_SERIES.find((c) => c.year === r.year)?.value })),
    [
      { label: 'Year', get: (r) => String(r.year) },
      { label: 'CPI-All Items (%)', get: (r) => r.value.toFixed(1) },
      { label: 'MAS Core (%)', get: (r) => (r.core === undefined ? '—' : r.core.toFixed(1)) },
    ],
  );
  const chart = dualLineChart(cpiPts, corePts, { unit: 'pct' });
  return `
<p class="kicker">Cost of living</p>
<h1>Prices</h1>
<p class="lede">Inflation surged to 6.1% in 2022, then fell for three straight
years. In 2025 it averaged 0.9% — the lowest since the pandemic year of 2020.</p>
<div class="kpi-grid">
  ${kpiCard(HEADLINES[4])}
  <div class="kpi"><div class="label">MAS Core Inflation</div><div class="value">2.8%</div><div class="detail">2024 annual average; 0.7% in 2025</div><div class="src">Source: MAS / MTI</div></div>
  <div class="kpi"><div class="label">CPI peak, recent cycle</div><div class="value">6.1%</div><div class="detail">2022 annual average, the highest since 2008</div><div class="src">Source: MAS / MTI</div></div>
</div>

<div class="card">
  <h3>Headline vs core inflation, 2015–2025</h3>
  ${rangeControls(state, 'prices')}
  ${viewControls(state, 'prices')}
  <div class="legend"><span><span class="swatch" style="background:#0f766e"></span>CPI-All Items</span><span><span class="swatch" style="background:#d97706"></span>MAS Core (excl. accommodation &amp; private transport)</span></div>
  ${chartOrTable(state, chart, table)}
  <p>Core inflation strips out accommodation and private transport — the two
  most volatile parts of the basket. It peaked later than headline inflation
  and stayed higher through 2023 and 2024, then fell below headline in 2025.</p>
  ${sourceLine(['CPI25'])}
</div>

<div class="card">
  <h3>What drove the 2022 peak?</h3>
  <p>Global energy and food prices jumped after the invasion of Ukraine, while
  Singapore raised its goods and services tax from 7% to 8% in January 2023
  and to 9% in January 2024. As energy prices eased and the GST effect faded,
  both measures fell back through 2024 and 2025.</p>
  ${sourceLine(['CPI25'])}
</div>
`;
}

// ---------------------------------------------------------------- labour

export function labourPage(state) {
  const pts = inRange(UNEMPLOYMENT_SERIES, state.range).map((p) => ({ x: String(p.year), y: p.value }));
  const table = dataTable(inRange(UNEMPLOYMENT_SERIES, state.range), [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'Overall unemployment (%)', get: (r) => r.value.toFixed(1) },
  ]);
  const incomePts = inRange(INCOME_SERIES, state.range).map((p) => ({
    x: String(p.year),
    y: state.unit === 'year' ? p.value * 12 : p.value,
  }));
  const incomeTable = dataTable(inRange(INCOME_SERIES, state.range), [
    { label: 'Year (June)', get: (r) => String(r.year) },
    {
      label: state.unit === 'year' ? 'Median income, annual (S$)' : 'Median income, monthly (S$)',
      get: (r) => (state.unit === 'year' ? (r.value * 12).toLocaleString('en-SG') : r.value.toLocaleString('en-SG')),
    },
  ]);
  return `
<p class="kicker">Jobs &amp; pay</p>
<h1>Labour</h1>
<p class="lede">Unemployment has stayed at or below 3% for a decade, and the
median full-time resident worker earned S$5,775 a month in June 2025.</p>
<div class="kpi-grid">
  ${kpiCard(HEADLINES[5])}
  ${kpiCard(HEADLINES[6])}
  <div class="kpi"><div class="label">Resident unemployment</div><div class="value">2.7%</div><div class="detail">2024 annual average (citizens 2.9%)</div><div class="src">Source: MOM, Labour Force Survey</div></div>
</div>

<div class="card">
  <h3>Unemployment, 2016–2025</h3>
  ${rangeControls(state, 'labour')}
  ${viewControls(state, 'labour')}
  ${chartOrTable(state, lineChart(pts, { unit: 'pct' }), table)}
  <p>The overall rate counts the whole labour force, residents and
  non-residents. It spiked to 3.0% in 2020, the pandemic year, and has been
  2.0% or lower since 2023. Resident unemployment runs higher — 2.7% in 2024 —
  because it covers only citizens and permanent residents.</p>
  ${sourceLine(['MOM-U'])}
</div>

<div class="card">
  <h3>Median pay keeps rising</h3>
  ${unitControls(state, 'labour-income', [
    { value: 'month', label: 'Per month' },
    { value: 'year', label: 'Per year' },
  ])}
  ${viewControls(state, 'labour-income')}
  ${chartOrTable(state, lineChart(incomePts, { unit: 'sgd' }), incomeTable)}
  <p>Median gross monthly income from employment for full-time employed
  residents, including employer CPF contributions and one-twelfth of annual
  bonuses. It rose 5.0% in nominal terms from 2024 to 2025 and 4.3% after
  inflation — the fastest real gain in the series shown.</p>
  ${sourceLine(['MOM-I'])}
</div>
`;
}

// ---------------------------------------------------------------- housing

export function housingPage(state) {
  const pts = HDB_RPI_SERIES.map((p) => ({ x: p.label, y: p.value }));
  const table = dataTable(HDB_RPI_SERIES, [
    { label: 'Quarter', get: (r) => r.label },
    { label: 'Resale Price Index', get: (r) => r.value.toFixed(1) },
  ]);
  return `
<p class="kicker">Where people live</p>
<h1>Housing</h1>
<p class="lede">Nine in ten resident households own their home, most of them a
public flat built by the Housing and Development Board. Resale flat prices
rose 9.7% in 2024, then almost levelled off in 2025.</p>
<div class="kpi-grid">
  ${kpiCard(HEADLINES[7])}
  <div class="kpi"><div class="label">HDB Resale Price Index</div><div class="value">203.6</div><div class="detail">4Q 2025 (1Q 2009 = 100); +2.9% over 2025</div><div class="src">Source: Housing and Development Board</div></div>
  <div class="kpi"><div class="label">Resale transactions</div><div class="value">26,042</div><div class="detail">2025, down from 28,986 in 2024</div><div class="src">Source: HDB quarterly data</div></div>
</div>

<div class="card">
  <h3>HDB resale prices, quarterly</h3>
  ${viewControls(state, 'housing')}
  ${chartOrTable(state, lineChart(pts, {}), table)}
  <p>The index tracks overall price movements in the public resale market and
  uses 1Q 2009 as its base (100). Prices climbed steeply through 2024,
  peaked at 203.7 in 3Q 2025, and were flat to slightly down in the last two
  quarters of 2025.</p>
  ${sourceLine(['HDB-RPI'])}
</div>

<div class="card">
  <h3>How housing works here</h3>
  <ul class="fact-list">
    <li><strong>About 80% of residents</strong> live in HDB flats, and the home ownership rate among resident households is 90.8% (2024).</li>
    <li><strong>New flats</strong> are sold by HDB in Build-to-Order (BTO) exercises; buyers typically wait years between application and keys.</li>
    <li><strong>Resale flats</strong> can be bought on the open market once a flat has passed its five-year minimum occupation period.</li>
    <li><strong>1,574</strong> resale flats changed hands for S$1 million or more in 2025, a record, up from 1,035 in 2024.</li>
  </ul>
  ${sourceLine(['HDB-RPI', 'DOS-PT'])}
</div>
`;
}

// ---------------------------------------------------------------- health

export function healthPage(state) {
  const pts = LIFE_EXPECTANCY.map((p) => ({ x: String(p.year), y: p.value }));
  const table = dataTable(LIFE_EXPECTANCY, [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'Life expectancy at birth (years)', get: (r) => r.value.toFixed(1) },
  ]);
  const genderBars = [
    { x: 'Men', y: 81.2 },
    { x: 'Women', y: 85.6 },
  ];
  return `
<p class="kicker">Health &amp; learning</p>
<h1>Health</h1>
<p class="lede">Singaporeans live among the longest lives in the world: 83.5
years at birth in 2024. Infant deaths are rare — about 2 in every 1,000 live
births.</p>
<div class="kpi-grid">
  ${kpiCard(HEADLINES[8])}
  <div class="kpi"><div class="label">Infant mortality</div><div class="value">2.2</div><div class="detail">Deaths per 1,000 live births, 2024</div><div class="src">Source: World Bank, WDI</div></div>
  <div class="kpi"><div class="label">Mean years of schooling</div><div class="value">11.8</div><div class="detail">Residents aged 25 and over, 2024 (10.6 in 2014)</div><div class="src">Source: Department of Statistics</div></div>
</div>

<div class="card">
  <h3>Life expectancy at birth, selected years</h3>
  ${viewControls(state, 'health')}
  ${chartOrTable(state, barChart(pts, { unit: 'years' }), table)}
  <p>Life expectancy reached a pre-pandemic high of 83.7 years in 2019, dipped
  during the COVID-19 years, and recovered to 83.5 years in 2024. The
  Department of Statistics notes that the 2020–2023 figures reflect elevated
  mortality during the pandemic and should not be read as a forecast.</p>
  ${sourceLine(['DOS-LT'])}
</div>

<div class="card">
  <h3>Women live 4.4 years longer than men</h3>
  ${barChart(genderBars, { unit: 'years' })}
  <p>Life expectancy at birth in 2024: 81.2 years for men and 85.6 years for
  women. At age 65, residents could expect a further 21.2 years of life.</p>
  ${sourceLine(['DOS-LT'])}
</div>

<div class="card">
  <h3>Births, deaths and schooling</h3>
  <ul class="fact-list">
    <li><strong>33,703</strong> live births registered in 2024; <strong>26,442</strong> deaths; <strong>79</strong> infant deaths.</li>
    <li><strong>64.4%</strong> of residents aged 25 and over held a post-secondary or higher qualification in 2024, up from 51.2% a decade earlier.</li>
    <li><strong>37.3%</strong> of residents aged 25 and over were university graduates in 2024.</li>
  </ul>
  ${sourceLine(['ICA-RBD', 'DOS-PT'])}
</div>
`;
}

// ---------------------------------------------------------------- sources

export function sourcesPage() {
  const items = SOURCES.map(
    (s) => `<li><span class="key">${esc(s.key)}</span> — <strong>${esc(s.publisher)}</strong>,
      <em>${esc(s.title)}</em>. ${esc(s.note)}</li>`,
  ).join('');
  return `
<p class="kicker">About the data</p>
<h1>Sources</h1>
<p class="lede">Every figure on this site comes from one of the publications
below. All figures were checked against the original releases on
${esc(RETRIEVED)}; nothing is estimated, modelled or carried over from a
secondary round-up.</p>

<div class="card">
  <h3>Publications</h3>
  <ul class="source-list">${items}</ul>
</div>

<div class="card">
  <h3>Definitions worth knowing</h3>
  <ul class="fact-list">
    <li><strong>Resident</strong> means a Singapore citizen or permanent resident. The <strong>total population</strong> adds non-residents: foreign workers, dependants and students.</li>
    <li><strong>MAS Core Inflation</strong> excludes accommodation and private transport from the CPI basket.</li>
    <li><strong>Overall unemployment</strong> covers the whole labour force; the <strong>resident rate</strong> covers citizens and permanent residents only.</li>
    <li><strong>Median income</strong> is gross monthly income from employment of full-time employed residents, including employer CPF contributions and one-twelfth of annual bonuses.</li>
    <li><strong>HDB Resale Price Index</strong> tracks price movements in the public resale market; 1Q 2009 = 100.</li>
  </ul>
</div>

<div class="card">
  <h3>What this site leaves out</h3>
  <p>Figures that could not be traced to a primary official release are not
  shown. Where a publisher revised a series, the latest release is used and
  the older vintage is not mixed in. Life expectancy for 2020–2022 is shown
  only through the published milestones because the Department of Statistics
  flags those years as pandemic-affected.</p>
  <p class="small">Singapore in Numbers is an independent reference site. It
  is not affiliated with, or endorsed by, the Department of Statistics or any
  government agency. Figures are reproduced with attribution; check the
  original publications before quoting them elsewhere.</p>
</div>
`;
}

export function missingPage() {
  return `<h1>Page not found</h1>
<p>There is no section at this address. Try one of the sections above, or
<a href="#/">go back to the overview</a>.</p>`;
}
