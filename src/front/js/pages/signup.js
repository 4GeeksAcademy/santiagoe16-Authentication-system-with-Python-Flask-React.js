import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => { 
        e.preventDefault();
    
        const raw = {
            email: email,
            password: password
        };
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(raw)
        };
    
        fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(navigate("/login"))
        .catch((error) => console.error('Fetch error:', error));
    };

	return (
		<div className="d-flex justify-content-center align-items-center h-75 ">
			<div className= " p-5 rounded-3 shadow">
                <form onSubmit = {handleSubmit}>
                    <h2 className="text-center mb-3">Sign up</h2>
                    <div className="mb-4">
                        <label htmlFor = "email">Email</label>
                        <input type = "email" className="form-control" id = "email" value={email} onChange ={(e)=>setEmail(e.target.value)} placeholder="Enter email"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor = "password">Password</label>
                        <input type = "password" className="form-control" id= "password" value={password} onChange ={(e)=>setPassword(e.target.value)} placeholder="Enter password"></input>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100">Sign up</button>
                    </div>
                    <p>already have an account? <Link to="/login">log in</Link></p>
                </form>
            </div>
		</div>
	);
};
