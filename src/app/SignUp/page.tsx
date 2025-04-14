"use client";
import Header from "@/components/Header";
import Link from "next/link";

function SignUpPage() {
    return (
        <>
            <Header />

            <main className="flex flex-col">
                <h1>Sign up</h1>
                <label htmlFor="">Email<input type="text" /></label>
                <label htmlFor="">Username<input type="text" /></label>
                <label htmlFor="">Password<input type="text" /></label>
            </main>

            <footer>
                <Link href="/SignIn">Log in</Link>
            </footer>
        </>
    )
}

export default SignUpPage;