import Main from "@/layouts/Main";
import { FormUser } from "@/components";

import React from "react";
import { useRouter } from "next/router";

const breadcrumb = [
  {
    label: "Users",
    current: false,
    href: "/users",
  },
  {
    label: "Update",
    current: true,
  },
];

export default function update() {
  const router = useRouter();
  const { pn } = router.query;

  return (
    <Main breadcrumb={breadcrumb}>
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <FormUser type="update" pn={pn} />
    </Main>
  );
}
