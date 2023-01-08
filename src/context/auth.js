import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [informacoes, setInformacoes] = useState("");
  const [screen, setScreen] = useState("");
  const [login, setLogin] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  function PutRole(role) {
    setRole(role);
    if (role) {
      navigation.navigate("Email");
    }
  }

  function ShowTab(screen) {
    setScreen(screen);
  }

  function PutEmail(email) {
    setEmail(email);
    if (email) {
      navigation.navigate("Codigo");
    }
  }

  function PutCodigo(codigo) {
    setCodigo(codigo);
    if (codigo) {
      navigation.navigate("Informacoes");
    }
  }
  function PutInformacoes(Nome, Telefone, Senha, Rsenha) {
    setInformacoes([
      { Nome: Nome, Telefone: Telefone, Senha: Senha, Rsenha: Rsenha },
    ]);
    if (informacoes) {
      navigation.navigate("Home");
    }
  }
  function PutLogin(email, login) {
    setLogin(login);
    setEmail(email);

    setSignedIn(login);
    console.log(signedIn);
  }

  function PutLogout(login) {
    setSignedIn(login);
  }
  return (
    <AuthContext.Provider
      value={{
        signedIn,
        login,
        screen,
        codigo,
        informacoes,
        role,
        email,
        PutLogout,
        ShowTab,
        PutCodigo,
        PutRole,
        PutEmail,
        PutInformacoes,
        PutLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
