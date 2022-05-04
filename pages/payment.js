import { useContext, useState, useEffect } from "react";

import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";
import jsCookie from "js-cookie";
import ProgBar from "../components/Progbar";
import { useRouter } from "next/router";

export default function Payment() {
  const { email } = useContext(UserContext);

  return email ? <PaymentCreate /> : <LoginButton />;
}

/*
TODO
- Add saving when done
*/

function PaymentCreate() {
  const { token, setPayment } = useContext(UserContext);

  const router = useRouter()

  const [pastPayments, setPastPayments] = useState([]);

  const onSubmit = async () => {
    event.preventDefault();

    const values = document.getElementById("form");

    const newPayment = {
      dueDate: values.elements["formDueDate"].value,
      paymentType: values.elements["formPaymentType"].value,
      paymentId: values.elements["formPaymentId"].value,
      paymentTerms: values.elements["formPaymentTerms"].value,
    };

    setPayment(newPayment);

    jsCookie.set("payment", newPayment, { expires: 1 / 24 });

    try {
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/history/payment",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            token: token,
          }),
          body: JSON.stringify(newPayment),
        }
      );

      console.log("created");

      console.log(response.status);

      if (response.ok) {
        const data = await response.text();

        router.push("/product")

        console.log(data);
      } else {
        const data = await response.json();

        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/history/payment",
          {
            method: "GET",
            headers: new Headers({
              token: token,
            }),
          }
        );

        if (response.status == 200) {
          const data = await response.json();
          console.log(data);

          setPastPayments(data["payments"]);

          // router.push("/user");
        } else if (response.status == 204) {
          setHasData(false);
        } else {
          const data = await response.json();

          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }

      //To move to next page
    }
    fetchData();
  }, [token]);

  return (
    <main>
      <div className="split-25 left gradient">
        {pastPayments.length == 0 ? (
          <div className="centered">
            <Loader />
          </div>
        ) : (
          <div>
            <DisplayPayments payments={pastPayments} />
          </div>
        )}
      </div>
      <div className="split-75 right gap-left gap-bottom">
        <ProgBar index={1}/>
        <form id="form" onSubmit={() => onSubmit()}>
          <h1 className="gradient-text large-text reduce-margin">
            Payment Details
          </h1>
          <FormInput
            id="formDueDate"
            name="Due date"
            type="text"
          />
          <FormInput
            id="formPaymentType"
            name="Payment type"
            type="number"
          />
          <FormInput
            id="formPaymentId"
            name="Payment Id"
            type="text"
          />
          <FormInput
            id="formPaymentTerms"
            name="Payment terms"
            type="text"
          />
          <button type="submit" className="btn-gradient">
            Next
          </button>
        </form>
      </div>
    </main>
  );
}

function DisplayPayments({ payments }) {
  return (
    <div className="gap-left gap-bottom">
      <h1 className="white">Previous payments</h1>
      {payments.map((e) => (
        <PaymentForm payment={e} key={e["paymentId"]} />
      ))}
    </div>
  );
}

function PaymentForm({ payment }) {
  const router = useRouter()
  const { setPayment } = useContext(UserContext);

  const onSelect = () => {
    setPayment(payment);

    jsCookie.set("payment", payment, { expires: 1 / 24 });
    router.push("/product")
  };

  return (
    <div
      className="pointer"
      onClick={() => {
        onSelect();
      }}
    >
      <h3 className="white">{payment["paymentId"]}</h3>
    </div>
  );
}
