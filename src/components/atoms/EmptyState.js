import React from "react";

// import Button from "@atlaskit/button/standard-button";

import EmptyState from "@atlaskit/empty-state";

const EmptyField = () => {
  return (
    <div className="leading-3">
      <EmptyState
        header="404 - File Not Found."
        // description="The requested file could not be found on the server. Please check the URL or contact the administrator for assistance."
        // primaryAction={
        //   <Button appearance="primary">Contact Administrator</Button>
        // }
        //   secondaryAction={<Button>View permissions</Button>}
        // headingLevel={4}
      />
    </div>
  );
};

export default EmptyField;
