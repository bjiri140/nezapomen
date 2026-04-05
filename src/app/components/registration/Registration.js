"use client";
import styles from "../login/login.module.css";
import GridBackground from "../gridpattern/GridPatern";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Registration({setIsLogIn}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfPassword, setComfPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const handleRegister = async (e) => {
        e.preventDefault();
        resetError("passwordLabelId", "passwordInput", "Password");
        resetError("password2LabelId", "passwordInput2", "Comfirm Password");
        resetError("usernameLabelId", "usernameInput", "Email");

        setIsLoading(true);

        if(password.length < 6){
            showError("Heslo musí být dlouhé alespoň 6 znaků.", "passwordLabelId", "passwordInput");
            setIsLoading(false);
            return;
        }

        if(password !== comfPassword){
            showError("Hesla se neshodují.", "passwordLabelId", "passwordInput");
            showError("Hesla se neshodují.", "password2LabelId", "passwordInput2")
            setIsLoading(false);
            return;
        }

        if(!regex.test(email)){
            showError("Email není validní", "usernameLabelId", "usernameInput");
            setIsLoading(false);
            return;
        }

        try{
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password, comfPassword})
            });

            if(response.ok){
                alert("registrace uspesna");
                setIsLoading(false);
            }
        }catch(error){
            console.error("internal server error status: 500");
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
                    <h1>Create<br />Your Account</h1>
                    <p>Enter your username and password</p>
                </div>

                <div className={styles.inputs}>
                    <label id="usernameLabelId" htmlFor="usernameInput">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="usernameInput" type="email" placeholder="Your Email"/>

                    <label id="passwordLabelId" htmlFor="passwordInput">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="passwordInput" type="password" placeholder="Your Password"/>

                    <label id="password2LabelId" htmlFor="passwordInput2">Comfirm Password</label>
                    <input onChange={(e) => setComfPassword(e.target.value)} id="passwordInput2" type="password" placeholder="Comfirm Your Password"/>
                </div>

                <div className={styles.btnWrapper}>
                    <button onClick={handleRegister} className={styles.logBtn}>{isLoading ? 
                        (<ClipLoader color="#FFFFFF" size={20}/>)
                        : (<p>Create Account</p>)}</button>
                </div>

                <div className={styles.separator}>OR</div>

                <div className={styles.btnWrapper}>
                    <button onClick={() => setIsLogIn(true)} className={styles.signBtn}>Log In</button>
                </div>
            </div>
            <GridBackground width={40} height={40} strokeDasharray="4 4" />
        </div>
    </>);
}