import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setInputs(prev =>
            ({...prev, [e.target.name]: e.target.value})
        )
    }

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            await axios.post("/auth/login", inputs)
            navigate("/")
        }
        catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input type='text' placeholder='username' name="username" onChange={handleChange}/>
                <input type='password' placeholder='password' name="password" onChange={handleChange}/>
                <button className='authButton' onClick={handleSubmit}>Login</button>
                {/*If there is an error, show it here*/}
                {error && <p>{error}</p>}
                <span>
                    Don't have an account?
                    <Link to='/register'>Register</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;