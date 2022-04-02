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
  const [hasData, setHasData] = useState(true)

  const [businessName, setBuisnessName] = useState("businessName");
  const [contactName, setContactname] = useState("contactName");
  const [electronicMail, setElectronicMail] = useState("electronicMail");
  const [supplierID, setSupplierID] = useState(0);
  const [street, setStreet] = useState("street");
  const [city, setCity] = useState("city");
  const [postcode, setPostcode] = useState(0);
  const [country, setCountry] = useState("country");
  const [currency, setCurrency] = useState("currency");

  const {token} = useContext(UserContext)

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/user/data",
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

          setBuisnessName(data['businessName']);
          setContactname(data['contactName']);
          setElectronicMail(data['electronicMail']);
          setSupplierID(data['supplierID']);
          setStreet(data['street']);
          setCity(data['city']);
          setPostcode(data['postcode']);
          setCountry(data['country']);
          setCurrency(data['currency']);

          setHasData(true)

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
    setDataLoaded(true)

  }
  , []);

  return (
    <main onLoadStart={() => loadData()}>
      <h1 className="title">User data</h1>
      
      {hasData ? (dataLoaded ? (
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
      )): <h2>Please enter your data</h2>}

      <Link href="userdetails" passHref>
        <button className="btn-gradient">Edit data</button>
      </Link>
    </main>
  );
}
