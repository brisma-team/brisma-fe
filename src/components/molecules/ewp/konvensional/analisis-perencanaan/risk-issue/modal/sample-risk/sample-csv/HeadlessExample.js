import { css, jsx } from "@emotion/react";

import { token } from "@atlaskit/tokens";

import DynamicTable from "@atlaskit/dynamic-table";

const HeadlessExample = ({ head, rows }) => (
  <div>
    <div className="w-[65rem] overflow-x-scroll">
      <DynamicTable head={head} rows={rows.slice(0, 10)} />
    </div>
  </div>
);

export default HeadlessExample;
