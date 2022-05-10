import { useContext } from "react";
import { UserContext } from "../../lib/context";
import jsCookie from "js-cookie";
import FormInput from "../FormInput";

export default function PaymentForm({setIndex}){

    const { token, setPayment } = useContext(UserContext);

    const onSubmit = async () => {
        event.preventDefault();
    
        const values = document.getElementById("paymentForm");
    
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
    
            setIndex(currIndex => currIndex + 1)
    
            console.log(data);
          } else {
            const data = await response.json();
    
            console.log(data);
          }
        } catch (e) {
          console.log(e);
        }
      };

    return <form id="paymentForm" onSubmit={() => onSubmit()}>
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
}