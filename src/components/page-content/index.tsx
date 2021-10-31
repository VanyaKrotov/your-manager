import { FC, ReactNode } from "react";
import { Content, FlexboxGrid } from "rsuite";

interface PageContentProps {
  navigation?: ReactNode;
  children: ReactNode;
}

const PageContent: FC<PageContentProps> = ({ navigation, children }) => (
  <Content>
    {navigation ? (
      <FlexboxGrid className="full-height">
        <FlexboxGrid.Item className="full-height b-right" colspan={4}>
          {navigation}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20} className="full-height">{children}</FlexboxGrid.Item>
      </FlexboxGrid>
    ) : (
      children
    )}
  </Content>
);

export default PageContent;
