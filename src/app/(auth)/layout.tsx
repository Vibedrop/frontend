import { Flex } from "@radix-ui/themes";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-lg py-lg">
      <Flex className="w-full flex-col mx-auto max-w-sm md:pt-[6vw] sm:pb-16 justify-center gap-xl">
        <img src="/vibedrop-logo.svg" alt="VibeDrop logo" className="h-[76px] sm:h-[100px]"/>

        {children}
      </Flex>
    </div>
  );
}

export default AuthLayout;