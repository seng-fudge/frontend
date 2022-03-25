import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import LogoutButton from "../components/logoutButton";
import styles from "../styles/Authentication.module.css"

export default function Login() {
  const { email } = useContext(UserContext);

  return (
    <>
      <div className="split left gradient"></div>
      <div className="split right">
        <div className="centered">
          {email ? <LogoutButton /> : <SigninForm />}
        </div>
      </div>
    </>
  );
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
    event.preventDefault();
  };

  return (
    <>
      <h2 className="title">Sign in</h2>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="email"
          value={formEmail}
          onChange={onChangeEmail}
          className = {styles.input}
        />
        <input
          name="password"
          placeholder="password"
          value={formPassword}
          onChange={onChangePassword}
          className = {styles.input}
        />
        <button
          type="submit"
          className="btn-gradient centered-horizontal"
          disabled={!formEmail || !formPassword}
        >
          submit
        </button>
      </form>
      <h2>Create account</h2>
      <Link href="/signup" passHref>
        <button className="btn-green">Sign up</button>
      </Link>
    </>
  );
}
