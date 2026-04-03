"use client";
import styles from "./login.module.css";
import GridBackground from "../gridpattern/GridPatern";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Login({setIsLogIn}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password})
            });

            if(res.ok){
                alert("prihlaseni povedeno");
                setIsLoading(false);
            }
        }catch(error){
            console.log(error.message + " error while loging in");
        }




    }

    return(<>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logoSection}>
                    <img src="/images/logo.svg" alt="nezapomen logo" />
                    <img src="/images/nezapomenText2.svg" alt="nezapomen text"/>
                </div>

                <div className={styles.welcomeText}>
                    <h1>Sign Into<br /> Your Account</h1>
                    <p>Enter your username and password</p>
                </div>

                <div className={styles.inputs}>
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        id="usernameInput" 
                        type="email" 
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="passwordInput">Password</label>
                    <input
                        id="passwordInput" 
                        type="password" 
                        placeholder="Your Password ffff"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.forgotPassWrapper}>
                    <p>Forgot Password?</p>
                </div>

                <div className={styles.btnWrapper}>
                    <button onClick={handleLogin} className={styles.logBtn}>{isLoading ? 
                        (<ClipLoader color="#FFFFFF" size={20}/>)
                        : (<p>Log In</p>)}</button>
                </div>

                <div className={styles.separator}>OR</div>

                <div className={styles.btnWrapper}>
                    <button onClick={() => setIsLogIn(false)} className={styles.signBtn}>Sign In</button>
                </div>
            </div>
            <GridBackground width={40} height={40} strokeDasharray="4 4" />
        </div>
    </>);
}