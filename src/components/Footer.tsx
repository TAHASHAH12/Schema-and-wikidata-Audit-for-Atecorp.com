export default function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="eyebrow">Method &amp; provenance</div>
        <h2>How these numbers were produced</h2>
        <ul className="clean" style={{ marginTop: 14 }}>
          <li>
            Every page the site ranks with was examined in full, and every JSON-LD block on it parsed
            and typed. The coverage figures describe the live site, not a template.
          </li>
          <li>
            Catalogue figures come from a random sample of product pages outside that set, each
            checked live with JavaScript executed. The sample size and confidence interval are stated
            alongside the estimate rather than rounded into a single number.
          </li>
          <li>
            Traffic, keyword and competitor data: United States, September 2026. Competitor markup was
            read from their live pages.
          </li>
          <li>
            Every Wikidata identifier was resolved against the live Wikidata API and screened on its
            label, description and class membership. No identifier in this report came from a language
            model.
          </li>
          <li>
            Google requirements were checked against the current developer documentation on the day of
            the audit, not recalled from memory.
          </li>
        </ul>
        <p style={{ marginTop: 22, fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--muted)" }}>
          WLDM &middot; Schema &amp; Wikidata audit &middot; atecorp.com &middot; September 2026
        </p>
      </div>
    </footer>
  );
}
