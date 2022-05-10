import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../lib/context";
import Loader from "../Loader";
import jsCookie from "js-cookie";

export default function CustomerHistory({ setIndex }) {
  const { token } = useContext(UserContext);
  const [pastCustomers, setPastCustomers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/history/customer",
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

          setPastCustomers(data["customers"]);
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

  if (pastCustomers.length == 0) {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  } else {
    return <DisplayCustomers customers={pastCustomers} setIndex={setIndex} />;
  }
}

function DisplayCustomers({ customers, setIndex }) {
  return (
    <div className="gap-left gap-bottom">
      <h1 className="white">Previous customers</h1>
      {customers.map((e) => (
        <CustomerForm
          customer={e}
          setIndex={setIndex}
          key={e["buyerReference"]}
        />
      ))}
    </div>
  );
}

function CustomerForm({ customer, setIndex }) {
  const { setCustomer } = useContext(UserContext);

  const onSelect = () => {
    setCustomer(customer);

    jsCookie.set("customer", customer, { expires: 1 / 24 });

    setIndex((currIndex) => currIndex + 1);
  };

  return (
    <div
      className="pointer"
      onClick={() => {
        onSelect();
      }}
    >
      <h3 className="white">{customer["buyerReference"]}</h3>
    </div>
  );
}
