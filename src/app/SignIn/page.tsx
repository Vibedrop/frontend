"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

function SignInPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const SignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      // Hämta användarprofilen direkt efter inloggning
      const profileRes = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });

      if (!profileRes.ok) {
        throw new Error("Failed to fetch profile");
      }

      const user = await profileRes.json();
      console.log("user from profile:", user);
      setAuth(true, user);
      router.push("/");

    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong.");
    }
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <header></header>
      <main className="flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center mt-[5rem] bg-zinc-900 p-5 justify-center max-h-[90%] w-[17rem] rounded-lg gap-5">
          <h1>Sign in to Vibedrop</h1>

          {error && <p className="text-red-500">{error}</p>}

          <form action="" className="flex flex-col gap-5">
            <label htmlFor="">
              Email:
              <input className="border-2 border-zinc-700 rounded-lg w-full" type="text" onChange={emailHandler} />
            </label>
            <label htmlFor="">
              Password:
              <input className="border-2 border-zinc-700 rounded-lg w-full" type="text" onChange={passwordHandler} />
            </label>
            <input className="rounded-full p-2 bg-zinc-800 hover:bg-zinc-700" type="submit" onClick={SignIn} />
            <p className="text-xs text-center">Dont have and account? <span className="hover:underline"><Link href="/SignUp">SIGN UP</Link></span></p>
          </form>
        </div>
      </main>
      <footer>
        <div className="flex flex-col items-center justify-center mt-9">
        <span className="font-bold bg-white text-center text-black p-3 rounded-lg w-[17rem] hover:bg-gray-300"><Link href="/">Go back</Link></span>
        </div>
      </footer>
    </>
  );
}

export default SignInPage;
