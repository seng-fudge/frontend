import Link from "next/link";
import { useContext } from "react";
import FormInput from "../components/FormInput";
import LoginButton from "../components/LoginButton";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import styles from "../styles/User.module.css";
import { useRouter } from "next/router";

export default function UserDetails() {
  const { email } = useContext(UserContext);
  return !email ? <LoginButton /> : <UserDetailForm />;
}

function UserDetailForm() {

  const {token} = useContext(UserContext)

  const router = useRouter();

  const onSubmit = async (e) => {
    event.preventDefault();

    const values = document.getElementById("form");

    const thing = values.elements["businessName"].value

    try {
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/user/data",
        {
          method: "POST",
          headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
          }), 

          body: JSON.stringify({
            // your expected POST request payload goes here
            businessName: String(thing),
            contactName: values.elements["contactName"].value,
            electronicMail: values.elements["electronicMail"].value,
            supplierID: Number(values.elements["supplierID"].value),
            street: values.elements["street"].value,
            city: values.elements["city"].value,
            postcode: values.elements["postcode"].value,
            country: values.elements["country"].value,
            currency: values.elements["currency"].value,
          }),
        }
      );

      if (response.ok) {
        router.push("/user");
      } else {
        const data = await response.json();

        toast.error(data["message"]);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  return (
    <main>
      <h1 className="gradient-text">User details</h1>

      <form id="form" onSubmit={() => onSubmit()}>
        <FormInput id="businessName" name="Business name" type="text" />
        <FormInput id="contactName" name="Contact name" type="text" />
        <FormInput id="electronicMail" name="Email" type="email" />
        <FormInput
          id="supplierID"
          name="Supplier id"
          type="number"
        />

        <h2>Address</h2>
        <FormInput id="street" name="Street" type="text" />
        <FormInput id="city" name="City" type="text" />
        <FormInput id="postcode" name="Postcode" number="true" type="text" />
        <FormInput id="country" name="Country" type="text" />
        <FormInput id="currency" name="Currency" type="text" />

        <button className="btn-gradient" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
