"use client";
import Link from "next/link";

function SignUpPage() {
    return (
        <>
        <header>

        </header>
        <main className="flex flex-col">
            <h1>Login</h1>
            <label htmlFor="">Email<input type="text" /></label>
            <label htmlFor="">Username<input type="text" /></label>
            <label htmlFor="">Password<input type="text" /></label>
        </main>
        <footer>
            <Link href="/">Go back</Link>
        </footer>
        </>
    )
}

export default SignUpPage;