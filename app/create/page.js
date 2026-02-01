"use client";

import { useState } from "react";
import { Header, Card, Button, Field, Divider, Pill } from "../ui/afterview";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  return (
    <>
      <Header />
      <main className="container">
        <Card>
          <Pill>New Afterview</Pill>
          <h1 className="h1" style={{ marginTop: 14 }}>Create an Afterview</h1>
          <p className="p">Set up a private Afterview for your interview process.</p>

          <Divider />

          {notice ? <div className="notice" style={{ marginBottom: 14 }}>{notice}</div> : null}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setNotice("");
              setLoading(true);

              const fd = new FormData(e.currentTarget);
              const teamName = (fd.get("teamName") || "").toString().trim();
              const note = (fd.get("note") || "").toString().trim();

              const res = await fetch("/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ teamName, note })
              });

              setLoading(false);

              const data = await res.json().catch(() => ({}));

              if (!res.ok) {
                setNotice(data.error || "Error creating Afterview");
                return;
              }

              window.location.href = `/admin/${data.token}`;
            }}
          >
            <Field label="Hiring team name" hint="Required">
              <input className="input" name="teamName" required placeholder="e.g. Product Marketing" />
            </Field>

            <Field label="Internal note" hint="Optional">
              <textarea className="textarea" name="note" rows={3} placeholder="Visible only to interviewers" />
            </Field>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
              <Button kind="primary" type="submit" disabled={loading}>
                {loading ? "Creating…" : "Create Afterview"}
              </Button>
              <Button kind="secondary" href="/hub">View Hub</Button>
            </div>
          </form>
        </Card>
      </main>
    </>
  );
}

