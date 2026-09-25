import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;

const GOOD = `{
  "@type": "Product",
  "name": "Olympus Magna-Mike 8600 Magnetic Thickness Gauge",
  "sku": "OLYM-MAGNA-MIKE-8600",
  "brand": { "@type": "Brand", "name": "Evident" },
  "offers": {
    "@type": "Offer",
    "price": "1029.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/UsedCondition",
    "leaseLength": { "@type": "QuantitativeValue", "value": 1, "unitText": "MONTH" }
  },
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Weight", "value": 20, "unitText": "LB" }
  ]
}`;

const BAD = `{
  "@type": "BreadcrumbList",
  "itemListElement": [ ... ]
}

/* that is the entire structured data on
   /products/keyence/vhx-6000 — a page drawing
   an estimated 130 visits a month */`;

export default function Products() {
  const t = f.totals;
  const pct = Math.round((t.productWithout / t.productPages) * 100);
  return (
    <section className="section" id="products">
      <div className="container">
        <div className="eyebrow">The product problem</div>
        <h2>The template exists. It is applied to a third of the catalogue.</h2>
        <p className="lead">
          This is the finding to fix first, and it is unusual in that it needs no design work and no
          decisions. The correct markup is already written, already in production, and already
          passing. It simply is not on {t.productWithout} of the {t.productPages} product pages.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={`${t.productWith}`} label="Product pages marked up properly" good
            sub={`${100 - pct}% of the catalogue`} />
          <ScoreCard value={`${t.productWithout}`} label="Product pages with only a breadcrumb" warn
            sub={`${pct}% of the catalogue`} />
          <ScoreCard value={fmtInt(t.trafficUnmarked)} label="Monthly visits on the unmarked set" warn
            sub={`${Math.round(t.trafficUnmarked / Math.max(t.trafficMarked, 1) * 10) / 10}× the marked-up set`} />
          <ScoreCard value={`${t.offersWithLease}/${t.offers}`} label="Offers using leaseLength" good
            sub="rental modelled correctly, not as a sale" />
        </div>

        <div className="grid2" style={{ marginTop: 32 }}>
          <div>
            <h3 style={{ color: "var(--ok)" }}>What {t.productWith} pages have</h3>
            <pre>
              <code>{GOOD}</code>
            </pre>
          </div>
          <div>
            <h3 style={{ color: "var(--warn)" }}>What {t.productWithout} pages have</h3>
            <pre>
              <code>{BAD}</code>
            </pre>
          </div>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>Why the rental detail matters</h2>
          <p>
            Most equipment sites that do mark up products describe a rental as if it were a sale: a
            price, and nothing to say the price buys a month rather than the instrument. This site
            uses <code>leaseLength</code> on {t.offersWithLease} of its {t.offers} offers, which
            states the thing plainly.
          </p>
          <p style={{ marginBottom: 0 }}>
            That is a real advantage and it is worth extending rather than rebuilding. Whoever wrote
            this template understood the business model; it just never reached the rest of the
            catalogue.
          </p>
        </div>
      </div>
    </section>
  );
}
