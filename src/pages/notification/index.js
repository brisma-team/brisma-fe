import {
  Breadcrumbs,
  ButtonIcon,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import { useNotification } from "@/data/common";
import { EmptySidebarLayout } from "@/layouts";
import { useEffect, useState } from "react";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate, fetchApi } from "@/helpers";
import { useRouter } from "next/router";
import { IconArrowRight } from "@/components/icons";
import _ from "lodash";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Notification", path: "/notification" },
];

const index = () => {
  const router = useRouter();
  const [totalData, setTotalData] = useState(1);

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  const { notification, notificationMutate } = useNotification("all", params);

  useEffect(() => {
    setTotalData(notification?.pagination?.totalData);
  }, [notification]);

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleClick = async (id, is_read, url_path) => {
    if (!is_read) {
      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/notifikasi?id=${id}`,
        {},
        true
      );
    }
    router.push(url_path);
    notificationMutate();
  };

  return (
    <EmptySidebarLayout>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex items-center mb-6">
        <PageTitle text={"Notification"} />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[10, 25, 50, 100]}
          withoutSortBy
        />
      </div>
      <div className="dataTables-custom bg-white mt-4">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="7%"
              className="border-t border-x cell-custom-dataTables flex justify-center rounded-ss-lg"
            >
              <p className="font-semibold text-brisma text-sm">Aksi</p>
            </Header>
            <Header
              width="8%"
              className="border-t border-x cell-custom-dataTables"
            >
              <p className="font-semibold text-brisma text-sm">Tanggal</p>
            </Header>
            <Header
              width="20%"
              className="border-t border-x cell-custom-dataTables"
            >
              <p className="font-semibold text-brisma text-sm">Jenis</p>
            </Header>
            <Header
              width="40%"
              className="border-t border-x cell-custom-dataTables"
            >
              <p className="font-semibold text-brisma text-sm">Perihal</p>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables rounded-se-lg"
            >
              <p className="font-semibold text-brisma text-sm">Dari</p>
            </Header>
          </Headers>
          {notification?.data?.length ? (
            <Rows
              items={notification?.data}
              render={({
                id,
                is_read,
                created_at,
                pengirim,
                jenis,
                perihal,
                url_path,
              }) => (
                <Row className="">
                  <Cell className="!hidden" />
                  <Cell
                    width="7%"
                    className={`border-x cell-custom-dataTables flex justify-center ${
                      !is_read ? "bg-blue-200" : ""
                    }`}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <ButtonIcon
                        handleClick={async () =>
                          await handleClick(id, is_read, url_path)
                        }
                        icon={
                          <div className="w-6 h-6 p-0.5 flex items-center justify-center rounded-full border border-atlasian-blue-light text-atlasian-blue-light">
                            <IconArrowRight size="medium" />
                          </div>
                        }
                      />
                    </div>
                  </Cell>
                  <Cell
                    width="8%"
                    className={`border-r cell-custom-dataTables ${
                      !is_read ? "bg-blue-200" : ""
                    }`}
                  >
                    {convertDate(created_at, "-", "d")}
                  </Cell>
                  <Cell
                    width="20%"
                    className={`border-r cell-custom-dataTables ${
                      !is_read ? "bg-blue-200" : ""
                    }`}
                  >
                    {jenis}
                  </Cell>
                  <Cell
                    width="40%"
                    className={`border-r cell-custom-dataTables ${
                      !is_read ? "bg-blue-200" : ""
                    }`}
                  >
                    {perihal}
                  </Cell>
                  <Cell
                    width="25%"
                    className={`border-r cell-custom-dataTables ${
                      !is_read ? "bg-blue-200" : ""
                    }`}
                  >
                    {`${pengirim?.pn} - ${pengirim?.nama}`}
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl py-4">
              <DataNotFound />
            </div>
          )}
        </TableTree>
      </div>
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={filter.page}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
        isDynamicPageTotal
      />
    </EmptySidebarLayout>
  );
};

export default index;
