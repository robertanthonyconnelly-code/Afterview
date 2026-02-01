export function Header() {
  return (
    <header className="header">
      <a href="/" className="brand">
        <img src="/av-logo-v2.png" alt="Afterview" />
        <div style={{ lineHeight: 1 }}>
          <div className="wordmark">Afterview</div>
          <div className="tagline">From Rejection to Real Direction</div>
        </div>
      </a>

      <nav className="nav">
        <a href="/create">Create</a>
        <a href="/hub">Hub</a>
      </nav>
    </header>
  );
}

export function Card({ children, hover = true }) {
  return <div className={`surface card ${hover ? "hover" : ""}`}>{children}</div>;
}

export function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

export function Divider() {
  return <hr className="hr" />;
}

export function Button({ href, kind = "primary", children, ...props }) {
  const cls = `btn ${kind}`;
  if (href) return <a className={cls} href={href} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}

export function Field({ label, hint, children }) {
  return (
    <div className="field">
      <div className="labelRow">
        <label className="label">{label}</label>
        {hint ? <span className="hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
