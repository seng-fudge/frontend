import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import Loader from "../components/Loader";
import styles from "../styles/History.module.css";

export default function InvoiceHistory() {
  const { token } = useContext(UserContext);

  return token ? <HistoryTitle token={token} /> : <LoginButton />;
}

function HistoryTitle({ token }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/user/invoice_history",
          {
            method: "GET",
            headers: new Headers({
              token: token,
            }),
          }
        );

        if (response.status == 200) {
          const data = await response.json();

          setHistory(data["history"]);

          console.log(data);

          setDataLoaded(true);
        } else {
          const data = await response.json();

          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }
    }
    fetchData();
  }, [token]);

  return (
    <main className="full gradient">
      <h1 className="white-title raise-content">Sent invoices</h1>
      {dataLoaded ? <DisplayHistory history={history} /> : <Loader />}
    </main>
  );
}

function DisplayHistory({ history }) {

  if (history.length > 0){
    return (
      <div>
        {history.map((e) => (
          <DisplayInvoice invoice={e} key={e["time"]} />
        ))}
      </div>
    );
  } else {
    <h4 className="white">No invoices sent</h4>
  }

  
}

function DisplayInvoice({ invoice }) {
  var date = new Date(invoice["time"] * 1000);
  var time = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <div className={styles.invoice}>
      <DisplayPart desctription={"Recipient"} data={invoice['recipient']}/>
      <DisplayPart desctription={"Email"} data={invoice['email']}/>
      <DisplayPart desctription={"Time"} data={time}/>
      <DisplayPart desctription={"Due"} data={invoice['due']}/>
    </div>
  );
}

function DisplayPart({ desctription, data }) {
  return (
    <div>
      <h3 className={styles.subtitle}>{desctription}</h3>
      {data}
    </div>
  );
}
