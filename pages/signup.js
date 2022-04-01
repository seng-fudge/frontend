import LogoutButton from "../components/logoutButton";
import { UserContext } from "../lib/context";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "../styles/Authentication.module.css";
import Loader from "../components/Loader";

export default function Signup() {
  const { email } = useContext(UserContext);

  return (
    <>
      <div className="split left gradient"></div>
      <div className="split right">
        <div className="centered">
          {email ? <LogoutButton /> : <SignUpForm />}
        </div>
      </div>
    </>
  );
}

function SignUpForm() {
  const { setEmail, setPassword, setCreateToken, setSendToken } =
    useContext(UserContext);

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [isValidPassword, setIsValidPassword] = useState(true);

  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e) => {
    const val = e.target.value;

    setFormEmail(val);

    setIsValidEmail(ValidateEmail(val));
  };

  const onChangePassword = (e) => {
    const val = e.target.value;

    setIsValidPassword(ValidatePassword(val));

    setFormPassword(val);
  };

  const onSubmit = async (e) => {
    event.preventDefault();

    setLoading(true)

    console.log("Button pressed");

    try {
      const response = await fetch(
        "https://authentication-seng2021.herokuapp.com/createUser",
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
        setCreateToken(data["create"]);
        setSendToken(data["send"]);
      } else {
        const data = await response.json();

        toast.error(data["message"]);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }

    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <section>
      <h2 className="title">Sign up</h2>
      <form onSubmit={() => onSubmit()}>
        <div>
          <input
            name="email"
            placeholder="email"
            value={formEmail}
            onChange={onChangeEmail}
            className={styles.input}
            type="email"
          />
          {!isValidEmail ? <h4 className="red-text">Invalid email</h4> : <></>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formPassword}
            onChange={onChangePassword}
            className={styles.input}
          />
          {!isValidPassword ? (
            <h4 className="red-text">
              Invalid password: Must be at least 8 char long with 1 lower case,
              upper case and num
            </h4>
          ) : (
            <></>
          )}
        </div>

        <button
          type="submit"
          className={"btn-gradient large"}
          disabled={
            !formEmail || !formPassword || !isValidEmail || !isValidPassword
          }
        >
          Create account
        </button>
      </form>
    </section>
  );
}

function ValidateEmail(email) {
  if (email == "") {
    return true;
  }
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
}

function ValidatePassword(password) {
  if (password == "") {
    return true;
  }

  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  if (password.length < 8) {
    return false;
  }

  if (!password.match(lowerCaseLetters)) {
    return false;
  }

  if (!password.match(upperCaseLetters)) {
    return false;
  }

  if (!password.match(numbers)) {
    return false;
  }

  return true;
}
