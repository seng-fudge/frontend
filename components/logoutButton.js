import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function LogoutButton() {
  const { email, setEmail, password, setPassword } = useContext(UserContext);

  const resetLogin = async (e) => {

    try {
      const response = await fetch(
        "https://authentication-seng2021.herokuapp.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }


    setEmail(null);
    setPassword(null);
  }

  return (
    <button className="btn-red" onClick={() => resetLogin()}>
      Logout of {email}
    </button>
  );
}