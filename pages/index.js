import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import About from "../components/About";
import Loader from "../components/Loader";
import { UserContext } from "../lib/context";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { email, password, sendToken, createToken, product } = useContext(UserContext);


  return email ? (
    <main className="full gradient">
        <div className="split left">
            <Link href="/create" passHref>
            <button className="btn-outline-white centered extra-large">Create</button>
            </Link>
        </div>
        <div className="split right">
            <Link href="/user" passHref>
            <button className="btn-outline-white centered extra-large">User Details</button>
            </Link>
        </div>
    </main>
  ) : (
    <About/>
  );
}
