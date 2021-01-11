import React from 'react';

const Login = (props) => {

    const {email, setEmail, password, setPassword, handleLogin, emailError, passwordError, hasAccount} = props;


    return (
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMessage">{emailError}</p>
                <label>Password</label>
                <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMessage">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>
                                Login
                            </button>
                        </>
                    ) : (
                        <button>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;