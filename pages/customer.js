import { useContext, useState, useEffect } from "react";

import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";

export default function Customer() {
  const { email } = useContext(UserContext);

  return email ? <CustomerCreate /> : <LoginButton />;
}

function CustomerCreate() {

  const {token} = useContext(UserContext);

  const [pastCustomers, setPastCustomers] = useState([]);

  const onSubmit = async () => {

    event.preventDefault();

    const values = document.getElementById("form");

    try{
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/history/customer",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            'token': token
          }),
          body: JSON.stringify({
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
          })
        }
      )

      console.log("created");

      console.log(response.status);

      if (response.ok) {
        const data = await response.text();

        console.log(data);

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
    }
    fetchData()
  }, []);


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
      <div className="split-75 right gap">
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
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

function DisplayCustomers({customers}){

  return <div className="gap">
    <h1 className="white">Previous customers</h1>
    {customers.map(e => <CustomerForm customer={e}/>)}
  </div>

}

function CustomerForm({customer}){


  const onSelect = () => {
    console.log(customer);
    //Add code to save customer and move to next page
  }

  return <div className="pointer" onClick={() => {onSelect()}} >
    <h3 className="white">{customer['customerName']}</h3>
  </div>

}