import React, { useEffect, useState } from "react";
import { Loader } from "@/components/atoms";
import useUser from "@/data/useUser";
import { errorSwal, loadingSwal } from "@/helpers";
import { TextInput, Button, Checkbox, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/helpers/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Section } from "@atlaskit/menu";
import { setCookie, hasCookie, getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import Image from "next/image";
import { ImageBrismaVertical } from "@/helpers/imagesUrl";
import {
  Header,
  NavigationHeader,
  SideNavigation,
} from "@atlaskit/side-navigation";

const LoginForm = () => {
  const router = useRouter();

  const { user, userMutate, userError } = useUser();

  const [isShown, setIsShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      pn: "",
      password: "",
      remember_me: false,
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (hasCookie("remember_me")) {
      setValue("pn", getCookie("pn"));
      setValue("remember_me", getCookie("remember_me"));
    }
  }, []);

  useEffect(() => {
    if (userError) {
      setIsShown(true);

      return;
    }

    if (user) {
      router.push("/dashboard");
    }
  }, [user, userError]);

  async function onSubmit(data) {
    loadingSwal();

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL_AUTH}/login`;
      const result = await axios.post(url, data);

      if (data.remember_me) {
        setCookie("pn", data.pn);
        setCookie("remember_me", data.remember_me);
      } else {
        deleteCookie("pn");
        deleteCookie("remember_me");
      }

      setCookie("token", result.data.token);

      loadingSwal("close");

      userMutate();
    } catch (error) {
      loadingSwal("close");

      errorSwal(error);
    }
  }

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  console.log("env", process.env);

  return (
    <SideNavigation label="Project navigation" testId="side-navigation">
      <NavigationHeader>
        <Header description="">
          <div className="flex-col mb-10">
            <div className="w-full justify-center flex">
              <div className="w-64">
                <Image src={ImageBrismaVertical} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-normal">
                Versi 2.0.2 {`( ${process.env.NEXT_PUBLIC_VERSION} )`}
              </p>
            </div>
          </div>
        </Header>
      </NavigationHeader>
      <Section>
        <div className="w-2/3 mx-auto">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="pn" value="Personal Number" />
              </div>
              <TextInput id="pn" type="number" {...register("pn")} />
              <small className="text-red-500">{errors.pn?.message}</small>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                {...register("password")}
              />
              <small className="text-red-500">{errors.password?.message}</small>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember_me" {...register("remember_me")} />
              <Label htmlFor="remember_me">Remember me</Label>
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </Section>
    </SideNavigation>
  );
};

export default LoginForm;
