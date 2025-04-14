"use client";
import Link from "next/link";
import { useState } from "react";

function SignUpPage() {
  const SignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response", data);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <header></header>
      <main className="flex flex-col items-center">
        <h1>SignUp</h1>
        <form action="" className="flex flex-col  border-2 border-black p-5">
          <label htmlFor="">
            Email:
            <input className="border-2 border-gray-400" type="text" onChange={emailHandler} />
          </label>
          <label htmlFor="">
            Password:
            <input className="border-2 border-gray-400" type="text" onChange={passwordHandler} />
          </label>
          <input className="border-2 border-black m-auto" type="submit" onClick={SignUp} />
        </form>
      </main>
      <footer>
        <Link href="/">Go back</Link>
      </footer>
    </>
  );
}

export default SignUpPage;
