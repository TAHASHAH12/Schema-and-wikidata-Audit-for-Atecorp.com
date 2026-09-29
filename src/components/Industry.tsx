import type { Industry } from "../types";
import ind from "../data/industry.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const i = ind as unknown as Industry;

const LABEL: Record<string, string> = {
  "the client": "atecorp.com",
  "known competitor": "other rental and distribution sites",
  "UGC / social": "YouTube, Reddit, LinkedIn",
  reference: "Wikipedia and standards bodies",
  "other site": "everyone else — manufacturers, publishers, government, forums",
};

export default function Industry_() {
  const kinds = Object.entries(i.byKind).sort((a, b) => b[1] - a[1]);
  const total = kinds.reduce((s, [, n]) => s + n, 0);
  const comp = i.markupByKind["known competitor"];
  const wiki = i.aiTop.find((a) => a.domain.includes("wikipedia"));

  return (
    <section className="section" id="industry">
      <div className="container">
        <div className="eyebrow">Industry snapshot</div>
        <h2>What the whole category looks like, not just this site</h2>
        <p className="lead">
          We took {i.keywords} keywords spanning {fmtInt(i.volume)} monthly searches across
          instruments, test methods, standards and applications, pulled the top ten for each, and
          read the structured data on every page that ranked &mdash;{" "}
          <span className="u-lm">{fmtInt(i.urls)} pages across {i.domains} domains</span>.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={`${i.aiPct}%`} warn label="Keywords with an AI overview"
            sub={`${i.aiKeywords} of ${i.keywords} — the highest we have measured`} />
          <ScoreCard value={String(i.clientAi)} label="AI answers citing this site"
            sub="fourth, behind YouTube, Wikipedia and Google" />
          <ScoreCard value={fmtInt(i.urls)} label="Ranking pages read"
            sub={`${i.read} readable across ${i.domains} domains`} />
          <ScoreCard value={`${comp?.anyLd ?? 0}%`} good
            label="Competitor pages carrying any structured data"
            sub={`of ${comp?.n ?? 0} competitor pages read`} />
        </div>

        <div className="skyband" style={{ marginTop: 32 }}>
          <h2>Wikipedia is the second most cited source in this category</h2>
          <p>
            AI overviews appeared on {i.aiPct}% of these keywords &mdash; higher than any other
            category we have measured. Across them,{" "}
            <strong>en.wikipedia.org is cited {wiki?.n ?? 0} times</strong>, behind only YouTube and
            ahead of every manufacturer, distributor and standards body.
          </p>
          <p style={{ marginBottom: 0 }}>
            When someone asks an assistant what an attenuator does or which standard governs a test,
            the answer is grounded in the public reference layer. That is the single strongest
            argument for the entity work in this audit: this company has a Wikidata item with no
            English label, in a category where the reference layer is what gets quoted.
          </p>
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Who holds the top ten</h3>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Type of site</th><th>Share</th><th>Who that is</th></tr></thead>
            <tbody>
              {kinds.map(([k, n]) => (
                <tr key={k}>
                  <td style={{ fontSize: 13.5, fontWeight: k === "the client" ? 700 : 400 }}>{k}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {Math.round((n / total) * 100)}% ({n})
                  </td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{LABEL[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "32px 0 10px" }}>Who you are actually competing with</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          Not the rental houses. The domains holding the most top-ten positions are YouTube, Reddit,
          Amazon and the manufacturers themselves. Fluke alone holds twice as many slots as this
          site, on pages that carry structured data every time.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Top-ten slots</th>
                <th>Type</th>
                <th>Carries structured data</th>
              </tr>
            </thead>
            <tbody>
              {i.domainRows.slice(0, 14).map((r) => (
                <tr key={r.domain} style={r.kind === "the client" ? { background: "var(--bl)" } : undefined}>
                  <td style={{ fontSize: 13.5, fontWeight: r.kind === "the client" ? 700 : 400 }}>
                    {r.domain}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.pages}</td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.kind}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {r.anyLd === null ? <span style={{ color: "var(--muted)" }}>not readable</span> : `${r.anyLd}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "32px 0 10px" }}>The named competitors</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          The rental and distribution sites competing for the same terms. Between them they hold
          fewer top-ten positions than YouTube does alone.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr><th>Competitor</th><th>Top-ten slots</th><th>Pages read</th><th>Carries structured data</th></tr>
            </thead>
            <tbody>
              {i.competitors.map((c) => (
                <tr key={c.domain}>
                  <td style={{ fontSize: 13.5 }}>{c.domain}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{c.pages}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{c.read}/{c.pages}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {c.anyLd === null
                      ? <span style={{ color: "var(--muted)" }}>blocked our request</span>
                      : `${c.anyLd}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
          Transcat, TEquipment, TestEquity and Avalon &mdash; the direct rental competitors &mdash;
          hold one top-ten slot each. Amazon and eBay hold nineteen between them. The competitive
          threat in search is not another rental house; it is marketplaces and the manufacturers
          selling direct.
        </p>

        <h3 style={{ margin: "30px 0 10px" }}>Who the AI answers cite</h3>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Domain</th><th>AI overviews citing it</th></tr></thead>
            <tbody>
              {i.aiTop.map((a) => (
                <tr key={a.domain}>
                  <td style={{ fontSize: 13.5, fontWeight: a.domain.includes("atecorp") ? 700 : 400 }}>
                    {a.domain}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{a.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>The competitors confirm the opening</h4>
            <p style={{ marginBottom: 0 }}>
              Only {comp?.anyLd ?? 0}% of competitor pages read carry any structured data at all, and{" "}
              {comp?.product ?? 0}% carry Product markup. The earlier finding &mdash; that this is an
              uncontested field &mdash; holds at category scale, not just on the handful of domains
              sampled by hand.
            </p>
          </div>
          <div className="card">
            <h4>Government and standards bodies rank here</h4>
            <p style={{ marginBottom: 0 }}>
              <code>fcc.gov</code> and <code>faa.gov</code> both appear in the AI citations. Buyers
              and the assistants they ask reason about equipment through the standards it satisfies,
              which is exactly what the {fmtInt(56)} compliance-standard pages could be describing
              and currently are not.
            </p>
          </div>
        </div>

        <p style={{ marginTop: 22, fontSize: 13, color: "var(--muted)" }}>
          {i.unread} of the {fmtInt(i.urls)} ranking pages could not be read, mostly sites that block
          automated requests. Those are recorded as unread, never as pages without markup.
        </p>
      </div>
    </section>
  );
}
