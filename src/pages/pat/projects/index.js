import Main from "@/layouts/Main";
import PatLayout from "@/layouts/PatLayout";
import useUserSKAI from "@/data/useUserSKAI";
import CustomDataTable from "@/components/CustomDataTable";
import UkaSelect from "@/components/UkaSelect";
import RoleSelect from "@/components/RoleSelect";
import DeleteButton from "@/components/DeleteButton";
import UpdateButton from "@/components/UpdateButton";
import CreateButton from "@/components/CreateButton";
import SearchButton from "@/components/SearchButton";
import { setSearchParam, setSearchParamObject } from "@/slices/userSKAISlice";

import React from "react";
import { Button, Card, TextInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
    console.log('PROJECT')
	return (
		<PatLayout>
			<div className="flex justify-between items-center mb-8">
				<div className="flex-1">
					<h2>Perancangan Audit Tahunan</h2>
				</div>
			</div>
            <div className="rounded overflow-hidden border border-black w-2/4">
                <div className="bg-gray-200 p-5 "><h3 className="text-blue-800">P.A.T</h3></div>
                <div className="px-8 py-4">
                    <div className="rounded mt-4 mb-8 bg-gray-200 p-5 border border-black">
                        <h3>AUDITOR</h3>
                        <div className="mt-3 mb -3">Penyusunan perencanaan tahunan kegiatan audit.</div>
                    </div>
                    <div className="rounded mt-8 mb-4 bg-gray-200 p-5 border border-black">
                        <h3>APPROVAL</h3>
                        <div className="mt-3 mb-3">Pelacakan <i>flow approval project</i> PAT.</div>
                    </div>
                </div>
            </div>
		</PatLayout>
	);
}