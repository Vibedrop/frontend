"use client";
import { BACKEND_URL } from "@/utilities/config"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Callout, IconButton, TextField, Theme } from "@radix-ui/themes";
import { Eye, EyeOff, Info, Music } from "lucide-react";
import Link from "next/link";

function SignUpPage() {
  const router = useRouter();

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const SignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setErrors({});

    try {
      const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Unauthorized");
        setErrors(errorData.errors || {});
        return;
      }

      const data = await response.json();
      console.log("response", data);
      router.push("/SignIn");

    } catch (err: any) {
      // console.error(error);
      setError(err.message || "Something went wrong.");
    }
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <header></header>
      <main className="flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center mt-[5rem] bg-zinc-900 p-5 justify-center w-[17rem] rounded-lg gap-5">
          <h1>Join Vibedrop</h1>

          {error && (
            <Callout.Root className="justify-center p-3 gap-2">
              <Callout.Icon>
                <Info size={14} />
              </Callout.Icon>
              <Callout.Text>
                {error}
              </Callout.Text>
            </Callout.Root>
          )}

          <Theme accentColor="gray" className="w-full">
            <form className="flex flex-col gap-5 w-full">
              <label>
                Email:
                <TextField.Root
                  className="rounded-lg"
                  type="email"
                  color={errors.email ? "red" : "gray"}
                  variant={errors.email ? "soft" : "surface"}
                  onChange={emailHandler}
                  autoFocus
                />
              </label>
              <label>
                Password:
                <TextField.Root
                  className="rounded-lg"
                  type={showPassword ? "text" : "password"}
                  color={errors.password ? "red" : "gray"}
                  variant={errors.password ? "soft" : "surface"}
                  onChange={passwordHandler}
                >
                  <TextField.Slot data-side="right">
                    <IconButton
                      className="bg-transparent text-inherit size-4 cursor-pointer"
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
              </label>
              <label htmlFor="">
                Username:
                <TextField.Root
                  className="rounded-lg"
                  type="text"
                  color={errors.email ? "red" : "gray"}
                  variant={errors.email ? "soft" : "surface"}
                  onChange={usernameHandler}
                />
              </label>
              <input className="rounded-full p-2 bg-zinc-800 hover:bg-zinc-700" type="submit" value="Sign Up"  onClick={SignUp} />
              <p className="text-xs text-center">Already have an account? <span className="hover:underline"><Link href="/SignIn">SIGN IN</Link></span></p>
            </form>
          </Theme>
        </div>
      </main>

      <footer>
        <div className="flex flex-col items-center justify-center mt-9">
          <Link className="flex gap-3 justify-center font-bold bg-white text-black p-3 rounded-lg w-[17rem] hover:bg-gray-300" href="/">
            <Music className="ml-[-0.5rem]"/>
            App preview
          </Link>
        </div>
      </footer>
    </>
  );
}

export default SignUpPage;
