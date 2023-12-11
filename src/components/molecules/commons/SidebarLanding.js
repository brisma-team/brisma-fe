import React from "react";
import { LoginForm } from "../auth";
import { LeftSidebar } from "@atlaskit/page-layout";
// import { Card } from "@/components/atoms";
// import Image from "next/image";

const SidebarLanding = () => {
  return (
    <>
      <LeftSidebar
        isFixed={true}
        width={450}
        id="project-navigation"
        skipLinkTitle="Project Navigation"
        testId="left-sidebar"
      >
        <LoginForm />
      </LeftSidebar>
      {/* <div className="flex">
        <div className="flex-1 overflow-x-hidden ml-5 pt-14 h-screen overflow-y-scroll">
          <div className="p-4"></div>
          <div className="main">
            <div className="content p-4">
              <div className="mt-5">
                <div className="flex gap-6">
                  <div>
                    <div className="mb-5">
                      <Card>
                        <div className="max-w-xs h-full px-5 py-3">
                          <h5 className="text-xl font-semibold text-brisma mb-3">
                            Sapa Dari Tim Audit
                          </h5>
                          <Image
                            className="rounded-lg"
                            src={
                              "https://i.pinimg.com/564x/b2/61/d4/b261d4e690bc7434f4c2b2bba52aab10.jpg"
                            }
                            width={322}
                            height={257}
                            alt="chat"
                          />
                          <p className="text-center mb-3">
                            “Program BRISMA 2.0.2 adalah sebuah komitmen untuk
                            meningkatkan kualitas kerja audit secara menyeluruh”
                          </p>
                          <p className="text-center font-bold">
                            Muhammad Firly Ismail <br></br>Kepala Divisi Audit
                            Intern 2023
                          </p>
                        </div>
                      </Card>
                    </div>
                    <div className="">
                      <Card>
                        <div className="max-w-xs h-full px-5 py-3">
                          <h5 className="text-xl font-semibold text-brisma mb-3">
                            Informasi
                          </h5>
                          <p className="text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam tincidunt mi et mi interdum, vitae
                            fringilla erat vehicula. Curabitur blandit egestas
                            interdum. Maecenas id vestibulum ex, vel varius
                            mauris. In neque lacus, pharetra sed bibendum sit
                            amet, sagittis at odio. <br />
                            <br />
                            Aenean mattis turpis rhoncus, malesuada massa eget,
                            ultricies turpis. <br />
                            <br />
                            Aenean mattis turpis rhoncus.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <Card>
                        <div className="max-w-xs h-full px-5 py-3">
                          <Image
                            className="rounded-lg"
                            src={
                              "https://i.pinimg.com/564x/24/13/d1/2413d199ef41196284c9eec33b90a2a0.jpg"
                            }
                            width={322}
                            height={257}
                            alt="chat"
                          />
                          <h5 className="text-lg font-semibold text-brisma">
                            Semarak Hadiah BriLink
                          </h5>
                          <p>20 Agustus 2023 - 20 September 2023</p>
                        </div>
                      </Card>
                    </div>
                    <div>
                      <Card>
                        <div className="max-w-xs h-full px-5 py-3">
                          <Image
                            className="rounded-lg"
                            src={
                              "https://i.pinimg.com/564x/b2/61/d4/b261d4e690bc7434f4c2b2bba52aab10.jpg"
                            }
                            width={322}
                            height={200}
                            alt="chat"
                          />
                          <h5 className="text-lg font-semibold text-brisma">
                            Semarak Hadiah BriLink
                          </h5>
                          <p>20 Agustus 2023 - 20 September 2023</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <Card>
                        <div className="max-w-xs h-full px-5 py-3">
                          <Image
                            className="rounded-lg"
                            src={
                              "https://i.pinimg.com/564x/b2/61/d4/b261d4e690bc7434f4c2b2bba52aab10.jpg"
                            }
                            width={322}
                            height={257}
                            alt="chat"
                          />
                          <h5 className="text-lg font-semibold text-brisma">
                            Semarak Hadiah BriLink
                          </h5>
                          <p>20 Agustus 2023 - 20 September 2023</p>
                        </div>
                      </Card>
                    </div>
                    <div>
                      <Card>
                        <div className="max-w-xs h-full px-5 py-3">
                          <Image
                            className="rounded-lg"
                            src={
                              "https://i.pinimg.com/564x/24/13/d1/2413d199ef41196284c9eec33b90a2a0.jpg"
                            }
                            width={322}
                            height={200}
                            alt="chat"
                          />
                          <h5 className="text-lg font-semibold text-brisma">
                            Semarak Hadiah BriLink
                          </h5>
                          <p>20 Agustus 2023 - 20 September 2023</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SidebarLanding;
