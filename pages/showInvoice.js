import styles from "../styles/Frame.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ShowInvoice() {
  const { email, xml, token } = useContext(UserContext);

  return email ? (
    <main>
      {xml ? (
        <DisplayInvoice xml={xml} token={token} />
      ) : (
        <h1>Please create an invoice first</h1>
      )}
    </main>
  ) : (
    <LoginButton />
  );
}

function DisplayInvoice({ xml, token }) {
  const [htmlValue, setHtmlValue] = useState(
    `<html><main>Loading</main></html>`
  );

  useEffect(() => {
    async function fetchData() {
      console.log(xml);
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/apis/render_forward",
          {
            method: "POST",
            headers: new Headers({
              'Content-Type': 'application/json',
              'token': token
            }), 
            body: JSON.stringify({
              xml: xml,
            }),
          }
        );

        if (response.status == 200) {
          const data = await response.text();
          setHtmlValue(data);

          // router.push("/user");
        } else {
          const data = await response.json();
          console.log(data);
          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }
    }
    fetchData();
  }, [xml, token]);

  return (
    <>
      <iframe className={styles.showpage} srcDoc={htmlValue}></iframe>
      <Link href="/sendInvoice" passHref>
        <button className="btn-gradient">Send</button>
      </Link>
    </>
  );
}
