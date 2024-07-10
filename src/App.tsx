import { useState, useEffect } from "react";
import "./App.css";
import Indicator from "./Components/indicator";
import Grid from "@mui/material/Unstable_Grid2";
import Summary from "./Components/Summary";
import BasicTable from "./Components/BasicTable";
import WeatherChart from "./Components/WeatherChart";
import ControlPanel from "./Components/ControlPanel";

function App() {
  const [,] = useState(0);
  let [, setRowsTable] = useState<any>([])
  let [indicators, setIndicators] = useState<any>([]);
  useEffect(() => {
    (async () => {
      
      let API_KEY = "9692dcf4d213c6016d9acd187789a5c5";
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
      );
            let savedTextXML = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");
      let dataToIndicators = new Array();
      let locationinfo = xml.getElementsByTagName("location")[0];
      let nombre= locationinfo.getElementsByTagName("name")[0].childNodes[0].nodeValue;
      let pais=locationinfo.getElementsByTagName("country")[0].childNodes[0].nodeValue;
      let location = xml.getElementsByTagName("location")[1];
      dataToIndicators.push(["Pais","country",pais])
      dataToIndicators.push(["Nombre","Name",nombre]);
      let geobaseid = location.getAttribute("geobaseid");
      dataToIndicators.push(["Geobaseid", "Geobaseid", geobaseid]);
      let latitude = location.getAttribute("latitude");
      dataToIndicators.push(["Latitud", "latitude", latitude]);
      let longitude = location.getAttribute("longitude");
      dataToIndicators.push(["Longitud", "Longitude", longitude]);
      //console.log( dataToIndicators )
      let indicatorsElements = Array.from(dataToIndicators).map((element) => (
        <Indicator
          title={element[0]}
          subtitle={element[1]}
          value={element[2]}
        />
      ));
      setIndicators(indicatorsElements);
      let arrayObjects = Array.from( xml.getElementsByTagName("time") ).map( (timeElement) =>  {
					
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code") 
        return { "rangeHours": rangeHours,"windDirection": windDirection }

    })
    arrayObjects = arrayObjects.slice(0,8)
    setRowsTable(arrayObjects)  

    })();
  }, []);

  return (
    <Grid container spacing={5.5}>
      <Grid xs={6} sm={4} md={3} lg={2}>
      {indicators[0]}
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>
      {indicators[1]}
      </Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>
      {indicators[2]}
      </Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>
      {indicators[3]}
      </Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>
      {indicators[4]}
      </Grid>
      <Grid>
        <Summary></Summary>
      </Grid>
      <Grid xs={12} md={6} lg={9}>
        <BasicTable />
      </Grid>
      <Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid>
      <Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid>
    </Grid>
  );
}

export default App;
