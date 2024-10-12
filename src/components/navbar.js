export default function Navbar() {
  return (
    <nav
      className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <a href="/" className="pl-8">
        Logo
      </a>
      <div className="pr-8">
        <a href="/" className="p-4">
          Home
        </a>
        <a href="/" className="p-4">
          About
        </a>
        <a href="/" className="p-4">
          Services
        </a>
        <a href="/" className="p-4">
          Contact
        </a>
      </div>
    </nav>
  );
}
