import { useContext, useEffect } from "react";
import { UserContext } from "../../lib/context";
import jsCookie from "js-cookie";
import FormInput from "../FormInput";

export default function CustomerForm({setIndex}) {

  const {token, customer, setCustomer} = useContext(UserContext);

  

  useEffect(() => {
    const values = document.getElementById("customerForm");
    if (customer != null){
      values.elements["formBuyerReference"].value = customer['buyerReference'];
      values.elements["formCustomerContactName"].value = customer['customerName'];
      values.elements["formCustomerRegistration"].value = customer['businessName'];
      values.elements["formCustomerEmail"].value = customer['email'];
      values.elements["formCustomerStreet"].value = customer['streetAddress'];
      values.elements["formCustomerAddStreet"].value = customer['additionalStreetAddress'];
      values.elements["formCustomerCity"].value = customer['city'];
      values.elements["formCustomerPost"].value = customer['postcode'];
      country: values.elements["formCustomerCountry"].value = customer['country'];
    }
  }, [customer])

  const onSubmit = async () => {
    const values = document.getElementById("customerForm");

    event.preventDefault();

    const newCustomer = {
      buyerReference: values.elements["formBuyerReference"].value,
      customerName:
          values.elements["formCustomerContactName"].value,
      businessName:
          values.elements["formCustomerRegistration"].value,
      email: values.elements["formCustomerEmail"].value,
      streetAddress: values.elements["formCustomerStreet"].value,
      additionalStreetAddress: values.elements["formCustomerAddStreet"].value,
      city: values.elements["formCustomerCity"].value,
      postcode: values.elements["formCustomerPost"].value,
      country: values.elements["formCustomerCountry"].value,
    }

    setCustomer(newCustomer)

    jsCookie.set('customer', newCustomer, { expires: 1/24 })

    try{
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/history/customer",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            'token': token
          }),
          body: JSON.stringify(newCustomer)
        }
      )

      console.log("created");

      console.log(response.status);

      if (response.ok) {
        const data = await response.text();
        
        setIndex(currIndex => currIndex + 1);

      } else {
        const data = await response.json();

        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      id="customerForm"
      onSubmit={() => onSubmit()}
    >
      <h1 className="gradient-text large-text reduce-margin">
        Customer Details
      </h1>
      <FormInput id="formBuyerReference" name="Buyer reference" type="text" />
      <FormInput
        id="formCustomerContactName"
        name="Customer Name"
        type="text"
      />
      <FormInput
        id="formCustomerRegistration"
        name="Registered Business Name"
        type="text"
      />
      <FormInput id="formCustomerEmail" name="Email" type="email" />
      <FormInput id="formCustomerStreet" name="Street Address" type="text" />
      <FormInput
        id="formCustomerAddStreet"
        name="Additional Street Address"
        type="text"
      />
      <FormInput id="formCustomerCity" name="City" type="text" />
      <FormInput id="formCustomerPost" name="Postcode" type="number" />
      <FormInput id="formCustomerCountry" name="Country" type="text" />
      <button type="submit" className="btn-gradient">
        Next
      </button>
    </form>
  );
}