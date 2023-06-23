import Link from "next/link";

// Format for Breadcrums using object inside array
// example = [
//     { name: "Menu", path: "/dashboard" },
//     { name: "PAT", path: "/pat/projects" },
//     { name: "Overview", path: "/pat/projects/123" },
//   ];

const Breadcrumbs = ({ data }) => {
  return (
    data.length && (
      <div className="justify-start mb-6 flex text-atlasian-gray-dark">
        {data.map((v, i) => {
          return (
            <div className="text-sm mx-0 flex" key={i}>
              {i >= 1 && <div className="mx-1">/</div>}
              <Link className="no-underline hover:no-underline" href={v.path}>
                {v.name}
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Breadcrumbs;
