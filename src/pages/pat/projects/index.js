import React from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import { IconPlus, IconClose, IconEdit, IconSuccess } from "@/components/icons";
import Select from "@atlaskit/select";

import { Breadcrumbs, Card } from "@/components";
import Textfield from "@atlaskit/textfield";
import ProgressBar from "@atlaskit/progress-bar";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
];

// Start Card Body
const CardBody = ({ title, value, icon }) => {
  return (
    <div className="flex flex-row my-2">
      <div className="w-2/4 flex flex-row">
        <div className="text-atlasian-blue-light">{icon}</div>
        <div className="text-xs font-medium ml-1">{title}</div>
      </div>
      <div className="text-xs w-2/4 justify-end flex font-medium text-atlasian-blue-light">
        {value}
      </div>
    </div>
  );
};
// End Card Body

// Start Content Card
const ContentCard = ({
  title,
  year,
  progress,
  percent,
  documentStatus,
  apporovalStatus,
  addendum,
}) => {
  return (
    <div className="m-2">
      <Card>
        <div className="w-full px-4 pb-2">
          <div className="flex flex-row justify-between">
            <div className="text-base font-bold text-atlasian-blue-dark">
              {title}
            </div>
            <div className="text-atlasian-yellow">
              <IconEdit size="medium" />
            </div>
          </div>
          <div className="text-sm font-bold">{year}</div>
          <div className="flex flex-row justify-betwee leading-3 mt-2 items-center">
            {/* <div style={{ width: "88vw" }}> */}
            <ProgressBar appearance="success" value={progress} />
            {/* </div> */}
            <div className="flex justify-end font-medium text-sm ml-3">
              {percent}
            </div>
          </div>
          <div className="leading-3">
            <CardBody
              title={"Document Status"}
              value={documentStatus}
              icon={<IconSuccess size="small" />}
            />
            <CardBody
              title={"Approval Status"}
              value={apporovalStatus}
              icon={<IconSuccess size="small" />}
            />
            <CardBody
              title={"Addendum"}
              value={addendum}
              icon={<IconSuccess size="small" />}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
// End Content Card

const index = () => {
  const data = [
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
    {
      title: "PAT AIW PANGKAL PINANG",
      year: "2022",
      progress: 0.3,
      percent: "30%",
      documentStatus: "FINAL",
      apporovalStatus: "Checker Pusat",
      addendum: "0",
    },
  ];
  return (
    <PatOverviewLayout>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <div className="text-3xl font-bold">Project Overview</div>
        </div>
      </div>
      {/* Start Filter */}
      <div className="my-3 w-40">
        <Button appearance="primary" iconBefore={IconPlus} shouldFitContainer>
          Tampilkan Filter
        </Button>
      </div>
      <div className="flex justify-between">
        <Card>
          <div className="flex m-2 w-96">
            <div className="w-1/2">
              <Textfield
                placeholder="ID Proyek"
                className="mr-3"
                elemAfterInput={
                  <button className="justify-center">
                    <IconClose size="large" />
                  </button>
                }
              />
            </div>
            <div className="w-1/2">
              <Select options={[]} placeholder="Status Document" />
            </div>
          </div>
          <div className="flex m-2 w-96">
            <div className="w-1/2">
              <Textfield
                placeholder="Nama Proyek"
                className="mr-3"
                elemAfterInput={
                  <button className="justify-center">
                    <IconClose size="large" />
                  </button>
                }
              />
            </div>
            <div className="w-1/2">
              <Select options={[]} placeholder="Status Persetujuan" />
            </div>
          </div>
        </Card>
        {/* </div> */}
        <div className="w-full flex justify-end items-end p-2">
          <div className="flex items-center">
            <div className="text-sm">URUTKAN</div>
            <Select className="ml-2" options={[]} placeholder="Choose a city" />
          </div>
        </div>
      </div>
      {/* End Filter */}
      {/* Start Content */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-4 -mx-2">
        {data?.length &&
          data.map((v, i) => {
            return (
              <ContentCard
                key={i}
                title={v.title}
                year={v.year}
                progress={v.progress}
                percent={v.percent}
                documentStatus={v.documentStatus}
                apporovalStatus={v.apporovalStatus}
                addendum={v.addendum}
              />
            );
          })}
      </div>
      {/* End Content */}
    </PatOverviewLayout>
  );
};

export default index;
