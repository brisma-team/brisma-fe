import React, { useEffect } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Swal from "sweetalert2";

const schema = yup.object().shape({
	fullname: yup.string().required("Silakan isi nama lengkap user."),
	pn: yup
		.number()
		.transform((val) => (isNaN(val) ? undefined : val))
		.required("Silakan isi nomor PN user."),
	email: yup
		.string()
		.email("Silakan isi dengan email yang valid.")
		.required("Silakan isi email user."),
	phone: yup
		.number()
		.transform((val) => (isNaN(val) ? undefined : val))
		.required("Silakan isi nomor telepon user."),
});

export default function Form({ type }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setFocus,
		setValue,
	} = useForm({
		defaultValues: {
			fullname: "",
			pn: "",
			email: "",
			phone: "",
		},
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		switch (type) {
			case "update":
				setValue("fullname", "asdasd");
				setValue("pn", "123123");
				setValue("email", "asdasd@mail.com");
				setValue("phone", "123123");
		}
	}, []);

	async function onSubmit(data) {
		console.log(data);

		const confirm = await Swal.fire({
			title: "Perhatian!",
			text: "Apakah anda yakin untuk membuat data ini?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
		});

		if (confirm.value) {
			await Swal.fire({
				title: "Sukses!",
				text: "Data berhasil dibuat.",
				icon: "success",
			});

			switch (type) {
				case "create":
					reset();
			}

			setTimeout(() => {
				setFocus("fullname");
			}, 500);
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex items-center">
					<div className="w-1/6">
						<Label htmlFor="fullname" value="Full Name" />
					</div>
					<div className="flex-1">
						<TextInput
							id="fullname"
							type="text"
							{...register("fullname")}
						/>
						<small className="text-red-500">
							{errors.fullname?.message}
						</small>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-1/6">
						<Label htmlFor="pn" value="PN" />
					</div>
					<div className="flex-1">
						<TextInput id="pn" type="number" {...register("pn")} />
						<small className="text-red-500">
							{errors.pn?.message}
						</small>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-1/6">
						<Label htmlFor="email" value="Email" />
					</div>
					<div className="flex-1">
						<TextInput
							id="email"
							type="text"
							{...register("email")}
						/>
						<small className="text-red-500">
							{errors.email?.message}
						</small>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-1/6">
						<Label htmlFor="phone" value="Phone" />
					</div>
					<div className="flex-1">
						<TextInput
							id="phone"
							type="number"
							{...register("phone")}
						/>
						<small className="text-red-500">
							{errors.phone?.message}
						</small>
					</div>
				</div>
				<div className="flex justify-end gap-x-4">
					<div className="w-1/6">
						<Link href="/users">
							<Button color="gray">
								<ArrowUturnLeftIcon className="w-6 h-6" />
								<span className="ml-2">Back</span>
							</Button>
						</Link>
					</div>
					<div className="w-1/6">
						<Button type="submit">
							<CheckIcon className="w-6 h-6" />
							<span className="ml-2">Save</span>
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
}
