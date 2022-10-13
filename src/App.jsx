import {Container} from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useState} from "react";
import LabOne from "./components/LabOne";
import LabTwo from "./components/LabTwo";
import LabThree from "./components/LabThree";
import LabFour from "./components/LabFour";
import LabFive from "./components/LabFive";
import LabSix from "./components/LabSix";

const getTabs = ()=>{
    const tabs = [];
    for (let i = 0; i < 14; i+=2) {
        tabs.push(`Лаб. ${i+1} - ${i+2}`);
    }
    tabs.push(`Лаб. 15`);
    tabs.push(`Лаб. ${16} - ${17}`);
    return tabs;
}

function App() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <div className="App">
      <Container maxWidth={'xl'}>
          <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                      variant="scrollable"
                      scrollButtons="auto"
                      onChange={handleChange}
                      aria-label="lab API tabs example">
                      {getTabs().map((tab, index)=>
                          <Tab key={tab} label={tab} value={`${index+1}`} />
                      )}
                  </TabList>
              </Box>
              <TabPanel value={'1'}>
                  <LabOne/>
              </TabPanel>
              <TabPanel value={'2'}>
                  <LabTwo/>
              </TabPanel>
              <TabPanel value={'3'}>
                  <LabThree/>
              </TabPanel>
              <TabPanel value={'4'}>
                  <LabFour/>
              </TabPanel>
              <TabPanel value={'5'}>
                  <LabFive/>
              </TabPanel>
              <TabPanel value={'6'}>
                  <LabSix/>
              </TabPanel>
          </TabContext>
      </Container>
    </div>
  );
}

export default App;
