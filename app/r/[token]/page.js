export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Header, Card, Divider, Pill } from "../../ui/afterview";
import { getAfterview } from "../../../lib/store";

export default async function Candidate({ params }) {
  const record = await getAfterview(params.token);

  return (
    <>
      <Header />
      <main className="container" style={{ maxWidth: 820 }}>
        <Card>
          <Pill>Candidate View</Pill>
          <h1 className="h1" style={{ marginTop: 14 }}>Afterview</h1>
          <p className="p">A private, constructive note from the interview team.</p>

          <Divider />

          {!record ? (
            <div className="muted">This link is invalid or expired.</div>
          ) : record.status !== "completed" ? (
            <div className="muted">Your feedback isn’t available yet. Please check back soon.</div>
          ) : (
            <>
              <div className="muted">
                Team: <strong style={{ color: "var(--ink)" }}>{record.teamName}</strong>
              </div>

              <h2 style={{ margin: "18px 0 8px 0", fontSize: 18 }}>One insight</h2>
              <div className="surface" style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.55)" }}>
                {record.feedback?.insight || ""}
              </div>

              {record.feedback?.nextSteps ? (
                <>
                  <h2 style={{ margin: "18px 0 8px 0", fontSize: 18 }}>Next step</h2>
                  <div className="surface" style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.55)" }}>
                    {record.feedback.nextSteps}
                  </div>
                </>
              ) : null}

              <div className="muted" style={{ marginTop: 16 }}>
                Updated:{" "}
                <strong style={{ color: "var(--ink)" }}>
                  {record.feedback?.updatedAt ? new Date(record.feedback.updatedAt).toLocaleString() : ""}
                </strong>
              </div>
            </>
          )}
        </Card>
      </main>
    </>
  );
}

