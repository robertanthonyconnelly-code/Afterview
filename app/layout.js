import "./globals.css";

export const metadata = {
  title: "Afterview",
  description: "From Rejection to Real Direction"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="wash" />
        {children}
      </body>
    </html>
  );
}
