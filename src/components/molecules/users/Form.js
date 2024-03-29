import {
  errorSwal,
  loadingSwal,
  confirmationSwal,
  successSwal,
  withTokenConfig,
} from "@/helpers";
import useUserSKAIDetail from "@/data/useUserSKAIDetail";
import useRole from "@/data/useRole";
import useUka from "@/data/useUka";

import {
  RoleSelect,
  UkaSelect,
  PekerjaSelect,
  BackButton,
  SaveButton,
} from "../commons";
import { setSelectedUser } from "@/slices/userSKAISlice";

import React, { useEffect } from "react";
import { Card, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const schema = yup.object().shape({
  pn: yup
    .object()
    .transform((value) => (value === "" ? undefined : value))
    .required("Silakan isi nomor PN user."),
  role_kode: yup.array().min(1, "Silakan pilih minimal 1 role."),
  uka_kode: yup
    .object()
    .transform((value) => (value === "" ? undefined : value))
    .required("Silakan pilih UKA."),
});

const FormUser = ({ type, pn }) => {
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.userSKAI.selectedUser);

  const { userSKAIDetail } = useUserSKAIDetail(pn);
  const { role } = useRole();
  const { uka } = useUka();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      pn: "",
      role_kode: [],
      uka_kode: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userSKAIDetail) {
      switch (type) {
        case "update":
          setValue("pn", {
            label: userSKAIDetail.data.pn,
            value: userSKAIDetail.data.pn,
          });

          dispatch(setSelectedUser(userSKAIDetail.data));
      }
    }
  }, [userSKAIDetail]);

  useEffect(() => {
    if (userSKAIDetail && role) {
      switch (type) {
        case "update": {
          const selectedRole = [];

          for (let x = 0; x < userSKAIDetail.data.role.length; x++) {
            for (let y = 0; y < role.data.length; y++) {
              if (userSKAIDetail.data.role[x].kode_role === role.data[y].kode) {
                selectedRole.push(role.data[y]);
              }
            }
          }
          const mappedSelectedRole = selectedRole.map((row) => {
            return {
              label: row.name,
              value: row.kode,
            };
          });

          setValue("role_kode", mappedSelectedRole);
        }
      }
    }
  }, [userSKAIDetail, role]);

  useEffect(() => {
    if (userSKAIDetail && uka) {
      switch (type) {
        case "update": {
          const selectedUka = uka.data.data.filter((row) => {
            return row.kode === userSKAIDetail.data.kode_uka;
          });

          setValue("uka_kode", {
            label: selectedUka[0].name,
            value: selectedUka[0].kode,
          });
        }
      }
    }
  }, [userSKAIDetail, uka]);

  async function onSubmit(data) {
    const confirm = await confirmationSwal(
      "Apakah anda yakin untuk membuat data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();

    const url = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/${type}`;
    const mappedData = {
      pn: data.pn.value,
      role_kode: data.role_kode.map((row) => {
        return row.value;
      }),
      uka_kode: data.uka_kode.value,
    };

    try {
      let request;

      switch (type) {
        case "create":
          request = axios.post(url, mappedData, withTokenConfig());
          break;
        default:
          request = axios.patch(url, mappedData, withTokenConfig());
      }

      const result = await request;

      loadingSwal("close");

      await successSwal(result.data.message);

      switch (type) {
        case "create":
          reset();
      }
    } catch (error) {
      loadingSwal("close");

      errorSwal(error);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex">
          <div className="w-1/6">
            <Label htmlFor="pn" value="PN" />
          </div>
          <div className="flex-1">
            <PekerjaSelect control={control} type={type} />
            <small className="text-red-500">{errors.pn?.message}</small>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/6">
            <Label value="Nama" />
          </div>
          <div className="flex-1 h-9">
            <Label value={selectedUser.name} />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/6">
            <Label value="Jabatan" />
          </div>
          <div className="flex-1 h-9">
            <Label value={selectedUser.jabatan} />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/6">
            <Label htmlFor="role_kode" value="Role Kode" />
          </div>
          <div className="flex-1">
            <RoleSelect control={control} />
            <small className="text-red-500">{errors.role_kode?.message}</small>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/6">
            <Label htmlFor="uka_kode" value="UKA Kode" />
          </div>
          <div className="flex-1">
            <UkaSelect control={control} />
            <small className="text-red-500">{errors.uka_kode?.message}</small>
          </div>
        </div>
        <div className="flex justify-end gap-x-4">
          <div className="w-1/8 bg-red-500 rounded text-zinc-100">
            <BackButton href="/users" />
          </div>
          <div className="w-1/8">
            <SaveButton />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default FormUser;
