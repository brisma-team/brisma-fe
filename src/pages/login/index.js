import React, { useEffect } from "react";
import { Card, TextInput, Button, Checkbox, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { setCookie, hasCookie, getCookie, deleteCookie } from "cookies-next";

const schema = yup.object().shape({
	pn: yup
		.number()
		.transform((val) => (isNaN(val) ? undefined : val))
		.required("Silakan isi nomor PN Anda."),
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
			pn: "",
			password: "",
			remember_me: false,
		},
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (hasCookie("remember_me")) {
			setValue("pn", getCookie("pn"));
			setValue("remember_me", getCookie("remember_me"));
		}
	}, []);

	async function onSubmit(data) {
		console.log(data);

		try {
			if (data.remember_me) {
				setCookie("pn", data.pn);
				setCookie("remember_me", data.remember_me);
			} else {
				deleteCookie("pn");
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
			<div className="w-2/3 mx-auto">
				<Card>
					<h1 className="text-center text-2xl">Login</h1>
					<form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="pn" value="PN" />
							</div>
							<TextInput
								id="pn"
								type="number"
								{...register("pn")}
							/>
							<small className="text-red-500">
								{errors.pn?.message}
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
