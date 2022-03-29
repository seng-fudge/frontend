import styles from "../styles/Send.module.css";

import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function SendInvoice() {
  const { email } = useContext(UserContext);

  return email ? (
    <main className="full gradient">
      <SendForm />
    </main>
  ) : (
    <LoginButton />
  );
}

function SendForm() {
  const [sendEmail, setSendEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const onChangeEmail = (e) => {
    const val = e.target.value;

    setSendEmail(val);

    setValidEmail(ValidateEmail(val));
  };

  const onSubmit = (e) => {
    event.preventDefault();

    console.log(sendEmail)
  }

  return (
    <section className="centered">
      <h1 className="white-title">Confirmation</h1>
      <form onSubmit={() => onSubmit()}>
        <input
          name="email"
          placeholder="email"
          value={sendEmail}
          onChange={onChangeEmail}
          className={styles.input}
        />
        {!validEmail ? <h4 className="red-text">Invalid email</h4> : <></>}
        <button type="submit" className="btn-white large" disabled = {!sendEmail || !validEmail}>
          Send
        </button>
      </form>
    </section>
  );
}

function LoginButton() {
  return (
    <Link href="/login" passHref>
      <button className="centered btn-gradient large">Log in</button>
    </Link>
  );
}

function ValidateEmail(email) {
  if (email == "") {
    return true;
  }
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
}
