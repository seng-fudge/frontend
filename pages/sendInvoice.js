import styles from "../styles/Send.module.css";

import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SendInvoice() {
  const { email, xml } = useContext(UserContext);

  return email ? (
    <main className="full gradient">
      {xml ? <SendForm /> : <h1>Please create an invoice first</h1>}
    </main>
  ) : (
    <LoginButton />
  );
}

function SendForm() {
  const { sendToken, setSendToken, token, xml } = useContext(UserContext);

  const sendForm = async (e) => {
    // Add check to find token if token expired
    if (!sendToken) {
      var newSendToken = await getSendToken(token);
      setSendToken(newSendToken);
    }

    console.log("Got token");
    console.log(sendToken)

    if (sendToken) {
      try {
        const response = await fetch(
          "https://fudge2021.herokuapp.com/invoice/extract_and_send/v2",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": sendToken,
            },
            body: JSON.stringify({
              file: xml,
            }),
          }
        );

        if (response.ok) {
          
          toast.success("Invoice send")

          router.push("/");
        } else {
          const data = await response.json();

          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }
    }
  };

  const checkXml = () => {
    console.log(xml);
  }

  return (
    <section className="centered">
      <h1 className="white-title">Confirmation</h1>
      <button onClick={() => sendForm()}>Send invoice</button>
      <button onClick={() => checkXml()}>Check xml</button>
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

async function getSendToken(token) {
  try {
    const response = await fetch(
      "https://fudge-backend.herokuapp.com/apis/connect",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      
      return data['send_token']
    } else {
      const data = await response.json();

      toast.error(data["message"]);
    }
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)

    console.log(error);
  }

  return null;
}
