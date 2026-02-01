"use client";

import { useMemo, useState } from "react";
import { Card, Button, Divider, Pill, Field } from "../../ui/afterview";

export default function AdminClient({ token, record }) {
  const [insight, setInsight] = useState(record?.feedback?.insight || "");
  const [nextSteps, setNextSteps] = useState(record?.feedback?.nextSteps || "");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const candidateUrl = useMemo(() => `/r/${token}`, [token]);

  if (!record) {
    return (
      <main className="container" style={{ maxWidth: 820 }}>
        <Card>
          <Pill>Admin</Pill>
          <h1 className="h1" style={{ marginTop: 14 }}>Not found</h1>
          <p className="p">No Afterview exists for token <span className="code">{token}</span>.</p>
          <Divider />
          <Button href="/hub" kind="secondary">Back to Hub</Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="container" style={{ maxWidth: 920 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <Pill>Admin</Pill>
            <h1 className="h1" style={{ marginTop: 14 }}>Submit feedback</h1>
            <div className="muted" style={{ marginTop: 10 }}>
              Team <strong style={{ color: "var(--ink)" }}>{record.teamName}</strong> • Token <span className="code">{token}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href="/hub" kind="secondary">← Hub</Button>
            <Button href={candidateUrl} kind="secondary" target="_blank" rel="noreferrer">Candidate page</Button>
          </div>
        </div>

        <Divider />

        {record.note ? (
          <div className="surface" style={{ padding: 14, borderRadius: 16, background: "rgba(191,215,234,0.18)" }}>
            <strong>Internal note:</strong> {record.note}
          </div>
        ) : null}

        {notice ? <div className="notice" style={{ marginTop: 14 }}>{notice}</div> : null}

        <form
          style={{ marginTop: 14 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setNotice("");
            setSaving(true);

            const res = await fetch("/api/feedback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, insight, nextSteps })
            });

            setSaving(false);

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
              setNotice(data.error || "Error saving feedback");
              return;
            }

            setNotice("Saved. The candidate link will now show the Afterview.");
          }}
        >
          <Field label="One honest, constructive insight" hint="Required">
            <textarea
              className="textarea"
              required
              rows={4}
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              placeholder="Keep it human, specific, and actionable."
            />
          </Field>

          <Field label="Next step" hint="Optional">
            <textarea
              className="textarea"
              rows={3}
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder="A small next step they can take to improve."
            />
          </Field>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Button kind="primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save feedback"}
            </Button>
            <Button kind="secondary" href={candidateUrl} target="_blank" rel="noreferrer">
              Preview candidate view
            </Button>
          </div>

          <div className="muted" style={{ marginTop: 14 }}>
            Candidate link: <a href={candidateUrl} target="_blank" rel="noreferrer">{candidateUrl}</a>
          </div>
        </form>
      </Card>
    </main>
  );
}
