"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { checkAuth } from "../../services/auth";
import { AuthContext } from "./Auth/AuthProvider";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2),
});

export default function LoginForm() {
  const { signIn, user }: any = useContext(AuthContext);
  const router = useRouter();
  const isAuth = checkAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [router, isAuth]);

  async function onSubmit(data: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Login Details!!");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-fulle2 rounded-md space-y-4 w-[500px] px-5 text-black"
      >
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-[100px] h-[100pxs] rounded-t-md">
            <img src={"/img/smsre.png"} />
          </div>
        </div>

        <div className="flex flex-col px-2 pb-6 space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-white"
                    placeholder="username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    className="text-white"
                    type="password"
                    {...field}
                    autoComplete="on"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-black bg-white hover:bg-sidebar"
          >
            Submit
          </Button>
        </div>
      </form>
      <Toaster position="top-right" richColors />
    </Form>
  );
}
