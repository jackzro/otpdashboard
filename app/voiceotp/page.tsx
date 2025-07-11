"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkAuth } from "../../services/auth";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { toast, Toaster } from "sonner";
import { Input } from "@nextui-org/input";
import { sendVoiceOtp, usePostVoiceOtp } from "@/services/sent";
import { AuthContext } from "../_component/Auth/AuthProvider";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";

const formSchema = z.object({
  otp: z.string().min(2).max(6),
  phoneNumber: z.string(),
});

export default function VoiceOtp() {
  const { user }: any = useContext(AuthContext);
  const isAuth = checkAuth();
  const router = useRouter();
  const { mutate: postVoiceOtp } = usePostVoiceOtp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      const body = {
        otp: data.otp,
        phoneNumber: data.phoneNumber,
        id: user.id,
      };
      postVoiceOtp(body, {
        onSuccess(data) {
          if (data.status === true) {
            toast.success("success");
          } else if (data.status === false) {
            toast.error(data.balance);
          }
          console.log(data);
        },
        onError(err) {},
      });
    } catch (error) {
      console.log("erororo", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-5 space-y-4 text-black rounded-md bg-fulle2"
      >
        {/* <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-[100px] h-[100pxs] rounded-t-md">
            <img src={"/img/smsre.png"} />
          </div>
        </div> */}

        <div className="flex flex-col w-full px-2 pb-6 space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">OTP</FormLabel>
                <FormControl>
                  <Input
                    className="text-white"
                    placeholder="otp number"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Phone Number</FormLabel>
                <FormControl>
                  {/* <Input
                    placeholder="phone Number"
                    className="text-white"
                    type="tel"
                    {...field}
                    autoComplete="on"
                  /> */}
                  <PhoneInput
                    country="ID"
                    placeholder="Enter phone number"
                    className="h-10 px-6 text-white"
                    {...field}
                    //   value={value}
                    //   onChange={setValue}
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
