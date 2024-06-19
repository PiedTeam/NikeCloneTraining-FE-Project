import React, { ReactNode, FC } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
interface TabListProps {
  onRoleSelect: (role: string) => void;
}
const TabList: FC<TabListProps> = ({ onRoleSelect }) => {
  const [selected, setSelected] = React.useState("photos");
  const handleSelectionChange = (key: React.Key) => {
    setSelected(key.toString());
    onRoleSelect(key.toString());
  };
  return (
    <div className="py-4">
      <Tabs
        aria-label="Options"
        onSelectionChange={(key: React.Key) => handleSelectionChange(key)}
      >
        <Tab key="" title="All"></Tab>
        <Tab key="Designer" title="Employee"></Tab>
        <Tab key="CEO" title="Ceo"></Tab>
      </Tabs>
    </div>
  );
};
export default TabList;
