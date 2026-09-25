import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;
const c = f.catalogue;
const pct = (n: number) => `${Math.round(n * 100)}%`;

export default function Catalogue() {
  const rankingRate = Math.round((f.totals.productWith / c.auditedPages) * 100);
  return (
    <section className="section" id="catalogue">
      <div className="container">
        <div className="eyebrow">Catalogue scale</div>
        <h2>The catalogue is thirty times the size of the pages that rank</h2>
        <p className="lead">
          The pages examined in detail were the {c.auditedPages} product pages the site currently
          ranks with. The catalogue itself runs to{" "}
          <span className="u-lm">{fmtInt(c.cataloguePages)} product detail pages</span> across{" "}
          {c.manufacturers} manufacturers &mdash; {fmtInt(c.beyondAudit)} of them outside that set.
          Whatever is true of the ranking pages is true of a catalogue far larger.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          So {c.sampleDrawn} of those pages were drawn at random and checked.{" "}
          {c.sampleWithProduct} of the {c.sampleLive} that returned 200 carry Product markup &mdash;{" "}
          {pct(c.rate)}, against {rankingRate}% in the ranking set. The gap is not confined to the
          pages nobody was watching; it is the normal state of the catalogue.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={fmtInt(c.cataloguePages)} label="Product pages in the catalogue"
            sub={`${c.manufacturers} manufacturers`} />
          <ScoreCard value={pct(c.rate)} label="Sampled pages with Product markup" warn
            sub={`95% confidence ${pct(c.ciLo)}–${pct(c.ciHi)}`} />
          <ScoreCard value={`${fmtInt(c.estUnmarkedLo)}–${fmtInt(c.estUnmarkedHi)}`}
            label="Estimated pages missing Product markup" warn sub="extrapolated from the sample" />
          <ScoreCard value={`${Math.round((c.nonLive / c.sampleDrawn) * 100)}%`}
            label="Sampled URLs not returning 200" warn
            sub={`${c.nonLive} of ${c.sampleDrawn} — 404s and timeouts`} />
        </div>

        <div className="skyband" style={{ marginTop: 32 }}>
          <h2>What this changes about the plan</h2>
          <p>
            A rollout across {fmtInt(c.auditedPages)} pages is a sprint. A rollout across{" "}
            {fmtInt(c.cataloguePages)} is a template change plus a data pipeline, and it needs to be
            generated rather than applied page by page.
          </p>
          <p style={{ marginBottom: 0 }}>
            The good news is that nothing about the markup itself needs designing. The pattern on the{" "}
            {f.totals.productWith} correct pages already has everything it needs; the work is making
            it the default for every product record rather than a property of some pages.
          </p>
        </div>

        <p style={{ marginTop: 22, fontSize: 13, color: "var(--muted)" }}>
          Catalogue figures are an estimate from a {c.sampleDrawn}-page random sample, not a census.
          A full crawl would replace the confidence interval with a count.
        </p>
      </div>
    </section>
  );
}
