// Singapore in Numbers — the figures.
//
// Every number below was checked against an official publication and carries
// its source. Figures are shown exactly as published; nothing here is
// estimated, interpolated or rounded beyond the publisher's own rounding.
// Retrieval date for every source: 26 November 2026.
//
// Sources (short keys; full citations on the Sources page):
//   PIB25   Population in Brief 2025, NPTD / Department of Statistics
//   ESS24   Economic Survey of Singapore 2024, Ministry of Trade and Industry
//   CPI25   Consumer Price Developments in December 2025, MAS / MTI
//   MOM-U   Unemployment, stats.mom.gov.sg (Labour Force Survey)
//   MOM-I   Gross Monthly Income from Employment, stats.mom.gov.sg (CLFS)
//   HDB-RPI HDB Resale Price Index, Housing & Development Board
//   DOS-PT  Population Trends / SingStat Key Indicators
//   DOS-LT  Complete Life Tables for Singapore Resident Population, DOS
//   ICA-RBD Report on Registration of Births and Deaths 2024, ICA
//   WB-WDI  World Bank, World Development Indicators

export const RETRIEVED = '26 November 2026';

export const SOURCES = [
  {
    key: 'PIB25',
    publisher: 'National Population and Talent Division (NPTD) and Department of Statistics',
    title: 'Population in Brief 2025: Key Trends',
    note: 'Total population 6.11 million at end-June 2025; citizens 3.66m, permanent residents 0.54m, non-residents 1.91m; resident total fertility rate 0.97 in 2024; 29,237 citizen births in 2024; 20.7% of citizens aged 65 and over.',
  },
  {
    key: 'ESS24',
    publisher: 'Ministry of Trade and Industry',
    title: 'Economic Survey of Singapore 2024 (February 2025)',
    note: 'Nominal GDP S$731.4 billion in 2024; real GDP growth 4.4% in 2024 (1.8% in 2023); GDP per capita S$101,464 in 2024 (S$93,592 in 2023).',
  },
  {
    key: 'CPI25',
    publisher: 'Monetary Authority of Singapore and Ministry of Trade and Industry',
    title: 'Consumer Price Developments in December 2025 (23 January 2026)',
    note: 'CPI-All Items inflation averaged 0.9% in 2025, down from 2.4% in 2024; MAS Core Inflation averaged 0.7% in 2025, down from 2.8% in 2024.',
  },
  {
    key: 'MOM-U',
    publisher: 'Ministry of Manpower, Manpower Research and Statistics Department',
    title: 'Unemployment (Labour Force Survey), stats.mom.gov.sg',
    note: 'Overall unemployment rate, annual average: 2.0% in 2024 and 2.0% in 2025; resident rate 2.7% in 2024; citizen rate 2.9% in 2024.',
  },
  {
    key: 'MOM-I',
    publisher: 'Ministry of Manpower, Manpower Research and Statistics Department',
    title: 'Gross Monthly Income from Employment (Comprehensive Labour Force Survey)',
    note: 'Median gross monthly income from employment of full-time employed residents, including employer CPF contributions, mid-year: S$5,500 in 2024 and S$5,775 in 2025.',
  },
  {
    key: 'HDB-RPI',
    publisher: 'Housing and Development Board',
    title: 'HDB Resale Price Index (1Q2009 = 100)',
    note: 'Quarterly index: 183.7 (1Q 2024), 187.9 (2Q 2024), 192.9 (3Q 2024), 197.9 (4Q 2024), 201.0 (1Q 2025), 202.9 (2Q 2025), 203.7 (3Q 2025), 203.6 (4Q 2025). Full-year change +9.7% in 2024 and +2.9% in 2025.',
  },
  {
    key: 'DOS-PT',
    publisher: 'Department of Statistics',
    title: 'Population Trends 2025 and SingStat Key Indicators',
    note: 'Resident old-age support ratio 3.3 in June 2025; home ownership rate 90.8% in 2024; mean years of schooling 11.8 years in 2024 (residents aged 25 and over).',
  },
  {
    key: 'DOS-LT',
    publisher: 'Department of Statistics',
    title: 'Complete Life Tables for Singapore Resident Population 2024',
    note: 'Life expectancy at birth for residents: 83.5 years in 2024 (males 81.2 years, females 85.6 years), up from 83.2 years in 2023.',
  },
  {
    key: 'ICA-RBD',
    publisher: 'Immigration and Checkpoints Authority, Registry of Births and Deaths',
    title: 'Report on Registration of Births and Deaths 2024',
    note: '33,703 live births and 26,442 deaths registered in 2024; 79 infant deaths registered in 2024.',
  },
  {
    key: 'WB-WDI',
    publisher: 'World Bank',
    title: 'World Development Indicators',
    note: 'Nominal GDP in current US dollars: US$572.9 billion in 2024 (US$308.0bn in 2015); infant mortality rate 2.2 per 1,000 live births in 2024.',
  },
];

