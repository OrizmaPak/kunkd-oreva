import React from "react";
import ContentLibraryHeader from "./ContentLibraryHeader";
import ContentLibraryBreadcrumb from "./ContentLibraryBreadcrumb";
import ContentLibraryBody from "./ContentLibraryBody";
import ContentLibraryModals from "./ContentLibraryModals";
import { useContentLibraryController } from "./hooks/useContentLibraryController";

const ContentLibrary: React.FC<{ state?: string }> = ({ state = "home" }) => {
  const controller = useContentLibraryController(state);

  return (
    <div className={controller.layoutClassName}>
      <ContentLibraryHeader {...controller.header} />
      <ContentLibraryBreadcrumb {...controller.breadcrumb} />
      <ContentLibraryBody controller={controller.body} />
      <ContentLibraryModals controller={controller.modals} />
    </div>
  );
};

export default ContentLibrary;
