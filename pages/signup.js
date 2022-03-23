import LogoutButton from "../components/logoutButton";
import { UserContext } from "../lib/context";
import { useContext, useState } from "react"
import Link from "next/link";
import debounce from "lodash.debounce";

export default function Home() {
    const { email } = useContext(UserContext);
  
    return <main>{email ? <LogoutButton/> : <SignUpForm />}</main>;
}

function SignUpForm() {
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);

    const [isValidPassword, setIsValidPassword] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
  
    const onChangeEmail = (e) => {
      const val = e.target.value;
  
      setFormEmail(val);
    };
  
    const onChangePassword = (e) => {
      const val = e.target.value;
  
      setFormPassword(val);
    };
  
    const onSubmit = async (e) => {
      //TODO Add api login call
    };
  
    return (
      <section>
        <h2>Sign up</h2>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            placeholder="email"
            value={formEmail}
            onChange={onChangeEmail}
          />
          <input
            name="password"
            placeholder="password"
            value={formPassword}
            onChange={onChangePassword}
          />
          <button
            type="submit"
            className="btn-green"
            disabled={!formEmail || !formPassword}
          >
            Create account
          </button>
        </form>
      </section>
    );
  }
  