import LogoutButton from "../components/logoutButton";
import { UserContext } from "../lib/context";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Signup() {
  const { email } = useContext(UserContext);

  return <main>{email ? <LogoutButton /> : <SignUpForm />}</main>;
}

function SignUpForm() {
  const { email, setEmail, password, setPassword } = useContext(UserContext);

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [isValidPassword, setIsValidPassword] = useState(true);

  const onChangeEmail = (e) => {
    const val = e.target.value;

    setIsValidEmail(ValidateEmail(val));

    setFormEmail(val);
  };

  const onChangePassword = (e) => {
    const val = e.target.value;

    setIsValidPassword(ValidatePassword(val));

    setFormPassword(val);
  };

  const onSubmit = async (e) => {
    event.preventDefault();

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
      } else {
        const data = await response.json();

        toast.error(data['message'])
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
    // fetchThing();
  };

  return (
    <section>
      <h2>Sign up</h2>
      <form onSubmit={() => onSubmit()}>
        <div>
          <input
            name="email"
            placeholder="email"
            value={formEmail}
            onChange={onChangeEmail}
          />
          {!isValidEmail ? <h4 className="red-text">Invalid email</h4> : <></>}
        </div>

        <div>
          <input
            name="password"
            placeholder="password"
            value={formPassword}
            onChange={onChangePassword}
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
          className="btn-green"
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

function fetchThing() {
  fetch("https://google.com");
}
