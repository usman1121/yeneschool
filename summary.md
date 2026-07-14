## Summary

### Objective
- Fix Amharic translations so all pages display in Amharic; replace incomplete `am.js` with complete version matching `en.js`; refactor `ModulesPage.jsx` to use `t()` instead of hardcoded English

### Important Details
- Site hosted on GitHub + Vercel; Vercel runs `npm run build` on deploy
- Do not push until user says so
- Brace mismatch in `am.js` was fixed: 164 `{` / 164 `}` — root cause was missing `home` close (line 343) plus stray `  },` at line 988
- `node --check` and Vite build both pass

### Work State
#### Completed
- Identified root cause of missing sections: old `am.js` had only 6 top-level sections, `t()` fell back to English for non-homepage pages
- Replaced entire `src/i18n/am.js` with the comprehensive version the user provided (all 14 top-level sections)
- Fixed brace imbalance (164/163 → 164/164) by closing `home` section and removing stray `  },` inside `pageMeta`
- Verified `node --check` and Vite build both pass
- Added `modules.details.lessons` key to both `src/i18n/en.js` and `src/i18n/am.js`
- Added `modules.tagCloud` section (kicker + 24 domains array) to both `src/i18n/en.js` and `src/i18n/am.js`
- Refactored `src/pages/ModulesPage.jsx`:
  - Tag cloud now uses `t("modules.tagCloud.kicker")` and `t("modules.tagCloud.domains")` instead of hardcoded English array
  - Module checklist heading/See pricing now use `t("modules.checklist.title")`, `t("modules.checklist.subtitle")`, `t("modules.checklist.viewPricing")`
  - All 23 module detail cards rendered from a `moduleCards` data array via `map()`, each calling `t(\`modules.details.${card.key}.title\`)`, `desc`, and `items` — matching the pattern already used by the Communication card
- Total code reduction: `ModulesPage.jsx` went from 270 lines to 140 lines

#### Active
- None

#### Blocked
- None

### Relevant Files
- `src/i18n/en.js`: reference structure; now includes `modules.details.lessons` and `modules.tagCloud`
- `src/i18n/am.js`: brace-balanced; now includes `modules.details.lessons` (Amharic) and `modules.tagCloud` (Amharic domain names)
- `src/pages/ModulesPage.jsx`: fully refactored to use `t()` — all 23 cards data-driven, no hardcoded English
- `src/i18n/I18nContext.jsx`: unchanged
