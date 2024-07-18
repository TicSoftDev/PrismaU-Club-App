import FormLogin from "../../components/login/FormLogin";
import useAuth from "../../hooks/useAuth";

export default function LoginScreen() {

  const { loading, documento, password, setDocumento, setPassword, handleLogin } = useAuth();

  return (
    <FormLogin
      documento={documento} password={password} handleLogin={handleLogin}
      setDocumento={setDocumento} setPassword={setPassword} loading={loading}
    />
  );
}
