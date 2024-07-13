import { useState, useEffect } from "react";
import "./App.css";
import Indicator from "./Components/indicator";
import Grid from "@mui/material/Unstable_Grid2";
import Summary from "./Components/Summary";
import BasicTable from "./Components/BasicTable";
import WeatherChart from "./Components/WeatherChart";
import ControlPanel from "./Components/ControlPanel";
import Encabezado from "./Components/Encabezado";
import Seccion from "./Components/Seccion";

function App() {
  let [rowsTable, setRowsTable] = useState<any>([])
  let [indicators, setIndicators] = useState<any>([]);
  let [selectedVariable, setSelectedVariable] = useState<number>(-1);
  let [infoGraphic, setInfoGraphic] = useState<any[]>([]);
  


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
        let precipitation = timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
          let humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value");
          let clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all");
       
        return { rangeHours, windDirection, precipitation, humidity, clouds }

    })
    setRowsTable(arrayObjects) 
    let arrayObjectsG = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
      let hour = timeElement.getAttribute("from")?.split("T")[1].substring(0, 5);
      let precipitation = timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
      let humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value");
      let clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all");
      return { hour, precipitation, humidity, clouds };
    });
    setInfoGraphic(arrayObjectsG);

    })();
  }, []);

  return (
    <Grid container spacing={5} columns={10}>
      <Grid xs={6} sm={4} md={3} lg={12}>
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={12}>
    <Seccion  main="#33E3FF" hover="#33E3FF" texto="Hola"></Seccion>
      </Grid>
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
      <Grid xs={6} sm={4} md={3} lg={12}>
    
      </Grid>

      <Grid xs={12} lg={2}>
      <ControlPanel onChange={setSelectedVariable} />
      </Grid>
      <Grid xs={12} lg={8}>
      <WeatherChart selectedVariable={selectedVariable} graficos={infoGraphic} />
        
      </Grid>
      <Grid>
        <Summary></Summary>
      </Grid>
      <Grid xs={12} md={6} lg={9}>
      <BasicTable rows={rowsTable} />
      </Grid>
     
      
    </Grid>
  );
}

export default App;
