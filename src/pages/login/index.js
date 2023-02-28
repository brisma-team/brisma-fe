import React, { useEffect } from "react";
import { Card, TextInput, Button, Checkbox, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { setCookie, hasCookie, getCookie, deleteCookie } from "cookies-next";

const schema = yup.object().shape({
	username: yup.string().required("Silakan isi username Anda."),
	password: yup.string().required("Silakan isi password Anda."),
});

export default function index() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
			remember_me: false,
		},
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (hasCookie("remember_me")) {
			setValue("username", getCookie("username"));
			setValue("remember_me", getCookie("remember_me"));
		}
	}, []);

	async function onSubmit(data) {
		console.log(data);

		try {
			if (data.remember_me) {
				setCookie("username", data.username);
				setCookie("remember_me", data.remember_me);
			} else {
				deleteCookie("username");
				deleteCookie("remember_me");
			}

			setCookie("user", "asdasdasd");
			setCookie("token", "asdasdasd");

			router.push("/dashboard");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="h-screen flex items-center">
			<div className="w-1/3 mx-auto">
				<Card>
					<h1 className="text-center text-2xl">Login</h1>
					<form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="username" value="Username" />
							</div>
							<TextInput
								id="username"
								type="text"
								{...register("username")}
							/>
							<small className="text-red-500">
								{errors.username?.message}
							</small>
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
							<small className="text-red-500">
								{errors.password?.message}
							</small>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="remember_me"
								{...register("remember_me")}
							/>
							<Label htmlFor="remember_me">Remember me</Label>
						</div>
						<Button type="submit">Login</Button>
					</form>
				</Card>
			</div>
		</div>
	);
}
