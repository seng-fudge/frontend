import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function LogoutButton() {
  const { email, setEmail, setPassword } = useContext(UserContext);

  const resetLogin = (e) => {
    setEmail(null);
    setPassword(null);
  }

  return (
    <button className="btn-red" onClick={() => resetLogin()}>
      Logout of {email}
    </button>
  );
}