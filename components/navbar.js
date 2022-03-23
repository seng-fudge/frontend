import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function NavBar() {
  const { email } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-red">Home</button>
          </Link>
        </li>
        {email ? (<li><Link href="/login">
          <button className="btn-red">Logout</button>
        </Link></li>) : (<li><Link href="/login">
          <button className="btn-green">Login</button>
        </Link></li>)}
      </ul>
    </nav>
  );
}