// Total population at end-June, millions. DOS Population Trends / PIB 2025.
export const POPULATION_SERIES = [
  { year: 2015, total: 5.54 },
  { year: 2016, total: 5.61 },
  { year: 2017, total: 5.61 },
  { year: 2018, total: 5.64 },
  { year: 2019, total: 5.70 },
  { year: 2020, total: 5.69 },
  { year: 2021, total: 5.45 },
  { year: 2022, total: 5.64 },
  { year: 2023, total: 5.92 },
  { year: 2024, total: 6.04 },
  { year: 2025, total: 6.11 },
];

// Population composition, end-June 2025, millions. PIB 2025.
export const POPULATION_SPLIT = [
  { label: 'Citizens', value: 3.66, note: '3.66 million' },
  { label: 'Permanent residents', value: 0.54, note: '0.54 million' },
  { label: 'Non-residents', value: 1.91, note: '1.91 million' },
];

// Nominal GDP, S$ billion, current market prices. ESS 2024 / SingStat national accounts.
export const GDP_NOMINAL_SGD = [
  { year: 2015, value: 423.4 },
  { year: 2016, value: 439.9 },
  { year: 2017, value: 468.5 },
  { year: 2018, value: 489.5 },
  { year: 2019, value: 505.1 },
  { year: 2020, value: 480.8 },
  { year: 2021, value: 566.8 },
  { year: 2022, value: 643.5 },
  { year: 2023, value: 678.7 },
  { year: 2024, value: 731.4 },
];

// Nominal GDP, US$ billion, current prices. World Bank WDI.
export const GDP_NOMINAL_USD = [
  { year: 2015, value: 308.0 },
  { year: 2016, value: 320.8 },
  { year: 2017, value: 344.8 },
  { year: 2018, value: 378.0 },
  { year: 2019, value: 376.8 },
  { year: 2020, value: 351.2 },
  { year: 2021, value: 441.1 },
  { year: 2022, value: 514.3 },
  { year: 2023, value: 511.2 },
  { year: 2024, value: 572.9 },
];

// Real GDP growth, % year on year. MTI Economic Surveys.
export const GDP_GROWTH = [
  { year: 2015, value: 3.0 },
  { year: 2016, value: 3.6 },
  { year: 2017, value: 4.5 },
  { year: 2018, value: 3.5 },
  { year: 2019, value: 0.7 },
  { year: 2020, value: -3.8 },
  { year: 2021, value: 7.6 },
  { year: 2022, value: 3.8 },
  { year: 2023, value: 1.8 },
  { year: 2024, value: 4.4 },
];

// CPI-All Items inflation, annual average % change. MAS / MTI Consumer Price Developments.
export const CPI_SERIES = [
  { year: 2015, value: -0.5 },
  { year: 2016, value: -0.5 },
  { year: 2017, value: 0.6 },
  { year: 2018, value: 0.4 },
  { year: 2019, value: 0.6 },
  { year: 2020, value: -0.2 },
  { year: 2021, value: 2.3 },
  { year: 2022, value: 6.1 },
  { year: 2023, value: 4.8 },
  { year: 2024, value: 2.4 },
  { year: 2025, value: 0.9 },
];

