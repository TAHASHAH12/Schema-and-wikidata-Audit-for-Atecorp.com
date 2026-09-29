import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";

const f = findings as unknown as SchemaFindings;
const tick = (b: boolean) => (b ? "✓" : "—");

export default function Competitors() {
  const sampled = f.competitors.filter((c) => c.sampled);
  const unsampled = f.competitors.filter((c) => !c.sampled);
  return (
    <section className="section" id="competitors">
      <div className="container">
        <div className="eyebrow">Competitors</div>
        <h2>An open field</h2>
        <p className="lead">
          This section asks what the named rental competitors <em>ship</em>. The industry snapshot
          above asks who actually <em>ranks</em> &mdash; and it is largely not them. Read together:
          the direct competitors are weak on markup and weak in the results, while the manufacturers
          and marketplaces taking those positions are strong on both.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          Structured data was read from the live pages of the domains competing for the same terms.
          Where a product URL could be found in a sitemap, that page was sampled too &mdash; because
          the question worth answering is what a competitor puts on the page type we are trying to
          beat, not what is on their homepage.
        </p>

        <div className="tbl-wrap" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Types</th>
                <th>Product</th>
                <th>Offer</th>
                <th>Organization</th>
                <th>ItemList</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "var(--bl)" }}>
                <td>
                  <strong>atecorp.com</strong>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>this client</div>
                </td>
                <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                  <strong>{f.totals.types}</strong>
                </td>
                <td style={{ fontFamily: "var(--mono)" }}>{tick(true)}</td>
                <td style={{ fontFamily: "var(--mono)" }}>{tick(true)}</td>
                <td style={{ fontFamily: "var(--mono)" }}>{tick(true)}</td>
                <td style={{ fontFamily: "var(--mono)" }}>{tick(true)}</td>
              </tr>
              {sampled.map((c) => (
                <tr key={c.domain}>
                  <td style={{ fontSize: 13.5 }}>{c.domain}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{c.types}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasProduct)}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasOffer)}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasOrg)}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasItemList)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {unsampled.length > 0 && (
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
            Not sampled at product level: {unsampled.map((c) => c.domain).join(", ")}. No product URL
            was reachable through their sitemaps, so their product markup is unknown rather than
            absent. Their homepages carried no structured data.
          </p>
        )}

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>What the sample shows</h4>
            <p style={{ marginBottom: 0 }}>
              Not one competitor sampled at product level ships Product markup. The strongest of them
              carries a generic WebPage and Organization block on a shop index. In a market where
              every competitor sells the same instruments from the same manufacturers, none of them
              is telling a search engine what those instruments are.
            </p>
          </div>
          <div className="card">
            <h4>What that is worth</h4>
            <p style={{ marginBottom: 0 }}>
              This client already has the better template. Finishing the rollout does not close a gap
              with competitors &mdash; it opens one, on the page type that carries buying intent, in
              a market where nobody else has started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
