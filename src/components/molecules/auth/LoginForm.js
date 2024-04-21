import React, { useEffect, useState } from "react";
import {
  ButtonField,
  ButtonIcon,
  ErrorValidation,
  Loader,
} from "@/components/atoms";
import useUser from "@/data/useUser";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import { TextInput } from "@/components/atoms";
import { useRouter } from "next/router";
import { Section } from "@atlaskit/menu";
import { setCookie, hasCookie, getCookie, deleteCookie } from "cookies-next";
import Image from "next/image";
import {
  // ImageBrismaVertical,
  ImageAMSBRIVertical,
} from "@/helpers/imagesUrl";
import {
  Header,
  NavigationHeader,
  SideNavigation,
} from "@atlaskit/side-navigation";
import PasswordTextField from "@/components/atoms/PasswordTextField";
import { IconRefresh } from "@/components/icons";
import { generateCaptcha } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  setObjPayloadLogin,
  setValidationErrorsLogin,
  resetObjPayloadLogin,
  resetValidationErrorsLogin,
} from "@/slices/landing/landingPageSlice";
import { loginSchema } from "@/helpers/schemas";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, userMutate, userError } = useUser();

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [isShown, setIsShown] = useState(false);
  const [isCaptchaSuccess, setIsCaptchaSuccess] = useState(false);

  const payload = useSelector((state) => state.landingPage.objPayloadLogin);
  const validation = useSelector(
    (state) => state.landingPage.validationErrorsLogin
  );

  useEffect(() => {
    if (hasCookie("remember_me")) {
      dispatch(
        setObjPayloadLogin({
          ...payload,
          pn: getCookie("pn"),
          remember_me: getCookie("remember_me"),
        })
      );
    }
  }, []);

  useEffect(() => {
    setIsCaptchaSuccess(captcha === payload?.captcha);
  }, [captcha, payload?.captcha]);

  useEffect(() => {
    if (userError) {
      setIsShown(true);

      return;
    }

    if (user) {
      router.push("/dashboard");
    }
  }, [user, userError]);

  const handleSubmitLogin = async () => {
    const schemaMappings = {
      schema: loginSchema,
      resetErrors: resetValidationErrorsLogin,
      setErrors: setValidationErrorsLogin,
    };

    const userPayload = { ..._.pick(payload, ["pn", "password"]) };
    const validate = setErrorValidation(payload, dispatch, schemaMappings);
    if (validate) {
      loadingSwal();
      if (payload?.remember_me) {
        setCookie("pn", payload?.pn);
        setCookie("remember_me", payload?.remember_me);
      } else {
        deleteCookie("pn");
        deleteCookie("remember_me");
      }

      const response = await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_AUTH}/login`,
        { pn: userPayload?.pn, password: userPayload?.password },
        false,
        "Berhasil login!"
      );

      if (response?.statusCode === 200) {
        setCookie("token", response?.token);
      }

      dispatch(resetObjPayloadLogin());
      dispatch(resetValidationErrorsLogin());
      loadingSwal("close");
      userMutate();
    }
  };

  const handleClickRefreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayloadLogin({ ...payload, [property]: value }));
  };

  useEffect(() => {
    if (isCaptchaSuccess) {
      const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleSubmitLogin(e);
        }
      };

      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [handleSubmitLogin]);

  if (!isShown) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <SideNavigation label="Project navigation" testId="side-navigation">
      <NavigationHeader>
        <Header description="">
          <div className="flex-col mb-10">
            <div className="w-full justify-center flex">
              <div className="w-64">
                <Image src={ImageAMSBRIVertical} />
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-base text-brisma font-bold">Personal Number</p>
              <TextInput
                value={payload?.pn}
                onChange={(e) => handleChangePayload("pn", e.target.value)}
                placeholder={"Masukkan PN"}
              />
              {validation?.pn ? (
                <ErrorValidation
                  message={validation?.pn}
                  className={"ml-1 mt-2 mb-2"}
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base text-brisma font-bold">Password</p>
              <PasswordTextField
                value={payload?.password}
                handleChange={(e) =>
                  handleChangePayload("password", e.target.value)
                }
                placeholder={"Masukkan Password"}
              />
              {validation?.password ? (
                <ErrorValidation
                  message={validation?.password}
                  className={"ml-1 mt-2 mb-2"}
                />
              ) : (
                ""
              )}
            </div>
            {/* <div className="flex items-center gap-2">
              <CustomCheckbox value={userLogin?.remember_me} />
              <p className="text-base text-brisma font-bold">Remember me</p>
            </div> */}
            <div className="flex gap-2 items-center mt-2">
              <div className="captcha-wrapper">
                <p className="text-3xl absolute text-white italic pointer-events-none">
                  {captcha}
                </p>
              </div>
              <TextInput
                value={payload?.captcha}
                onChange={(e) => handleChangePayload("captcha", e.target.value)}
                placeholder={"Enter Captcha"}
              />
              <ButtonIcon
                icon={<IconRefresh size="large" />}
                handleClick={handleClickRefreshCaptcha}
              />
            </div>
            <div className="mt-2">
              <div
                className={`w-full rounded ${
                  !isCaptchaSuccess
                    ? `text-gray-400 bg-atlasian-gray-light`
                    : `text-white bg-atlasian-blue-light`
                }`}
              >
                <ButtonField
                  text="Masuk"
                  handler={handleSubmitLogin}
                  disabled={!isCaptchaSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SideNavigation>
  );
};

export default LoginForm;
