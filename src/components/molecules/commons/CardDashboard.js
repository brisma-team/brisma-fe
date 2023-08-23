import Link from "next/link";
import React from "react";

const CardDashboard = ({ data }) => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <h2 className="text-brisma font-bold">
            {data?.title ? data.title : "Menu Title"}
          </h2>
        </div>
      </div>
      <div
        className={`grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4`}
      >
        {data?.content.map((items, itemsKey) => {
          return (
            <div
              className="rounded-[10px] overflow-hidden border border-[#00000033] shadow"
              key={itemsKey}
            >
              <div className="bg-gray-100 p-5">
                <h3 className="text-brisma font-semibold">
                  {items.subtitle ? items.subtitle : "No Header"}
                </h3>
              </div>
              <div className="px-5">
                {items.subcontent.map((item, key) => {
                  return (
                    item && (
                      <Link
                        target={`${item.isBlank ? "_blank" : ""}`}
                        href={item.url ? item.url : "#"}
                        key={key}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <div className="rounded-[10px] border border-[#00000033] my-4 shadow bg-gray-50 hover:bg-gray-200 text-atlasian-gray-light p-5">
                          <h3>{item.title ? item.title : "Content Title"}</h3>
                          <div className="mt-3 mb-3">
                            {item.description
                              ? item.description
                              : "Content Description"}
                          </div>
                        </div>
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDashboard;
