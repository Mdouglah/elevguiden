# Elevguiden

Ett verktyg från Norvay för elever i åk 7–9: öva svenska, engelska och matte i egen takt, och lär dig mer om vänskap, att be om hjälp, grupptryck, livet på nätet och studieteknik.

- `index.html` – hela appen (ingen byggprocess)
- `api/feedback.js` – serverfunktion för AI-feedback på skrivuppgifter (kräver miljövariabeln `ANTHROPIC_API_KEY` i Vercel)
- `fonts/` – typsnitten DM Sans och Newsreader, lokalt

Elevens framsteg sparas bara i webbläsaren (localStorage, nyckeln `elevguiden-v2`). Ljust eller mörkt läge sparas under `norvay-tema`. Text i skrivuppgifter och meddelanden skickas till Anthropic för att skapa feedback och sparas inte av appen.
