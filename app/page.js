import { Header, Card, Pill, Button, Divider } from "./ui/afterview";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <Card>
          <Pill>Private • Constructive • Human</Pill>

          <h1 className="h1" style={{ marginTop: 14 }}>
            Real feedback, delivered with care.
          </h1>
          <p className="p">
            Afterview helps interview teams share one honest, constructive insight —
            so candidates leave with clarity instead of guesswork.
          </p>

          <Divider />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href="/create" kind="primary">Create an Afterview</Button>
            <Button href="/hub" kind="secondary">Go to Hub</Button>
          </div>

          <div className="muted" style={{ marginTop: 16 }}>
            Tip: candidates only see their unique <span className="code">/r/&lt;token&gt;</span> page.
          </div>
        </Card>
      </main>
    </>
  );
}
