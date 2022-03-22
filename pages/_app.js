import { useState } from "react/cjs/react.development";
import NavBar from "../components/navbar";
import { UserContext } from "../lib/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  const [createToken, setCreateToken] = useState(null)
  const [sendToken, setSendToken] = useState(null)


  return (
    <UserContext.Provider value={{createToken, sendToken}}>
      <NavBar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
