#!/usr/bin/env bash
set -euo pipefail

# SEO Audit Script for dasgermanbot.com
# Run: bash scripts/seo-audit.sh
# Checks: sitemap duplicates, meta tags, canonicals, HSTS, alt texts, hreflang

SITE="https://dasgermanbot.com"
ROOT="/home/oleg/projects/dasgermanbot-landing"
ISSUES=0

echo "=== SEO Audit: $(date -u '+%Y-%m-%d %H:%M UTC') ==="
echo ""

# 1. Sitemap duplicate check
echo "--- 1. Sitemap Duplicates ---"
TOTAL=$(curl -s "$SITE/sitemap.xml" | grep -c '<loc>' 2>/dev/null || echo "0")
UNIQUE=$(curl -s "$SITE/sitemap.xml" | grep -oP '<loc>\K[^<]+' 2>/dev/null | sort -u | wc -l)
DUPES=$((TOTAL - UNIQUE))
if [ "$DUPES" -gt 0 ]; then
    echo "ISSUE: $DUPES duplicate URLs in sitemap"
    ISSUES=$((ISSUES + 1))
else
    echo "OK: $UNIQUE unique URLs"
fi

# 2. Duplicate slugs detection (local)
echo ""
echo "--- 2. Check blog manifest for duplicate slugs ---"
if [ -f "$ROOT/blog/manifest.json" ]; then
    SLUG_COUNT=$(python3 -c "import json; d=json.load(open('$ROOT/blog/manifest.json')); slugs=[a['slug'] for a in d]; dupes=set([s for s in slugs if slugs.count(s)>1]); print(len(dupes))")
    if [ "$SLUG_COUNT" -gt 0 ]; then
        echo "ISSUE: $SLUG_COUNT duplicate slugs in manifest.json"
        python3 -c "import json; d=json.load(open('$ROOT/blog/manifest.json')); slugs=[a['slug'] for a in d]; dupes=set([s for s in slugs if slugs.count(s)>1]); print('\n'.join(dupes))"
        ISSUES=$((ISSUES + 1))
    else
        echo "OK: no duplicate slugs"
    fi
fi

# 3. Canonical check on main pages
echo ""
echo "--- 3. Canonical tags ---"
for page in "/" "/thank-you.html" "/privacy.html" "/terms.html" "/blog/" "/blog/why-learn-german-in-telegram.html"; do
    CANON=$(curl -s "$SITE$page" | grep -oP '<link rel="canonical" href="\K[^"]+' 2>/dev/null || echo "MISSING")
    if [ "$CANON" = "MISSING" ]; then
        echo "ISSUE: $page — no canonical"
        ISSUES=$((ISSUES + 1))
    else
        echo "OK: $page → $CANON"
    fi
done

# 4. Meta description check
echo ""
echo "--- 4. Meta descriptions ---"
for page in "/" "/thank-you.html" "/privacy.html" "/terms.html"; do
    META=$(curl -s "$SITE$page" | grep -oP '<meta name="description" content="\K[^"]+' 2>/dev/null || echo "MISSING")
    if [ "$META" = "MISSING" ]; then
        echo "ISSUE: $page — no meta description"
        ISSUES=$((ISSUES + 1))
    else
        LEN=${#META}
        echo "OK: $page (${LEN} chars)"
    fi
done

# 5. HSTS check
echo ""
echo "--- 5. HSTS Header ---"
HSTS=$(curl -sI "$SITE/" | grep -i 'strict-transport-security' || echo "MISSING")
if echo "$HSTS" | grep -qi "MISSING"; then
    echo "ISSUE: no HSTS header"
    ISSUES=$((ISSUES + 1))
else
    echo "OK: $HSTS"
fi

# 6. Local files: check for alt attributes on images in HTML
echo ""
echo "--- 6. Alt text on images ---"
ALT_MISSING=$(grep -r '<img' "$ROOT" --include="*.html" 2>/dev/null | grep -v 'alt=' | grep -v 'favicon' | grep -v 'tracking' | wc -l)
if [ "$ALT_MISSING" -gt 0 ]; then
    echo "ISSUE: $ALT_MISSING img tags without alt attribute"
    ISSUES=$((ISSUES + 1))
else
    echo "OK: all images have alt text"
fi

echo ""
echo "=== Audit Complete: $ISSUES issues found ==="
exit $ISSUES
