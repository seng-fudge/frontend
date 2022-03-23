import Head from "next/head";
import Image from "next/image";
import { useContext } from "react/cjs/react.development";
import { useState } from "react";
import { UserContext } from "../lib/context";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import LogoutButton from "../components/logoutButton";

export default function Home() {
  const { email } = useContext(UserContext);

  return <main>{email ? <LogoutButton/> : <SigninForm />}</main>;
}

function SigninForm() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const onChangeEmail = (e) => {
    const val = e.target.value;

    setFormEmail(val);
  };

  const onChangePassword = (e) => {
    const val = e.target.value;

    setFormPassword(val);
  };

  const onSubmit = async (e) => {
    //TODO Add api login call
  };

  return (
    <section>
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="email"
          value={formEmail}
          onChange={onChangeEmail}
        />
        <input
          name="password"
          placeholder="password"
          value={formPassword}
          onChange={onChangePassword}
        />
        <button
          type="submit"
          className="btn-green"
          disabled={!formEmail || !formPassword}
        >
          submit
        </button>
      </form>
      <h2>Create account</h2>
      <Link href="/signup">
        <button className="btn-green">Sign up</button>
      </Link>
    </section>
  );
}
