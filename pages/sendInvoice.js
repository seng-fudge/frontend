import styles from "../styles/Send.module.css";

import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function SendInvoice() {
  const { email, xml } = useContext(UserContext);

  return email ? (
    <main className="full gradient">
      (xml ? <SendForm /> : <h1>Please create an invoice first</h1>)
    </main>
  ) : (
    <LoginButton />
  );
}

function SendForm() {
  const [sendEmail, setSendEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const onChangeEmail = async (e) => {
    
  };

  const sendForm = (e) => {
    event.preventDefault();

    console.log(sendEmail);
  };

  return (
    <section className="centered">
      <h1 className="white-title">Confirmation</h1>
      <button onClick={() => sendForm}>Send invoice</button>
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
