import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AtlassianNavigation,
  Profile,
  SignIn,
} from "@atlaskit/atlassian-navigation";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import {
  calculateTimeDifference,
  confirmationSwal,
  loadingSwal,
  successSwal,
  useUpdateData,
} from "@/helpers";
import Avatar from "@atlaskit/avatar";
import useUser from "@/data/useUser";
import DropdownMenu, { DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { ButtonIcon, DivButton, RoleLabel } from "@/components/atoms";
import { useNotification } from "@/data/common";
import { IconNotification } from "@/components/icons";

const Notification = ({ data, handleMarkReadAll, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      trigger={({ triggerRef, isSelected, testId, ...props }) => (
        <div
          className={`h-8 w-8 rounded-full hover:bg-blue-200 ${
            isOpen && `bg-blue-200`
          } flex items-center justify-center`}
          {...props}
          ref={triggerRef}
        >
          <ButtonIcon
            className={"pt-1"}
            icon={<IconNotification label="more" size="medium" />}
          />
        </div>
      )}
      onOpenChange={(e) => setIsOpen(e.isOpen)}
    >
      <DropdownItemGroup>
        <div className="w-[27rem]">
          {data?.length ? (
            <>
              <DropdownItemGroup>
                <div className="px-3 h-full w-full flex justify-end">
                  <DivButton
                    className={`w-fit hover:underline hover:text-atlasian-blue-light text-atlasian-blue-light`}
                    handleClick={handleMarkReadAll}
                  >
                    Mark all as Read
                  </DivButton>
                </div>
              </DropdownItemGroup>
              <DropdownItemGroup hasSeparator>
                <div className="flex flex-col">
                  {data?.map((v, i) => {
                    return (
                      <DivButton
                        key={i}
                        className={`h-10 px-3 w-full flex justify-between items-center ${
                          !v.is_read && `bg-blue-200`
                        }`}
                        handleClick={() =>
                          handleClick(v.id, v.is_read, v.url_path)
                        }
                      >
                        <div className="h-6 font-medium">{v.perihal}</div>
                        <div className="h-6 font-medium">
                          {calculateTimeDifference(v.created_at)}
                        </div>
                      </DivButton>
                    );
                  })}
                </div>
              </DropdownItemGroup>
            </>
          ) : (
            ""
          )}
          <DropdownItemGroup hasSeparator={Boolean(data?.length)}>
            <Link
              href={"/notification"}
              className="w-full flex justify-center text-center"
            >
              See All Notifications
            </Link>
          </DropdownItemGroup>
        </div>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

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

  const [listMenu, setListMenu] = useState([]);
  const { notification, notificationMutate } = useNotification("all", {
    page: 1,
    limit: 10,
  });

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

  const handleMarkReadAll = async () => {
    await useUpdateData(
      `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/notifikasi/all`,
      {},
      true
    );
    notificationMutate();
  };

  const handleClickNotification = async (id, is_read, url_path) => {
    if (!is_read) {
      await useUpdateData(
        `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/notifikasi?id=${id}`,
        {},
        true
      );
    }
    router.push(url_path);
    notificationMutate();
  };

  const roleKodeSuperAdmin = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  useEffect(() => {
    if (user?.data) {
      const userRole = user?.data?.role_kode;
      const updatedListMenu = [
        {
          path: "/dashboard",
          name: "Dashboard",
          is_hide: false,
        },
        {
          path: "/pat",
          name: "P.A.T",
          is_hide: !userRole.some((role) => roleKodeSuperAdmin.includes(role)),
        },
        {
          path: "/ewp",
          name: "E.W.P",
          is_hide: !userRole.some(
            (role) =>
              roleKodeSuperAdmin.includes(role) ||
              role === "10" ||
              role === "11"
          ),
        },
        {
          path: "/rpm",
          name: "R.P.M",
          is_hide: !userRole.some(
            (role) => roleKodeSuperAdmin.includes(role) || role === "12"
          ),
        },
        {
          path: "/survey",
          name: "Survey",
          is_hide: !userRole.some(
            (role) => roleKodeSuperAdmin.includes(role) || role === "13"
          ),
        },
      ];
      const filterMapping = updatedListMenu.filter((v) => !v?.is_hide);
      setListMenu(filterMapping);
    } else {
      setListMenu([]);
    }
  }, [user]);

  const firstSegment = pathname.split("/")[1];
  const ar =
    pathname != "/pat" &&
    pathname != "/ewp" &&
    pathname != "/rpm" &&
    pathname != "/survey" &&
    pathname != "/dashboard" &&
    firstSegment != "catalogue" &&
    firstSegment != "reporting" &&
    firstSegment != "reference"
      ? [
          listMenu?.length
            ? listMenu?.map((v, i) => {
                return (
                  <a href={v?.path} key={i}>
                    <button
                      className={`font-semibold text-xl text-atlasian-dark px-2 p-3 ${
                        firstSegment == v?.path?.replace("/", "")
                          ? "border-b-4 border-atlasian-blue-light "
                          : "hover:border-b-4 hover:border-atlasian-blue-light"
                      }`}
                    >
                      {v?.name}
                    </button>
                  </a>
                );
              })
            : [],
        ]
      : [];
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <AtlassianNavigation
        label="site"
        renderProductHome={CustomHome}
        renderNotifications={() => (
          <Notification
            data={notification?.data}
            handleMarkReadAll={handleMarkReadAll}
            handleClick={handleClickNotification}
          />
        )}
        renderProfile={() => <DefaultProfile user={user?.data} />}
        renderSignIn={() => <SignIn onClick={handleLogout} />}
        primaryItems={ar}
      />
    </div>
  );
};

export default NavbarField;
