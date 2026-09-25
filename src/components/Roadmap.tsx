const PHASES = [
  {
    n: "01", title: "Finish the product rollout", effort: "One sprint",
    items: [
      "Apply the existing Product template to the 156 product pages that lack it.",
      "Keep leaseLength on every offer — it is what makes a rental legible as a rental.",
      "Start with the highest-traffic unmarked pages, not alphabetically.",
    ],
    why: "The template already passes. This is the largest gain available and it needs no design decisions.",
  },
  {
    n: "02", title: "Give the site an identity", effort: "Under a day",
    items: [
      "Emit the Organization node sitewide with a stable @id.",
      "Reference it as publisher or seller from every Product, Article and WebPage.",
      "Link the homepage LocalBusiness node to it so the address and hours apply site-wide.",
      "Add an English label to the company's own Wikidata item.",
    ],
    why: "316 pages currently say nothing about who publishes them, including every product page.",
  },
  {
    n: "03", title: "Identify the manufacturers", effort: "One sprint",
    items: [
      "Type each manufacturer as an Organization rather than a bare Brand name string.",
      "Add sameAs to the manufacturer's Wikidata item and official site where one exists.",
      "Reference that organisation from every product of that brand.",
      "Extend ItemList to the remaining 60 category pages.",
    ],
    why: "74 brand pages name a real company as free text. These are the entities buyers search by.",
  },
  {
    n: "04", title: "Connect standards to equipment", effort: "Two sprints",
    items: [
      "Type the 56 standards pages as TechArticle with the standard as a DefinedTerm and a Wikidata sameAs.",
      "Type application pages as TechArticle naming the test method.",
      "Link standards to the equipment categories that satisfy them, and back again.",
      "Add Service markup for calibration, repair and rental.",
    ],
    why: "Buyers search by the standard they must satisfy, not by model number. No competitor has built this chain.",
  },
];

export default function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="container">
        <div className="eyebrow">Roadmap</div>
        <h2>In the order that pays back fastest</h2>
        <p className="lead">
          Sequenced by return rather than by effort. Phase 01 is a rollout of markup that already
          exists and already validates.
        </p>

        <div className="responsive-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16, marginTop: 26,
        }}>
          {PHASES.map((p) => (
            <div className="card" key={p.n}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 22, fontWeight: 600, color: "var(--ink-mute)" }}>
                  {p.n}
                </span>
                <span className="classchip">{p.effort}</span>
              </div>
              <h3>{p.title}</h3>
              <ul className="clean" style={{ fontSize: 13.5 }}>
                {p.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 0, marginTop: 10 }}>{p.why}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
