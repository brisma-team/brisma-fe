import Main from "@/layouts/Main";
import { FormUser } from "@/components/molecules/users";

import React from "react";

const breadcrumb = [
  {
    label: "Users",
    current: false,
    href: "/users",
  },
  {
    label: "Create",
    current: true,
  },
];

export default function create() {
  return (
    <Main breadcrumb={breadcrumb}>
      <h1 className="text-2xl font-bold mb-4">Create Users</h1>
      <FormUser type="create" />
    </Main>
  );
}
