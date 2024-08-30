"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src='/icons/hamburger.svg' width={30} height={30} alt='Menu' />
        </SheetTrigger>
        <SheetContent side='right' className='bg-white border-none w-80'>
          <SheetClose asChild>
            <Link
              href='/'
              className='flex items-center cursor-pointer gap-1 px-4'
            >
              <Image
                src='/icons/logo.svg'
                width={40}
                height={40}
                alt='Yekta Bank Logo'
                className='ml-1'
              />
              <h1 className='text-[25px] font-bold text-black-1'>بانک یکتا</h1>
            </Link>
          </SheetClose>

          <div className='mobilenav-sheet'>
            <SheetClose asChild>
              <nav className='flex flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.route}
                        className={cn("mobilenav-sheet_close", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-black-2 font-medium text-[16px]",
                            {
                              "!text-white": isActive,
                            }
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
