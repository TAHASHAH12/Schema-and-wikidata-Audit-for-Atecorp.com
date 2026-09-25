import { useState } from "react";
import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;
const NAV = new Set(["BreadcrumbList", "ListItem", "WebPage", "EntryPoint", "SearchAction"]);
const IDENTITY = new Set(["Organization", "Person", "WebSite", "ImageObject", "LocalBusiness",
  "PostalAddress", "GeoCoordinates", "OpeningHoursSpecification", "ContactPoint"]);

function role(t: string) {
  if (NAV.has(t)) return { label: "navigation", strong: false };
  if (IDENTITY.has(t)) return { label: "the business", strong: false };
  return { label: "this page", strong: true };
}

export default function Coverage() {
  const rows = f.coverage;
  const [sel, setSel] = useState(rows[0]?.segment ?? "");
  const cur = rows.find((r) => r.segment === sel) ?? rows[0];

  return (
    <section className="section" id="coverage">
      <div className="container">
        <div className="eyebrow">Markup by page type</div>
        <h2>Mostly breadcrumbs</h2>
        <p className="lead">
          Across {fmtInt(f.totals.pages)} pages the site uses {f.totals.types} distinct schema.org
          types. Broken down by page type, the pattern is that almost every page carries navigation
          markup, a minority carry anything describing the business, and only the product pages that
          were templated carry anything describing what the page is actually about.
        </p>

        <div className="row" style={{ marginTop: 24, flexWrap: "wrap", gap: 8 }}>
          {rows.map((r) => (
            <button
              key={r.segment}
              className="navchip"
              onClick={() => setSel(r.segment)}
              style={
                r.segment === sel
                  ? { background: "var(--ny)", borderColor: "var(--ink)", fontWeight: 600 }
                  : undefined
              }
            >
              {r.segment} &middot; {r.pages}
            </button>
          ))}
        </div>

        {cur && (
          <div className="card" style={{ marginTop: 20 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              flexWrap: "wrap", gap: 12, marginBottom: 14,
            }}>
              <h3 style={{ margin: 0 }}>{cur.segment}</h3>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>
                {fmtInt(cur.pages)} pages &middot; {fmtInt(cur.traffic)} est. monthly visits &middot;{" "}
                {cur.avgTypes} types per page
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>schema.org type</th>
                    <th>Pages</th>
                    <th>Share</th>
                    <th>Describes</th>
                  </tr>
                </thead>
                <tbody>
                  {cur.types.map((t) => {
                    const r = role(t.type);
                    return (
                      <tr key={t.type}>
                        <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{t.type}</td>
                        <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{t.pages}</td>
                        <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{t.pct}%</td>
                        <td style={{ fontSize: 13 }}>
                          {r.strong ? <strong>{r.label}</strong>
                            : <span style={{ color: "var(--muted)" }}>{r.label}</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p style={{ marginTop: 22, fontSize: 13.5, color: "var(--muted)" }}>
          A breadcrumb is worth having and it does earn a search feature, but it describes where a
          page sits, not what it is. On most page types here it is the only structured data present.
        </p>
      </div>
    </section>
  );
}
