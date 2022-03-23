export default function LogoutButton() {
  const { email } = useContext(UserContext);

  return (
    <button className="btn-red" onClick={logout}>
      Logout of {email}
    </button>
  );
}

function logout() {
  const { setEmail, setPassword } = useContext(UserContext);

  setEmail(null);
  setPassword(null);
}
