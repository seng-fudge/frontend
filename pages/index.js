import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Loader from "../components/Loader";
import { UserContext } from "../lib/context";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { email, password, sendToken, createToken, product } = useContext(UserContext);

  const test = () => {
    console.log(product);
  }

  return email ? (
    <main className="full gradient">
        <Link href="/createInvoice/customerDetails" passHref>
          <button className="btn-outline-white centered extra-large">Create</button>
        </Link>
        <button onClick={test}>
          test
        </button>
    </main>
  ) : (
    <Link href="/signup" passHref>
      <button className="btn-gradient large centered">Signup</button>
    </Link>
  );
}
