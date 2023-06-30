import React from "react";
import { NotificationIndicator } from "@atlaskit/notification-indicator";
import {
  AtlassianNavigation,
  Notifications,
} from "@atlaskit/atlassian-navigation";

const NotificationsBadge = () => (
  <NotificationIndicator
    onCountUpdated={console.log}
    notificationLogProvider={Promise.resolve()}
  />
);

const NavbarField = () => (
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 11 }}>
    <AtlassianNavigation
      label="site"
      renderProductHome={() => null}
      renderNotifications={() => (
        <Notifications badge={NotificationsBadge} tooltip="Notifications" />
      )}
      primaryItems={[]}
    />
  </div>
);

export default NavbarField;
