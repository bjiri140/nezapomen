"use client";
import styles from "./login.module.css";
import GridBackground from "../gridpattern/GridPatern";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export default function Login({setIsLogIn}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function showError(message, labelId, inputId){
        const label = document.getElementById(labelId);
        const input = document.getElementById(inputId);

        if(label){
            label.textContent = message;
            label.style.color = "#FF3333";
        }

        if(input){
            input.style.border = "1px solid #FF3333";
        }
    }

    function resetError(labelId, inputId, defaultText){
        const label = document.getElementById(labelId);
        const input = document.getElementById(inputId);

        if(label){
            label.textContent = defaultText;
            label.style.color = "";
        }

        if(input){
            input.style.border = "";
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        resetError("usernameLabelId", "usernameInput", "Email");
        resetError("passwordLabelId", "passwordInput", "Password");

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
            }else{
                showError("heslo nebo email neni spravne","usernameLabelId", "usernameInput");
                showError("heslo nebo email neni spravne","passwordLabelId", "passwordInput");
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
                    <label id="usernameLabelId" htmlFor="usernameInput">Email</label>
                    <input
                        id="usernameInput" 
                        type="email" 
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label id="passwordLabelId" htmlFor="passwordInput">Password</label>
                    <div className={styles.passwordInput}>
                        <input
                            id="passwordInput" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className={styles.showPasswordButton}>
                            {showPassword ? <BiShow color="black" size={20}/> : <BiHide color="black" size={20}/>}
                        </button>
                    </div>
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