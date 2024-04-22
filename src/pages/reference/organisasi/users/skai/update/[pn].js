import { MainLayout } from "@/layouts";
import { FormUser } from "@/components/molecules/users";

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
    <MainLayout breadcrumb={breadcrumb}>
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <FormUser type="update" pn={pn} />
    </MainLayout>
  );
}
