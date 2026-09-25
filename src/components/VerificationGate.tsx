import type { Provenance } from "../types";
import prov from "../data/provenance.json";
import { fmtInt } from "../utils/format";

const p = prov as unknown as Provenance;

export default function VerificationGate() {
  return (
    <section className="section" id="verification">
      <div className="container">
        <div className="eyebrow">Verification gate</div>
        <h2>Why every identifier is looked up</h2>
        <p className="lead">
          Asking a language model to add Wikidata identifiers to a spreadsheet produces a great many
          identifiers very quickly. The problem is that a plausible identifier and a correct one are
          indistinguishable without a lookup, and the failure is silent &mdash; nothing about{" "}
          <code>Q18339307</code> tells you it is a Japanese company rather than the electrical
          quantity. Wrong identifiers are worse than missing ones: they assert to Google and to every
          downstream model that a page is about something it is not.
        </p>

        <div className="skyband" style={{ margin: "26px 0" }}>
          <h2>Search ranks by fame, not by correctness</h2>
          <p style={{ marginBottom: 0 }}>
            Every row below was the <strong>top-ranked</strong> Wikidata result during this audit,
            for a term taken directly from this site. None of them is about test and measurement.
            This is the default behaviour of the obvious method, not an edge case.
          </p>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Term on the site</th>
                <th>Top result</th>
                <th>What Wikidata says it is</th>
              </tr>
            </thead>
            <tbody>
              {p.verification.wrongSense.map((w) => (
                <tr key={w.term + w.qid}>
                  <td><strong>{w.term}</strong></td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--warn)" }}>
                    {w.qid}
                  </td>
                  <td style={{ fontSize: 13 }}>
                    {w.label}
                    {w.desc && <span style={{ color: "var(--ink-mute)" }}> &mdash; {w.desc}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>The gate, in three steps</h4>
            <ul className="clean">
              <li>
                Harvest whole classes of entities from the Wikidata Query Service first &mdash;
                instruments, standards, measurement methods &mdash; so a term can only ever resolve
                to something already typed as the right kind of thing.
              </li>
              <li>
                Accept a match only when something other than its <em>name</em> agrees: class
                membership, or a description that fits this vertical. A matching name alone is never
                enough.
              </li>
              <li>
                Record confirmed absences as absences. {fmtInt(p.coverage.noEntity)} terms on this
                site have no entity, and that is reported rather than filled in.
              </li>
            </ul>
          </div>
          <div className="card">
            <h4>A trap specific to this vertical</h4>
            <p>
              A quantity and the instrument that measures it are different things. Screened
              carelessly, <code>temperature</code> resolves to a thermometer and{" "}
              <code>humidity</code> to a humidity sensor, because the instrument sits in an
              instrument class and the quantity does not. Both were caught and removed.
            </p>
            <p style={{ marginBottom: 0 }}>
              Identifiers also rot. All {fmtInt(p.verification.v2PoolChecked)} identifiers in this
              report were re-checked against the live API immediately before it was produced.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
