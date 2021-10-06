import { FC } from "react";
import {
  Tab,
  TabContent,
  TabContentWrapper,
  TabLine,
  TabsHeadersWrapper,
  TabsWrapper,
  TabTitle,
} from "./styles";

interface Props {
  activeTabKey: string;
  onChange: (tabKey: string) => void;
  tabs: Array<{
    title: string;
    Content: FC;
  }>;
}

interface Item {
  title: string;
  Content: FC;
}

export const Tabs = ({ tabs, activeTabKey, onChange }: Props) => {
  const activeItem = tabs.find((item) => item.title === activeTabKey)!;

  return (
    <TabsWrapper>
      <TabsHeadersWrapper>
        {tabs.map((item) => (
          <TabItem
            active={item.title === activeTabKey}
            item={item}
            key={item.title}
            onClick={onChange}
          />
        ))}
      </TabsHeadersWrapper>
      <TabContentWrapper>
        <TabContent>
          <activeItem.Content />
        </TabContent>
      </TabContentWrapper>
    </TabsWrapper>
  );
};

interface TabItemProps {
  item: Item;
  active: boolean;
  onClick: (key: string) => void;
}

const TabItem = ({ item, active, onClick }: TabItemProps) => {
  return (
    <Tab onClick={() => onClick(item.title)}>
      <TabTitle active={active}>{item.title}</TabTitle>
      <TabLine active={active} />
    </Tab>
  );
};
