"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-3 items-center'>
        <Link href='/' className='flex items-center cursor-pointer gap-2'>
          <Image
            src='/icons/logo.svg'
            width={40}
            height={40}
            alt='Yekta Bank Logo'
          />
          <h1 className='text-[25px] font-bold text-black-1'>بانک یکتا</h1>
        </Link>
      </header>
      <div className='flex flex-col'>
        <h1 className='text-24 font-semibold text-gray-900'>
          {user ? "وارد پنل شوید" : type === "sign-in" ? "ورود" : "ثبت نام"}
          <p className='text-16 font-normal text-gray-600 mt-2'>
            {user
              ? "برای شروع وارد پنل شوید"
              : "لطفا مشخصات خود را وارد نمایید."}
          </p>
        </h1>
      </div>

      {user ? (
        <div className='flex flex-col gap-4'></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === "sign-up" && (
                <>
                  <div className='flex items-center justify-between gap-4'>
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label='نام'
                      placeholder='نام'
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label='نام خانوادگی'
                      placeholder='نام خانوادگی'
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name='address'
                    label='آدرس'
                    placeholder='آدرس خود را وارد نمایید'
                  />
                  <div className='flex items-center justify-between gap-4'>
                    <CustomInput
                      control={form.control}
                      name='city'
                      label='شهر'
                      placeholder='مانند: تهران'
                    />
                    <CustomInput
                      control={form.control}
                      name='postalCode'
                      label='کد پستی'
                      placeholder='کد پستی محل سکونت'
                    />
                  </div>
                  <div className='flex items-center justify-between gap-4'>
                    <CustomInput
                      control={form.control}
                      name='dob'
                      label='تاریخ تولد'
                      placeholder='مانند: 1345/12/29'
                    />
                    <CustomInput
                      control={form.control}
                      name='ssn'
                      label='کد ملی'
                      placeholder='کد ملی'
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name='email'
                label='ایمیل'
                placeholder='ایمیل خود را وارد نمایید'
              />
              <CustomInput
                control={form.control}
                name='password'
                label='پسورد'
                placeholder='پسورد خود را وارد نمایید'
              />

              <Button
                type='submit'
                className='form-btn w-full'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className='animate-spin' />
                  </>
                ) : type === "sign-in" ? (
                  "ورود"
                ) : (
                  "ثبت نام"
                )}
              </Button>
            </form>
          </Form>
          <footer className='flex justify-center gap-1 items-center'>
            <p className='text-14 font-normal text-gray-600'>
              {type === "sign-in"
                ? "حساب کاربری ندارید؟"
                : "حساب کاربری دارید؟"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className='form-link'
            >
              {type === "sign-in" ? "ثبت نام کنید." : "وارد شوید."}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
