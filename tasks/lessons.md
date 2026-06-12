# Lessons

_Errors hit and fixed during build._

1. **`no-html-link-for-pages` lint-fail:** interne navigatie (`/`, `/privacy/`) moet via `next/link`, niet `<a>`. Gefixt in Nav, Footer en not-found; anchor-links (`#...`) blijven gewone `<a>`.
