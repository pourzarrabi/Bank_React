import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "حمیدرضا", lastName: "سروش" };

  return (
    <main className='flex h-screen w-full'>
      <Sidebar user={loggedIn} />
      <div className='flex flex-col size-full'>
        <div className='root-layout'>
          <Image src='/icons/logo.svg' width={40} height={40} alt='Logo' />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
