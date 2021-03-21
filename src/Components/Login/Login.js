import React, { useContext, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import {} from './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
!firebase.apps.length?
firebase.initializeApp(firebaseConfig):
firebase.app()

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  //const [password, setPassword] = useState('')
  //const [confirmPassword, setConfirmPassword] = useState('')
        const [user, setUser] = useState({
            isSignedIn : false,
            name: '',
            email: '',
            password : '',
            photo : '',
            error: '', 
            success : false
        })
        
        const handleBlur = (e) => {
            let isFieldValid = true;
            if (e.target.name === "email") {
                isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
                // console.log(isFieldValid);
            }
            if (e.target.name === 'name') {
                isFieldValid = e.target.value;
            }
            if(e.target.name === "password"){
                isFieldValid = e.target.value.length > 5;
                // console.log(isFieldValid);
               //setPassword(e.target.value)
            }
            if (e.target.name === 'confirmPassword') {
                if (user.password !== e.target.value) {
                    isFieldValid = false;
                }

            }

            if (isFieldValid) {
                const newUserInfo = {...user}
                newUserInfo[e.target.name] = e.target.value;
                newUserInfo.error = "";
                setUser(newUserInfo);
                // console.log(newUserInfo);
            }
            else{
                const newUserInfo = {...user};
                newUserInfo.error = "Confirm Password is not match"
                setUser(newUserInfo)
            }
        }
        const handleSubmitForm = (e) => {
            if (newUser && user.email && user.password) {
                // console.log('submitted');
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((res) => {
                    // Signed in 
                    const newUserInfo = {...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    // setLoggedInUser(newUser);
                    history.push(from);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    console.log(errorCode, errorMessage);
                });
            }
            if (!newUser && user.email && user.password) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((res) => {
                    // Signed in
                    var user = res.user;
                    const newUserInfo = {...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log('Sign in User Info', res.user);
                    setLoggedInUser(newUserInfo);
                    history.push(from);
                    
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

            }
            e.preventDefault()
        }
        
        const updateUserName = name => {
            const user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: name
            }).then(function() {
            // Update successful.
            console.log('Username Updated Successfully');
            }).catch(function(error) {
            // An error happened.
            console.log(error);
            });
        }
        const handleGoogleSignIn = () => {
            const googleProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleProvider).then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var {displayName, email, photoURL} = result.user;
                const signedInUser = {name: displayName, email, photoURL}
                console.log(signedInUser);
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.push(from);
                // ...
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                // ...
                setLoggedInUser(errorMessage);
                console.log(errorCode, errorMessage, email, credential);
            });
        }


    return (
        <div className="loginpagebg text-center">
        
            <div className="logintitle">
                <h2>Create an account</h2>
            </div>
            <div className="loginpageinner">
                <div className="text_fill">
                    <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="newUser"/>
                    <label for="newUser" htmlFor="newUser">New User Sign Up</label>
                    <form className="login-form text-center" onSubmit={handleSubmitForm} action="">
                    {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Name"/>}
                    <br/>
                    <input onBlur={handleBlur} type="email" name="email" placeholder="Email"/>
                    <br/>
                    <input onBlur={handleBlur} type="password" name="password" placeholder="Password" required/>
                    <br/>
                    {newUser && <input onBlur={handleBlur} type="password" name="confirmPassword" placeholder="Confirm Password" required/>}
                    <br/>
                    <input type="submit"  value={newUser ? 'Create Account' : 'Log in'}/>
                    </form>
                    <p style={{color: "red"}}>{user.error}</p>
                    {
                        user.success && <p style={{color: "green"}}>User {newUser ? "Created" : "Logged In"} Successfully</p>
                    }
                </div>
                
                
                    
                    <Button onClick={handleGoogleSignIn} variant="outline-primary">Sign in With Google</Button>
                    <br/>
                    
                    
                
            </div>
        
        </div>
    );
};

export default Login;