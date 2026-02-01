import { Header, Card, Pill, Button, Divider } from "./ui/afterview";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <Card>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <img
              src="/av-logo-v2.png?v=1"
              alt="Afterview"
              style={{ width: 96, height: 96, borderRadius: 22 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Pill>Private • Constructive • Human</Pill>
          </div>

          <h1 className="h1" style={{ textAlign: "center", marginTop: 10 }}>
            Real feedback, delivered with care.
          </h1>

          <p className="p" style={{ textAlign: "center", maxWidth: 720, margin: "10px auto 0" }}>
            Afterview helps interview teams share one honest, constructive insight —
            so candidates leave with clarity instead of guesswork.
          </p>

          <Divider />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Button href="/create" kind="primary">Create an Afterview</Button>
            <Button href="/hub" kind="secondary">Go to Hub</Button>
          </div>

          <div className="muted" style={{ marginTop: 16, textAlign: "center" }}>
            Tip: candidates only see their unique <span className="code">/r/&lt;token&gt;</span> page.
          </div>
        </Card>
      </main>
    </>
  );
}

