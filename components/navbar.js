import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <button className="btn-red">Home</button>
      </Link>
    </nav>
  );
}
