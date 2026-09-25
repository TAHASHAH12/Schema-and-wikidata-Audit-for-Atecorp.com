import type { EntityModel, SchemaFindings } from "../types";
import model from "../data/entityModel.json";
import findings from "../data/schemaFindings.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const d = model as unknown as EntityModel;
const f = findings as unknown as SchemaFindings;

export default function Hero() {
  const t = d.totals;
  const ft = f.totals;
  const c = f.catalogue;

  return (
    <header className="hero" id="overview">
      <div className="container">
        <div className="eyebrow">Schema &amp; Wikidata audit &middot; September 2026</div>
        <h1>
          The markup is <em>good</em>. It is just not on most of the pages.
        </h1>
        <p className="lead">
          {ft.productWith} product pages carry genuinely strong structured data &mdash; SKU, brand,
          price, availability, condition, physical dimensions, and a <code>leaseLength</code> that
          correctly models a rental rather than a sale. That is better than anything a competitor in
          this market publishes, and most of them publish nothing at all.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          The problem is coverage, and it is larger than the ranking pages suggest. Of the{" "}
          {ft.productPages} product pages that rank, {ft.productWithout} have only a breadcrumb. The
          full catalogue is {fmtInt(c.cataloguePages)} product pages, and a random live sample
          of the rest puts Product markup on {Math.round(c.rate * 100)}% of them &mdash; an estimated{" "}
          <span className="u-lm">
            {fmtInt(c.estUnmarkedLo)}&ndash;{fmtInt(c.estUnmarkedHi)} pages
          </span>{" "}
          with none.
        </p>

        <div className="scorecards" style={{ marginTop: 30 }}>
          <ScoreCard value={`${fmtInt(c.estUnmarkedLo)}\u2013${fmtInt(c.estUnmarkedHi)}`}
            label="Product pages estimated to have no markup" warn
            sub={`of ${fmtInt(c.cataloguePages)} in the catalogue`} />
          <ScoreCard value={`${ft.productWithout}/${ft.productPages}`}
            label="Ranking product pages with no markup" warn
            sub="the visible part of the gap" />
          <ScoreCard value={`${ft.orgPages}/${ft.pages}`} label="Pages with any publisher identity" warn
            sub="there is no sitewide identity block" />
          <ScoreCard value={fmtInt(ft.offersWithLease)} label="Offers correctly modelling a rental" good
            sub="leaseLength, done properly" />
          <ScoreCard value={fmtInt(t.v2Entities)} label="Verified Wikidata references added" good
            sub={`from ${fmtInt(t.distinctEntities)} distinct entities`} />
          <ScoreCard value="0" label="Unverified identifiers" good
            sub="every one resolved against the live API" />
        </div>
      </div>
    </header>
  );
}
