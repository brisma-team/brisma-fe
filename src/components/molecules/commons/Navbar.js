import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NotificationIndicator } from "@atlaskit/notification-indicator";
import {
  AtlassianNavigation,
  Notifications,
  Profile,
  SignIn,
} from "@atlaskit/atlassian-navigation";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { confirmationSwal, loadingSwal, successSwal } from "@/helpers";
import Avatar from "@atlaskit/avatar";
import useUser from "@/data/useUser";
import DropdownMenu, { DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { RoleLabel } from "@/components/atoms";

const NotificationsBadge = () => (
  <NotificationIndicator
    onCountUpdated={console.log}
    notificationLogProvider={Promise.resolve()}
  />
);

const DefaultProfile = ({ user }) => (
  <DropdownMenu
    trigger={({ triggerRef, ...props }) => (
      <Profile
        icon={
          <Avatar
            size="small"
            src={
              "https://api-private.atlassian.com/users/d533a32ca5379ef2482c4f6a780e3b20/avatar"
            }
          />
        }
        ref={triggerRef}
        {...props}
      />
    )}
  >
    <DropdownItemGroup>
      <div className="px-3">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold  text-base">{user?.fullName}</div>
          <div className="text-base mb-1.5">{user?.pn}</div>
          <RoleLabel text={user?.jabatan} />
          <div className="mb-2" />
        </div>
      </div>
    </DropdownItemGroup>
  </DropdownMenu>
);

const CustomHome = () => (
  <div className="w-64 p-5">
    <Link href="/dashboard">
      <Image
        src="/images/BRISMA-2.0.2.png"
        width={1000}
        height={0}
        alt="test"
      ></Image>
    </Link>
  </div>
);

const NavbarField = () => {
  const router = useRouter();
  const { pathname } = router;

  const { user } = useUser();

  const handleLogout = async () => {
    const confirm = await confirmationSwal("Apakah Anda yakin untuk keluar?");

    if (!confirm.value) {
      return;
    }

    loadingSwal();

    deleteCookie("pn");
    deleteCookie("token");
    successSwal("Logout Berhasil");
    return router.push("/login");
  };
  const firstSegment = pathname.split("/")[1];
  const ar =
    pathname != "/pat" &&
    pathname != "/ewp" &&
    pathname != "/rpm" &&
    pathname != "/dashboard" &&
    firstSegment != "catalogue" &&
    firstSegment != "reference"
      ? [
          <a href="/dashboard" key={1}>
            <button
              className={`font-semibold text-xl text-atlasian-dark px-2 p-3 ${
                firstSegment == "dashboard"
                  ? "border-b-4 border-atlasian-blue-light "
                  : "hover:border-b-4 hover:border-atlasian-blue-light"
              }`}
            >
              Dashboard
            </button>
          </a>,
          <a href="/pat" key={2}>
            <button
              className={`font-semibold text-xl text-atlasian-dark px-2 p-3 ${
                firstSegment == "pat"
                  ? "border-b-4 border-atlasian-blue-light"
                  : "hover:border-b-4 hover:border-atlasian-blue-light"
              }`}
            >
              P.A.T
            </button>
          </a>,
          <a href="/ewp" key={3}>
            <button
              className={`font-semibold text-xl text-atlasian-dark px-2 p-3 ${
                firstSegment == "ewp"
                  ? "border-b-4 border-atlasian-blue-light"
                  : "hover:border-b-4 hover:border-atlasian-blue-light"
              }`}
            >
              E.W.P
            </button>
          </a>,
          <a href="/rpm" key={4}>
            <button
              className={`font-semibold text-xl text-atlasian-dark px-2 p-3 ${
                firstSegment == "rpm"
                  ? "border-b-4 border-atlasian-blue-light"
                  : "hover:border-b-4 hover:border-atlasian-blue-light"
              }`}
            >
              R.P.M
            </button>
          </a>,
        ]
      : [];
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 11 }}>
      <AtlassianNavigation
        label="site"
        renderProductHome={CustomHome}
        renderNotifications={() => (
          <Notifications badge={NotificationsBadge} tooltip="Notifications" />
        )}
        renderProfile={() => <DefaultProfile user={user?.data} />}
        renderSignIn={() => <SignIn onClick={handleLogout} />}
        primaryItems={ar}
      />
    </div>
  );
};

export default NavbarField;
