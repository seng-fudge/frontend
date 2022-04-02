import Link from "next/link";
import { useContext, setState } from "react";
import FormInput from "../components/FormInput";
import { UserContext } from "../lib/context";
import styles from "../styles/User.module.css";
import LoginButton from "../components/LoginButton";

export default function UserDetail() {
  const { email } = useContext(UserContext);
  return (!email ? <LoginButton /> : <UserDetailForm />);
}



function UserDetailForm() {

  const onSubmit = async (e) => {
    event.preventDefault();


    const values = document.getElementById('form');

    console.log(values.elements['businessName'].value);

  }

  return (
    <main>
      <h1 className="gradient-text">User details</h1>

      <form id="form" onSubmit={() => onSubmit()}>
        <FormInput id="businessName" name="Business name" />
        <FormInput id="contactName" name="Contact name" />
        <FormInput id="electronicMail" name="Email" />
        <FormInput id="supplierID" name="Supplier id" number="true" />

        <h2>Address</h2>
        <FormInput id="street" name="Street" />
        <FormInput id="city" name="City" />
        <FormInput id="postcode" name="Postcode" number="true" />
        <FormInput id="country" name="Country" />
        <FormInput id="currency" name="Currency" />

        <button className="btn-gradient" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
