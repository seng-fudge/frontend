import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../lib/context";
import Loader from "../Loader";
import jsCookie from "js-cookie";

export default function PaymentHistory({ setIndex }) {
  const { token } = useContext(UserContext);
  const [pastPayments, setPastPayments] = useState([]);

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

  if (pastPayments.length == 0){
    return <div className="centered">
    <Loader />
  </div>
  } else {
      return <DisplayPayments payments={pastPayments} setIndex={setIndex}/>
  }

}

function DisplayPayments({ payments, setIndex }) {
  return (
    <div className="gap-left gap-bottom">
      <h1 className="white">Previous payments</h1>
      {payments.map((e) => (
        <PaymentForm payment={e} setIndex={setIndex} key={e["paymentId"]} />
      ))}
    </div>
  );
}

function PaymentForm({ payment, setIndex }) {
  const { setPayment } = useContext(UserContext);

  const onSelect = () => {
    setPayment(payment);

    jsCookie.set("payment", payment, { expires: 1 / 24 });
    
    setIndex(currIndex => currIndex + 1);
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
