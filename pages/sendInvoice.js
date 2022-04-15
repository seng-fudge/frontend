import styles from "../styles/Send.module.css";

import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function SendInvoice() {
  const { email, xml } = useContext(UserContext);

  return email ? (
    <main className="full gradient">
      {xml ? (
        <SendForm />
      ) : (
        <h1 className="centered">Please create an invoice first</h1>
      )}
    </main>
  ) : (
    <LoginButton />
  );
}

function SendForm() {
  const { sendToken, setSendToken, token, xml } = useContext(UserContext);

  const router = useRouter();

  const sendXml = async (e) => {
    // Add check to find token if token expired

    var sendTokenCurr = sendToken;

    if (!sendToken) {
      var newSendToken = await getSendToken(token);
      console.log("New token is " + newSendToken);
      setSendToken(newSendToken);
      sendTokenCurr = newSendToken;
    }

    if (sendTokenCurr) {
      console.log("Token being used: " + sendTokenCurr);

      try {
        const response = await fetch(
          "https://fudge2021.herokuapp.com/invoice/extract_and_send/v2",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: sendTokenCurr,
            },
            body: JSON.stringify({
              file: xml,
            }),
          }
        );

        if (response.ok) {
          toast.success("Invoice send");

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

  const sendPdf = async (e) => {
    // Add check to find token if token expired

    if (!sendToken) {
      var newSendToken = await getSendToken(token);
      console.log("New token is " + newSendToken);
      setSendToken(newSendToken);
    }

    try {
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/apis/email_pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": token,
          },
          body: JSON.stringify({
            xml: xml,
          }),
        }
      );

      if (response.ok) {
        toast.success("Invoice send");

        router.push("/");
      } else {
        const data = await response.json();

        toast.error(data["message"]);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  return (
    <section className="centered">
      <h1 className="white-title">Confirmation</h1>
      <button className="btn-white" onClick={() => sendXml()}>
        Send xml
      </button>
      <button className="btn-white" onClick={() => sendPdf()}>
        Send pdf
      </button>
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

      return data["send_token"];
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
