import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../lib/context";
import LogoutButton from "../components/logoutButton";
import styles from "../styles/Authentication.module.css"
import toast from "react-hot-toast";

export default function Login() {
  const { email} = useContext(UserContext);

  return (
    <>
      <div className="split right gradient"></div>
      <div className="split left">
        <div className="centered">
          {email ? <LogoutButton /> : <SigninForm />}
        </div>
      </div>
    </>
  );
}

function SigninForm() {
  const {setCreateToken, setSendToken, setEmail, setPassword} = useContext(UserContext)

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const onChangeEmail = (e) => {
    const val = e.target.value;

    setFormEmail(val);
  };

  const onChangePassword = (e) => {
    const val = e.target.value;

    setFormPassword(val);
  };

  const onSubmit = async (e) => {
    event.preventDefault();

    console.log("Button pressed");

    try {
      const response = await fetch(
        "https://authentication-seng2021.herokuapp.com/collectToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            email: formEmail,
            password: formPassword,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setEmail(formEmail);
        setPassword(formPassword);
        setCreateToken(data['create'])
        setSendToken(data['send'])
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
    <>
      <h2 className="title">Sign in</h2>
      <form onSubmit={() => onSubmit()}>
        <input
          name="email"
          placeholder="email"
          value={formEmail}
          onChange={onChangeEmail}
          className = {styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formPassword}
          onChange={onChangePassword}
          className = {styles.input}
        />
        <button
          type="submit"
          className="btn-gradient large"
          disabled={!formEmail || !formPassword}
        >
          Sign in
        </button>
      </form>
      <h4>Don't have an account? <a href="/signup" className="gradient-text"><u>Sign up!</u></a></h4>
    </>
  );
}
