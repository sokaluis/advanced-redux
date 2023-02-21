import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../authApiSlice";
import { useAppDispatch } from "../../../app/stores";
import { setCredentials } from "../authSlice";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser('');
      setPwd('');
      navigate('/welcome');
    } catch (err: any) {
      const resErr: QueryReturnValue<unknown, FetchBaseQueryError, any> = err;
      const { error } = resErr;

      if (!error?.status) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (error.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }

      if (userRef.current) {
        userRef.current.focus();
      }
    }
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value);

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  return (
    <>
      {isLoading && (
        <h1>Loading...</h1>
      )}
      {!isLoading && (
        <section className="login">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

          <h1>Employee Login</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={user}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={pwd}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;