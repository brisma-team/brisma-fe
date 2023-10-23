import useUser from "@/data/useUser";
import { Loader } from "@/components/atoms";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavbarField } from "@/components/molecules/commons";
import SidebarSuratEWP from "@/components/molecules/ewp/SidebarSuratEWP";

const SuratLayoutEWP = ({ children, menu }) => {
	const router = useRouter();

	const { user, userError } = useUser();

	const [isShown, setIsShown] = useState(false);
	useState(false);

	useEffect(() => {
		if (userError) {
			router.push("/login");

			return;
		}

		if (user) {
			setIsShown(true);
		}
	}, [user, userError]);

	if (!isShown) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<NavbarField />
			<SidebarSuratEWP menu={menu} />
			<div className="flex">
				<div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
					<div className="main">
						<div className="pl-5 py-4 w-[84rem]">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuratLayoutEWP;
