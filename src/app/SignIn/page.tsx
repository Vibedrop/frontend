"use client";
import Header from "@/components/Header";
import Link from "next/link";

function SignInPage() {
    return (
        <>
            <Header />

            <main className="flex flex-col">
                <h1>Login</h1>
                <label htmlFor="">Email<input type="text" /></label>
                <label htmlFor="">Password<input type="text" /></label>
            </main>

            <footer>
                <Link href="/SignUp">Sign Up</Link>
            </footer>
        </>
    )
}

export default SignInPage;