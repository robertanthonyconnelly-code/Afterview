export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Header, Card, Button, Divider, Pill } from "../ui/afterview";
import { listAfterviews } from "../../lib/store";

function StatusPill({ status }) {
  const done = status === "completed";
  return (
    <span className="pill" style={{ background: done ? "rgba(191,227,208,0.55)" : "rgba(191,215,234,0.35)" }}>
      {done ? "Shared with candidate" : "Awaiting feedback"}
    </span>
  );
}

export default async function Hub({ searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const data = await listAfterviews({ page, pageSize: 10 });

  const items = data.items || [];
  const total = data.total || 0;
  const totalPages = data.totalPages || 1;
  const currentPage = data.page || 1;

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <>
      <Header />
      <main className="container">
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <Pill>Hub</Pill>
              <h1 className="h1" style={{ marginTop: 14 }}>Your Afterviews</h1>
              <p className="p">Total Afterviews: <strong>{total}</strong></p>
            </div>

            <Button href="/create" kind="primary">Create</Button>
          </div>

          <Divider />

          {items.length === 0 ? (
            <div className="muted">No Afterviews yet. Click <strong>Create</strong> to make your first.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((it) => (
                <Card key={it.token} hover={true}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 16 }}>{it.teamName || "Hiring Team"}</div>
                      <div className="muted" style={{ marginTop: 6 }}>
                        Token <span className="code">{it.token}</span>
                        {it.createdAt ? <> • {new Date(it.createdAt).toLocaleString()}</> : null}
                      </div>
                    </div>

                    <StatusPill status={it.status || "pending"} />
                  </div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
                    <Button href={`/admin/${it.token}`} kind="primary">Admin</Button>
                    <Button href={`/r/${it.token}`} kind="secondary" target="_blank" rel="noreferrer">Candidate</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <Divider />

          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Button href={`/hub?page=${prevPage}`} kind="secondary">← Prev</Button>
            <div className="muted">
              Page <strong style={{ color: "var(--ink)" }}>{currentPage}</strong> of{" "}
              <strong style={{ color: "var(--ink)" }}>{totalPages}</strong>
            </div>
            <Button href={`/hub?page=${nextPage}`} kind="secondary">Next →</Button>
          </div>
        </Card>
      </main>
    </>
  );
}
