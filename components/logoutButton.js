import jsCookie from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function LogoutButton() {
  const { email, setEmail, setToken, setSendToken} = useContext(UserContext);

  const resetLogin = async (e) => {

    //TODO add implementatino for new api
    

    // try {
    //   const response = await fetch(
    //     "https://authentication-seng2021.herokuapp.com/logout",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: email,
    //         password: password,
    //       }),
    //     }
    //   );
    // } catch (error) {
    //   // enter your logic for when there is an error (ex. error toast)

    //   console.log(error);
    // }


    setEmail(null);
    setToken(null);
    setSendToken(null);

    //Delete cookies
    jsCookie.remove("email")
    jsCookie.remove("token")
    jsCookie.remove("sendToken")


    //Add logout from backend function
  }

  return (
    <button className="btn-blue-text" onClick={() => resetLogin()}>
      Logout
    </button>
  );
}