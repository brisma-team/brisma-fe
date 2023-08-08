import React from "react";
import Image from "next/image";
import { NotificationIndicator } from "@atlaskit/notification-indicator";
import {
  AtlassianNavigation,
  Notifications,
} from "@atlaskit/atlassian-navigation";
import { useRouter } from "next/router";

const NotificationsBadge = () => (
  <NotificationIndicator
    onCountUpdated={console.log}
    notificationLogProvider={Promise.resolve()}
  />
);

const CustomHome = () => (
  <div className="w-64 p-5">
    <Image
      src="/images/BRISMA-2.0.2.png"
      width={1000}
      height={0}
      alt="test"
    ></Image>
  </div>
);

const NavbarField = () => {
  const router = useRouter();
  const { pathname } = router;
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
                  ? "border-b-4 border-atlasian-blue-light"
                  : ""
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
                  : ""
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
                  : ""
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
                  : ""
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
        primaryItems={ar}
      />
    </div>
  );
};

export default NavbarField;
