import { useContext, useState, useEffect } from "react";

import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";
import jsCookie from "js-cookie";
import ProgBar from "../components/Progbar";
import { useRouter } from "next/router";

export default function Customer() {
  const { email } = useContext(UserContext);

  return email ? <CustomerCreate /> : <LoginButton />;
}

/*
TODO
- Add saving when done
*/

function CustomerCreate() {

  const {token, setCustomer} = useContext(UserContext);

  const [pastCustomers, setPastCustomers] = useState([]);

  const router = useRouter()

  const onSubmit = async () => {

    event.preventDefault();

    const values = document.getElementById("form");

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
        router.push("/payment")
      } else {
        const data = await response.json();

        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/history/customer",
          {
            method: "GET",
            headers: new Headers({
              'token': token
            }),
          }
        );
  
        if (response.status == 200) {
          const data = await response.json();
          console.log(data);

          setPastCustomers(data['customers'])

          // router.push("/user");
        }else if (response.status == 204){
          setHasData(false)
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
    fetchData()
  }, [token]);


  return (
    <main>
      <div className="split-25 left gradient">
        {pastCustomers.length == 0 ? (
          <div className="centered">
            <Loader />
          </div>
        ) : (
          <div>
            <DisplayCustomers customers = {pastCustomers}/>
          </div>
        )}
      </div>
      <div className="split-75 right gap-left gap-bottom">
        <ProgBar index={0}/>
        <form id="form" onSubmit={() => onSubmit()}>
          <h1 className="gradient-text large-text reduce-margin">Customer Details</h1>
          <FormInput
            id="formBuyerReference"
            name="Buyer reference"
            type="text"
          />
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
          <FormInput
            id="formCustomerStreet"
            name="Street Address"
            type="text"
          />
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
      </div>
    </main>
  );
}

function DisplayCustomers({customers}){

  return <div className="gap-left gap-bottom">
    <h1 className="white">Previous customers</h1>
    {customers.map(e => <CustomerForm customer={e} key={e['customerName']}/>)}
  </div>

}

function CustomerForm({customer}){

  const router = useRouter()

  const {setCustomer} = useContext(UserContext)

  const onSelect = () => {
    setCustomer(customer)

    jsCookie.set('customer', customer, { expires: 1/24 })
    router.push("/payment")
  }

  return <div className="pointer" onClick={() => {onSelect()}} >
    <h3 className="white">{customer['customerName']}</h3>
  </div>

}