// MAS Core Inflation, annual average % change (excludes accommodation and private transport).
export const CORE_SERIES = [
  { year: 2015, value: 0.5 },
  { year: 2016, value: 0.9 },
  { year: 2017, value: 1.5 },
  { year: 2018, value: 1.7 },
  { year: 2019, value: 1.0 },
  { year: 2020, value: -0.3 },
  { year: 2021, value: 0.9 },
  { year: 2022, value: 4.1 },
  { year: 2023, value: 4.2 },
  { year: 2024, value: 2.8 },
  { year: 2025, value: 0.7 },
];

// Overall unemployment rate, annual average, %. MOM Labour Force Survey.
export const UNEMPLOYMENT_SERIES = [
  { year: 2016, value: 2.1 },
  { year: 2017, value: 2.2 },
  { year: 2018, value: 2.1 },
  { year: 2019, value: 2.2 },
  { year: 2020, value: 3.0 },
  { year: 2021, value: 2.8 },
  { year: 2022, value: 2.1 },
  { year: 2023, value: 1.9 },
  { year: 2024, value: 2.0 },
  { year: 2025, value: 2.0 },
];

// Median gross monthly income from employment, full-time employed residents,
// including employer CPF contributions, mid-year, S$. MOM Comprehensive Labour Force Survey.
export const INCOME_SERIES = [
  { year: 2015, value: 3949 },
  { year: 2016, value: 4056 },
  { year: 2017, value: 4232 },
  { year: 2018, value: 4437 },
  { year: 2019, value: 4563 },
  { year: 2020, value: 4534 },
  { year: 2021, value: 4680 },
  { year: 2022, value: 5070 },
  { year: 2023, value: 5197 },
  { year: 2024, value: 5500 },
  { year: 2025, value: 5775 },
];

// HDB Resale Price Index, quarterly, 1Q2009 = 100. HDB.
export const HDB_RPI_SERIES = [
  { label: '1Q 2024', value: 183.7 },
  { label: '2Q 2024', value: 187.9 },
  { label: '3Q 2024', value: 192.9 },
  { label: '4Q 2024', value: 197.9 },
  { label: '1Q 2025', value: 201.0 },
  { label: '2Q 2025', value: 202.9 },
  { label: '3Q 2025', value: 203.7 },
  { label: '4Q 2025', value: 203.6 },
];

// Life expectancy at birth, residents, years — selected years published by DOS.
// DOS notes the 2020–2023 figures were affected by elevated COVID-19 mortality,
// so this chart shows the published milestones rather than every year.
export const LIFE_EXPECTANCY = [
  { year: 2014, value: 82.6 },
  { year: 2019, value: 83.7 },
  { year: 2023, value: 83.2 },
  { year: 2024, value: 83.5 },
];

// Headline facts for the overview page. Each value names its source key.
export const HEADLINES = [
  { label: 'Total population', value: '6.11m', detail: 'End-June 2025, up 1.2% on a year earlier', source: 'PIB25' },
  { label: 'Nominal GDP', value: 'S$731.4bn', detail: '2024, at current market prices', source: 'ESS24' },
  { label: 'GDP per person', value: 'S$101,464', detail: '2024, up from S$93,592 in 2023', source: 'ESS24' },
  { label: 'Real GDP growth', value: '+4.4%', detail: '2024, after +1.8% in 2023', source: 'ESS24' },
  { label: 'Inflation (CPI-All Items)', value: '2.4%', detail: '2024 annual average; 0.9% in 2025', source: 'CPI25' },
  { label: 'Unemployment (overall)', value: '2.0%', detail: '2024 annual average; 2.0% in 2025', source: 'MOM-U' },
  { label: 'Median monthly income', value: 'S$5,775', detail: 'June 2025, full-time employed residents, incl. employer CPF', source: 'MOM-I' },
  { label: 'Home ownership rate', value: '90.8%', detail: 'Resident households, 2024', source: 'DOS-PT' },
  { label: 'Life expectancy at birth', value: '83.5 years', detail: 'Residents, 2024 (men 81.2, women 85.6)', source: 'DOS-LT' },
];
