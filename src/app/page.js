"use client";
import Login from "./components/login/Login";
import { useState } from "react";
import Registration from "./components/registration/Registration";


export default function Home() {
  const [isLogIn, setIsLogIn] = useState(true);



  return(<>
    {isLogIn ? (<Login setIsLogIn={setIsLogIn} />) : (<Registration setIsLogIn={setIsLogIn} />)}
  </>);
}