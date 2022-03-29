import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../lib/context";
import LogoutButton from "../components/logoutButton";
import styles from "../styles/Authentication.module.css";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Link from "next/link";

export default function Login() {
  const { email } = useContext(UserContext);

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
  const { setToken, setEmail } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    console.log("Button pressed");

    try {
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/user/login",
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
        setToken(data["token"]);
      } else {
        const data = await response.json();

        toast.error(data["message"]);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }

    setLoading(false);
    location.href('/')
  };

  return loading ? (
    <Loader />
  ) : (
    <section>
      <h2 className="title">Sign in</h2>
      <form onSubmit={() => onSubmit()}>
        <input
          name="email"
          placeholder="email"
          value={formEmail}
          onChange={onChangeEmail}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formPassword}
          onChange={onChangePassword}
          className={styles.input}
        />
        <button
          type="submit"
          className="btn-gradient large"
          disabled={!formEmail || !formPassword}
        >
          Sign in
        </button>
      </form>
      <h4>
        Don{"'"}t have an account?{" "}
        <Link href="/signup" passHref>
          <u className="gradient-text pointer">Sign up!</u>
        </Link>
      </h4>
    </section>
  );
}
