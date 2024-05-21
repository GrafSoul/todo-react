import { Tabs, Tab } from "react-bootstrap";
import DayTab from "../DayTab";

const DayTabs = () => {
  return (
    <Tabs defaultActiveKey="monday">
      <Tab eventKey="monday" title="Пн">
        <DayTab day="monday" />
      </Tab>
      <Tab eventKey="tuesday" title="Вт">
        <DayTab day="tuesday" />
      </Tab>
      <Tab eventKey="wednesday" title="Ср">
        <DayTab day="wednesday" />
      </Tab>
      <Tab eventKey="thursday" title="Чт">
        <DayTab day="thursday" />
      </Tab>
      <Tab eventKey="friday" title="Пт">
        <DayTab day="friday" />
      </Tab>
      <Tab eventKey="saturday" title="Суб">
        <DayTab day="saturday" />
      </Tab>
      <Tab eventKey="sunday" title="Вск">
        <DayTab day="sunday" />
      </Tab>
    </Tabs>
  );
};

export default DayTabs;
