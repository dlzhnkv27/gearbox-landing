# External Data Summary

This file documents where remote values on the landing page come from, how they are normalized, how derived metrics are calculated, and how raw values are transformed into UI copy.

## Runtime Model

The landing uses a client-side `stale-while-revalidate` pattern in [`public/app.js`](./public/app.js):

1. Static fallback values are rendered from [`src/data/landing.js`](./src/data/landing.js).
2. On page load, the app reads the last successful snapshot from `localStorage`.
3. Cached values are applied immediately when present.
4. A fresh request is sent to the upstream API.
5. The new snapshot is normalized and written back to `localStorage`.
6. The DOM is updated with formatted values.

If the network request fails, the landing keeps the static or cached fallback values.

## Source / Mapping / Formatting Layers

The runtime follows four layers:

1. Source layer
   - Fetches raw JSON from the external endpoint.
2. Mapping / normalization layer
   - Converts raw API payloads into stable landing-specific keys.
3. Formatting layer
   - Transforms raw numeric values into display strings.
4. View layer
   - Astro components render fallback values and annotate dynamic fields with `data-*` hooks for hydration.

## Active Endpoints

### 1. Staking Stats

- Endpoint: [https://charts-server.fly.dev/api/staking_stats](https://charts-server.fly.dev/api/staking_stats)
- Cache key: `gearbox-landing:remote:staking:v3`

Normalized keys:

- `txVolume`
- `savingsTotalSupply`
- `savingsTotalBorrowed`
- `savingsMaxApy`
- `savingsUtilizationRate`

Field mapping:

- `txVolume`
  - Raw source: `payload.txVolume`
  - Used in: `stats-strip`
  - Formatter: `currencyCompactPlus`
  - Example output: `$12.8B+`

- `savingsTotalSupply`
  - Raw source: `sum(payload.supportedVaults[].balanceUSD)`
  - Used in: `Products -> Long-term Savings -> Total Supply`
  - Formatter: `currencyCompact`
  - Example output: `$50.2M`

- `savingsTotalBorrowed`
  - Raw source: `sum(payload.supportedVaults[].borrowedUSD)`
  - Used in: derived metric calculation for `Products -> Long-term Savings`
  - Formatter: `currencyCompact`
  - Example output: `$30.2M`

- `savingsMaxApy`
  - Raw source: `max(payload.supportedVaults[].DepositApy)`
  - Fallback inside reducer: `vault.apr`
  - Used in: `Products -> Long-term Savings -> APY`
  - Formatter: `percentFixed1`
  - Example output: `24.1%`

- `savingsUtilizationRate`
  - Derived source:
    - numerator: `sum(payload.supportedVaults[].borrowedUSD)`
    - denominator: `sum(payload.supportedVaults[].balanceUSD)`
    - formula: `(sumBorrowedUsd / sumBalanceUsd) * 100`
  - Used in: `Products -> Long-term Savings -> Utilization Rate`
  - Formatter: `percentFixed1`
  - Example output: `60.2%`

### 2. Credit Managers Aggregated Stats (All Networks)

- Endpoint: [https://charts-server.fly.dev/api/gearbox/credit_managers/aggregated/stats](https://charts-server.fly.dev/api/gearbox/credit_managers/aggregated/stats)
- Cache key: `gearbox-landing:remote:credit-managers-all-networks:v1`

Normalized keys:

- `primeOpenedAccounts`
- `primeTotalBorrowed`

Field mapping:

- `primeOpenedAccounts`
  - Raw source: `sum(payload.data[].openedAccountsCount)`
  - Used in: `Products -> Prime Brokerage -> Opened Accounts`
  - Formatter: `integerGrouped`
  - Example output: `3,984`

- `primeTotalBorrowed`
  - Raw source: `sum(payload.data[].totalBorrowedInUSD)`
  - Used in: `Products -> Prime Brokerage -> Total Borrowed`
  - Formatter: `currencyCompact`
  - Example output: `$13.5M`

Notes:

- This source is aggregated across all available networks.
- The big `10× MAX` value in `Prime Brokerage` is currently static and is not hydrated from the API.

## Current UI Formatting Rules

Defined in [`public/app.js`](./public/app.js):

- `currencyCompactPlus`
  - Shortens to `K / M / B / T`
  - Keeps `$`
  - Adds trailing `+`
  - Example: `12801212140.08 -> $12.8B+`

- `currencyCompact`
  - Shortens to `K / M / B / T`
  - Keeps `$`
  - No trailing `+`
  - Example: `50164670.01 -> $50.2M`

- `integerGrouped`
  - Rounds and adds thousands separators
  - Example: `3984 -> 3,984`

- `percentFixed1`
  - One decimal place with `%`
  - Example: `24.1235 -> 24.1%`

## Component Hooks

The following components expose the hydrated values:

- [`src/components/sections/StatsStrip.astro`](./src/components/sections/StatsStrip.astro)
  - Uses `data-stat-source`, `data-stat-key`, `data-stat-format`

- [`src/components/ui/ProductCard.astro`](./src/components/ui/ProductCard.astro)
  - Uses `data-product-source`, `data-product-key`, `data-product-format`

Loading state classes:

- Stats: `is-stat-loading`
- Product cards: `is-product-loading`

## Adding New Remote Fields

To add a new API-driven value:

1. Add a stable normalized key inside the relevant source config in [`public/app.js`](./public/app.js).
2. If needed, add a formatter to `remoteFormatters`.
3. Add `apiSource`, `apiField`, and `apiFormat` metadata in [`src/data/landing.js`](./src/data/landing.js).
4. Render the value through a component that exposes the `data-*` hydration hooks.

Do not bind Astro components directly to raw upstream API field names.
