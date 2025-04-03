"use client";
import Link from "next/link";

function SignInPage() {
    return (
        <>
        <header>

        </header>
        <main className="flex flex-col">
            <h1>Login</h1>
            <label htmlFor="">EMAAAIL2<input type="text" /></label>
            <label htmlFor="">Password<input type="text" /></label>
        </main>
        <footer>
            <Link href="/SignUp">Sign Up</Link>
            <Link href="/">Go back</Link>
        </footer>
        </>
    )
}

export default SignInPage;