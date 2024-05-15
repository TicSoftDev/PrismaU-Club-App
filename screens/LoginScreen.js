import { useState } from "react";
import FormLogin from "../components/login/FormLogin";
import { useAuthContext } from "../context/AuthContext";
import { Alert } from "react-native";
import { Routes } from "../routes/Routes";
import useAuth from "../hooks/useAuth";

export default function LoginScreen() {

  const { loading, documento, password, setDocumento, setPassword, handleLogin } = useAuth();

  return (
    <FormLogin
      documento={documento} password={password} handleLogin={handleLogin}
      setDocumento={setDocumento} setPassword={setPassword} loading={loading}
    />
  );
}
