import React from "react";
import { Content, PageLayout, Main } from "@atlaskit/page-layout";

const BlankLayout = ({ children }) => {
  return (
    <PageLayout>
      <Content testId="content">
        <Main id="main-content" skipLinkTitle="Main Content">
          {children}
        </Main>
      </Content>
    </PageLayout>
  );
};

export default BlankLayout;
