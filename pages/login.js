import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../lib/context";
import LogoutButton from "../components/logoutButton";
import styles from "../styles/Authentication.module.css";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";

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

  const router = useRouter();

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
        "https://fudge-backend.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formEmail,
            password: formPassword,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        
        jsCookie.set('email', formEmail, { expires: 1/24 })
        jsCookie.set('token', data["token"], { expires: 1/24 })

        setEmail(formEmail);
        setToken(data["token"]);


        router.push("/")
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
