import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import LogoutButton from "./logoutButton";

export default function NavBar() {
  const { email } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-gradient">Home</button>
          </Link>
        </li>
        {email ? (<li><LogoutButton/></li>) : (<li><Link href="/login" passHref>
          <button className="btn-gradient">Login</button>
        </Link></li>)}
      </ul>
    </nav>
  );
}
