import React, { useState } from "react";
import { Sidebar, Navbar, Dropdown, Avatar, Breadcrumb } from "flowbite-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
	ChartPieIcon,
	UserGroupIcon,
	BellIcon,
	Bars3Icon,
} from "@heroicons/react/24/outline";

const notifications = [
	{
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus eget orci ac aliquet. Cras laoreet tellus sit amet dui tristique efficitur. Nunc varius accumsan mi at molestie. Maecenas feugiat, odio pharetra aliquam sodales, dolor purus tincidunt dolor, eget euismod tortor libero vel mauris.",
	},
	{
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus eget orci ac aliquet. Cras laoreet tellus sit amet dui tristique efficitur. Nunc varius accumsan mi at molestie. Maecenas feugiat, odio pharetra aliquam sodales, dolor purus tincidunt dolor, eget euismod tortor libero vel mauris.",
	},
];

export default function Main({ children, breadcrumb }) {
	const router = useRouter();

	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

	async function handleLogoutClick() {
		deleteCookie("user");
		deleteCookie("token");

		router.push("/login");
	}

	function handleSidebarItemClick(e, href) {
		e.preventDefault();

		router.push(href);
	}

	function handleToggleSidebarClick() {
		const newState = !isSidebarCollapsed;

		setIsSidebarCollapsed(newState);
	}

	return (
		<div className="flex">
			<div className="min-h-screen border-r border-gray-200">
				<Sidebar
					collapseBehavior="collapse"
					collapsed={isSidebarCollapsed}>
					<Sidebar.Logo
						href="/dashboard"
						img="https://via.placeholder.com/28"
						imgAlt="Flowbite logo"
						onClick={(e) =>
							handleSidebarItemClick(e, "/dashboard")
						}>
						Admin
					</Sidebar.Logo>
					<Sidebar.Items>
						<Sidebar.ItemGroup>
							<Sidebar.Item
								href="/dashboard"
								icon={ChartPieIcon}
								onClick={(e) =>
									handleSidebarItemClick(e, "/dashboard")
								}>
								Dashboard
							</Sidebar.Item>
							<Sidebar.Item
								href="/users"
								icon={UserGroupIcon}
								onClick={(e) =>
									handleSidebarItemClick(e, "/users")
								}>
								Users
							</Sidebar.Item>
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</Sidebar>
			</div>
			<div className="flex-1 overflow-x-hidden">
				<Navbar fluid={true} border>
					<button onClick={() => handleToggleSidebarClick()}>
						<Bars3Icon className="w-6 h-6 text-gray-500" />
					</button>
					<div className="flex gap-x-4 items-center">
						<Dropdown
							arrowIcon={false}
							inline={true}
							label={
								<BellIcon className="w-6 h-6 text-gray-500" />
							}>
							{notifications.map((notif, i) => (
								<Dropdown.Item key={i}>
									<div className="w-96">
										<div>Pesan Baru</div>
										<hr className="my-4" />
										<div>{notif.message}</div>
									</div>
								</Dropdown.Item>
							))}
						</Dropdown>
						<Dropdown
							arrowIcon={false}
							inline={true}
							label={
								<Avatar
									alt="User settings"
									img="https://via.placeholder.com/150"
									rounded={true}
								/>
							}>
							<Dropdown.Header>
								<span className="block text-sm">John Doe</span>
								<span className="block truncate text-sm font-medium">
									john.doe@mail.com
								</span>
							</Dropdown.Header>
							<Dropdown.Item onClick={() => handleLogoutClick()}>
								Logout
							</Dropdown.Item>
						</Dropdown>
					</div>
				</Navbar>
				<div className="main">
					<div className="p-4">
						<Breadcrumb className="bg-gray-50 py-3 px-5 dark:bg-gray-900">
							{breadcrumb.map((br, i) => (
								<Breadcrumb.Item
									href={
										br.current === false
											? br.href
											: undefined
									}
									key={i}>
									{br.label}
								</Breadcrumb.Item>
							))}
						</Breadcrumb>
					</div>
					<div className="content p-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
