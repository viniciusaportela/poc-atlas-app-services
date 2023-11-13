import {useState} from "react";
import {Login} from "./Login";
import {Register} from "./Register";

export const Unauthenticated = () => {
  const [page, setPage] = useState("login")

  return page === "login" ? <Login setPage={setPage}/> : <Register setPage={setPage}/>
}