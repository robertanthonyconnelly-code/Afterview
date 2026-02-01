onSubmit={async (e) => {
  e.preventDefault();
  setNotice("");
  setLoading(true);

  const fd = new FormData(e.currentTarget);

  const res = await fetch("/api/create", {
    method: "POST",
    body: fd
  });

  setLoading(false);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    setNotice(err.error || "Error creating Afterview");
    return;
  }

  const data = await res.json();
  window.location.href = `/admin/${data.token}`;
}}
