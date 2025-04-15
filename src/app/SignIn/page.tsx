"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SignInPage() {
  const router = useRouter();

  const SignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "Post",
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
        router.push("/");
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <header></header>
      <main className="flex flex-col items-center">
        <h1>Login</h1>
        <form action="" className="flex flex-col  border-2 border-black p-5">
          <label htmlFor="">
            Email:
            <input className="border-2 border-gray-400" type="text" onChange={emailHandler} />
          </label>
          <label htmlFor="">
            Password:
            <input className="border-2 border-gray-400" type="text" onChange={passwordHandler} />
          </label>
          <input className="border-2 border-black m-auto" type="submit" onClick={SignIn} />
        </form>
      </main>
      <footer>
        <Link href="/SignUp">Sign Up</Link>
        <Link href="/">Go back</Link>
      </footer>
    </>
  );
}

export default SignInPage;
