import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import Loader from "../components/Loader";
import UserData from "../components/UserData";
import Link from "next/link";

export default function User() {
  const { email } = useContext(UserContext);
  return !email ? <LoginButton /> : <UserDisplay />;
}

function UserDisplay() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const [businessName, setBuisnessName] = useState("businessName");
  const [contactName, setContactname] = useState("contactName");
  const [electronicMail, setElectronicMail] = useState("electronicMail");
  const [supplierID, setSupplierID] = useState(0);
  const [street, setStreet] = useState("street");
  const [city, setCity] = useState("city");
  const [postcode, setPostcode] = useState(0);
  const [country, setCountry] = useState("country");
  const [currency, setCurrency] = useState("currency");

  useEffect(async (e) => {
    //Put api call here
    await new Promise((r) => setTimeout(r, 1000));
    setDataLoaded(true);
  });

  return (
    <main onLoadStart={() => loadData()}>
      <h1 className="title">User data</h1>
      {dataLoaded ? (
        <>
          <UserData name="Buisness name" value={businessName} />
          <UserData name="Contact name" value={contactName} />
          <UserData name="Electronic mail" value={electronicMail} />
          <UserData name="Supplier ID" value={supplierID} />
          <h2 className="gradient-text">Address</h2>
          <UserData name="Street" value={street} />
          <UserData name="City" value={city} />
          <UserData name="Postcode" value={postcode} />
          <UserData name="Country" value={country} />
          <UserData name="Currency" value={currency} />
        </>
      ) : (
        <Loader />
      )}
      <Link href="userdetails" passHref>
        <button className="btn-gradient">Edit data</button>
      </Link>
    </main>
  );
}
