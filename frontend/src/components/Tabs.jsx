import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@material-ui/styles";

export default function DisabledTabs({value, handleChange}) {


  const useStyles = makeStyles(() => ({
    customStyleOnTab: {
      fontSize: "16px",
      color: "#bac3d5",
      width: "100px"
    },
    activeTab: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#fe2352",
      width: "100px"
    },
  }));

  const classes = useStyles();


  return (
    <Tabs classes={{ indicator: classes.customStyleOnTab }} TabIndicatorProps={{style: {background:'#fe2352'}}} value={value} onChange={handleChange} aria-label="disabled tabs example">
      <Tab label={
                <span
                  className={value === 0 ? classes.activeTab : classes.customStyleOnTab}
                >
                  {" "}
                  로그인
                </span>
              } />
      <Tab  label={
                <span
                  className={value === 1 ? classes.activeTab : classes.customStyleOnTab}
                >
                  {" "}
                  회원가입
                </span>
              }/>
    </Tabs>
  );
}