const ROWS = [
  { type: "Product + Offer", status: "Earning on 73 pages", tone: "ok",
    note: "Merchant listing and product snippets. Valid where present, with price, availability and condition. Absent on 156 product pages." },
  { type: "Breadcrumb", status: "Earning", tone: "ok",
    note: "Present and valid on almost every page. This is the site's most consistent markup." },
  { type: "ItemList", status: "Earning on 12 pages", tone: "ok",
    note: "Carousel eligibility for category pages. Applied to 12 of 72." },
  { type: "Organization", status: "Not eligible sitewide", tone: "warn",
    note: "Logo and knowledge panel data. Present on 171 of 487 pages, absent from every product page." },
  { type: "LocalBusiness", status: "Homepage only", tone: "warn",
    note: "Strong node with geo and opening hours, but nothing else on the site references it." },
  { type: "Video", status: "One page", tone: "mute",
    note: "The site hosts instrument demos; one VideoObject exists across 487 pages." },
  { type: "TechArticle", status: "Not implemented", tone: "mute",
    note: "No rich result, but it is the correct type for standards and application pages and it is how a machine learns what those pages are." },
  { type: "Service", status: "Not implemented", tone: "mute",
    note: "Calibration, repair and rental are the business. None is described as a Service anywhere." },
  { type: "FAQPage", status: "Removed by Google", tone: "warn",
    note: "The FAQ rich result was removed from Search on 7 May 2026. Keep the markup for AI citation; stop counting it." },
];

const COLOR: Record<string, string | undefined> = {
  ok: "var(--ok)", warn: "var(--warn)", mute: "var(--muted)",
};

export default function RichResults() {
  return (
    <section className="section" id="serp">
      <div className="container">
        <div className="eyebrow">What earns rich results</div>
        <h2>Which of this markup Google actually rewards</h2>
        <p className="lead">
          Every row was checked against Google&rsquo;s current developer documentation on the day of
          the audit rather than recalled. The distinction that matters: some structured data earns a
          visible search feature, and some only makes a page legible to machines. Both are worth
          doing. Only one should be described as a ranking win.
        </p>

        <div className="tbl-wrap" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr><th>Type</th><th>Status</th><th>What it does</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.type}>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.type}</td>
                  <td style={{ fontSize: 13, color: COLOR[r.tone], fontWeight: 600 }}>{r.status}</td>
                  <td style={{ fontSize: 13 }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>The honest version</h2>
          <p style={{ marginBottom: 0 }}>
            Only three of these currently earn anything, and two of them are already working. The
            largest available gain is not a new type &mdash; it is applying the Product markup that
            already passes to the two thirds of the catalogue that does not have it.
          </p>
        </div>
      </div>
    </section>
  );
}
