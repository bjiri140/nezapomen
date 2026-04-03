"use client";
import styles from "../login/login.module.css";
import GridBackground from "../gridpattern/GridPatern";


export default function Registration({setIsLogIn}){
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
                    <label htmlFor="usernameInput">Username</label>
                    <input id="usernameInput" type="text" placeholder="Your Username"/>

                    <label htmlFor="passwordInput">Password</label>
                    <input id="passwordInput" type="password" placeholder="Your Password"/>

                    <label htmlFor="passwordInput2">Comfirm Password</label>
                    <input id="passwordInput2" type="password" placeholder="Comfirm Your Password"/>
                </div>

                <div className={styles.btnWrapper}>
                    <button className={styles.logBtn}>Create Account</button>
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