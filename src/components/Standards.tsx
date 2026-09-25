import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;

const EXAMPLE = `{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "MIL-STD-810 Testing Equipment",
  "about": {
    "@type": "DefinedTerm",
    "name": "MIL-STD-810",
    "description": "United States military equipment standard",
    "sameAs": "https://www.wikidata.org/wiki/Q1881501"
  },
  "mentions": [
    { "@type": "Product", "name": "Thermotron environmental chamber" }
  ],
  "publisher": { "@id": "https://www.atecorp.com/#organization" }
}`;

export default function Standards() {
  const t = f.totals;
  const sol = f.coverage.find((c) => c.segment === "SOLUTION");
  return (
    <section className="section" id="standards">
      <div className="container">
        <div className="eyebrow">Standards &amp; application pages</div>
        <h2>The pages that explain <em>why</em> you rent the equipment</h2>
        <p className="lead">
          {t.standardsPages} compliance-standard pages and {sol?.pages ?? 0} application pages cover
          named, published standards and specific test methods &mdash; MIL-STD-810, RTCA DO-160, EMC
          testing, ESD testing, fibre splicing. They are typed as generic Articles and WebPages.
          Nothing states which standard a page is about, and nothing connects a standard to the
          instruments that test against it.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          These are not minor pages. The fibre-splicing application page is the single
          highest-traffic page on the site, at an estimated{" "}
          <span className="u-lm">{fmtInt(sol?.traffic ?? 0)} visits a month</span> across the
          solutions section.
        </p>

        <div className="grid2" style={{ marginTop: 30 }}>
          <div className="card">
            <h4>Why it matters more here than elsewhere</h4>
            <p>
              A buyer does not search for a model number. They search for the standard they have to
              satisfy, or the test they have to run, and then look for equipment that does it. These
              pages are the top of that funnel.
            </p>
            <p style={{ marginBottom: 0 }}>
              Published standards are real, citable entities with their own Wikidata items.
              MIL-STD-810 is <code>Q1881501</code>. Saying so turns a page about a topic into a page
              about a <em>thing</em>.
            </p>
          </div>
          <div className="card">
            <h4>The chain to build</h4>
            <ul className="clean">
              <li>Standard page names the standard as a DefinedTerm with a Wikidata sameAs.</li>
              <li>Standard links to the equipment categories that test against it.</li>
              <li>Product pages reference the standards they satisfy.</li>
              <li>Application pages name the method and the physical phenomenon involved.</li>
            </ul>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 0 }}>
              No competitor in this market has built any part of this.
            </p>
          </div>
        </div>

        <h3 style={{ margin: "32px 0 10px" }}>What a standards page should carry</h3>
        <pre>
          <code>{EXAMPLE}</code>
        </pre>
      </div>
    </section>
  );
}
