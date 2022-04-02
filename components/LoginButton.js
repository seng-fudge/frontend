import Link from "next/link";

export default function LoginButton() {
    return (
      <Link href="/login" passHref>
        <button className="centered btn-gradient large">Log in</button>
      </Link>
    );
  }