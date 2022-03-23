import { useState } from "react/cjs/react.development";
import NavBar from "../components/navbar";
import { UserContext } from "../lib/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [createToken, setCreateToken] = useState(null);
  const [sendToken, setSendToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <UserContext.Provider
      value={{
        createToken,
        setCreateToken,
        sendToken,
        setSendToken,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      <NavBar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
