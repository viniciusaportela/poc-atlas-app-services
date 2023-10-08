import {useState} from "react";
import {Login} from "./Login";
import {Home} from "./Home";
import {AppProvider} from "@realm/react";


export default function App() {
  const [page, setPage] = useState("login")

  const onNavigate = (page: string) => {
    setPage(page);
  }

  return <AppProvider id={}>

  </AppProvider>

  return (
    page === "login" ? <Login onNavigate={onNavigate}/> : <Home onNavigate={onNavigate}/>
  );
}
