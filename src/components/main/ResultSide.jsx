import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`scrollable-auto-tabpanel-${index}`}
         aria-labelledby={`scrollable-auto-tab-${index}`}
         {...other}>
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

function a11yProps(index) {
   return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
   };
}

const ResultSide = () => {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <div className='result_side'>
         <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'>
            <Tab label='All' {...a11yProps(0)} />
            <Tab label='In Progess' {...a11yProps(1)} />
            <Tab label='Cancelled' {...a11yProps(2)} />
         </Tabs>
         <TabPanel value={value} index={0}>
            Item One
         </TabPanel>
         <TabPanel value={value} index={1}>
            Item Two
         </TabPanel>
         <TabPanel value={value} index={2}>
            Item Three
         </TabPanel>
      </div>
   );
};

export default ResultSide;
