import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Loader from "../components/Loader";
import { UserContext } from "../lib/context";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { email, password, sendToken, createToken } = useContext(UserContext);

  return email ? (
    <div className="full gradient">
      <div className="split left">
        <Link href="/createInvoice" passHref>
          <button className="btn-outline-white btn-circular centered large">Create</button>
        </Link>
      </div>
      <div className="split right">
        <Link href="/sendInvoice" passHref>
          <button className="btn-outline-white centered large">Send</button>
        </Link>
      </div>
    </div>
  ) : (
    <Link href="/signup" passHref>
      <button className="btn-gradient large centered">Signup</button>
    </Link>
  );
}
