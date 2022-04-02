import Link from "next/link";
import { useContext } from "react";
import FormInput from "../components/FormInput";
import LoginButton from "../components/LoginButton";
import { UserContext } from "../lib/context";
import styles from "../styles/User.module.css";

export default function UserDetails() {
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
        <FormInput id="businessName" name="Business name" type="text" />
        <FormInput id="contactName" name="Contact name" type="text" />
        <FormInput id="electronicMail" name="Email" type="email" />
        <FormInput id="supplierID" name="Supplier id" number="true" type="text" />

        <h2>Address</h2>
        <FormInput id="street" name="Street" type="text" />
        <FormInput id="city" name="City" type="text" />
        <FormInput id="postcode" name="Postcode" number="true" type="number" />
        <FormInput id="country" name="Country" type="text" />
        <FormInput id="currency" name="Currency" type="text" />

        <button className="btn-gradient" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
