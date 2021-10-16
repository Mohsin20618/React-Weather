
import { useState, useEffect, useRef } from "react"
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Card,Container,Navbar,Nav } from 'react-bootstrap';


function App() {
  const [weather, setweather] = useState(null)

  // const [cityName, setCityName] = useState("karachi")
  const cityName = useRef(null);

  const [location, setLocation] = useState(null)

  const [submit, setSubmit] = useState(false)

  useEffect(() => {

    let City = "";

    if (cityName.current.value) {
      City = `q=${cityName.current.value}`
    } else if (location) {
      
      if (!location) {

      } else if (location === "fail") {
        City = "q=new york";
      } else if (location && location.latitude) {
        City = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    console.log("City: ", City)
    if (City) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${City}&appid=e1c32dd0eb29cd3b266f3b06ff7c70b4&units=metric`)
        .then(res => {
          const newWeather = res.data;
          console.log("newWeather: ", newWeather);

          setweather(newWeather);
        });
    }

  }, [submit, location]);


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          // console.log("position got: ", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);

  return (
    <div id="dd">


<Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Wheather</Navbar.Brand>
    <Nav className="me-auto">
    
    </Nav>
    </Container>
  </Navbar>
<Card className="text-center" id="card" >
  <Card.Header><h4>City wheather</h4></Card.Header>
  <Card.Body>
   
    <Card.Text>
    <span id='cc'>City Name</span>
    <input ref={cityName} />   <Button variant="secondary" onClick={() => {

console.log("City: ", cityName.current.value)

setSubmit(!submit)

}} >Submit</Button>
    </Card.Text>
   
  </Card.Body>
  <Card.Footer className="text-muted"> 
 {
        (weather !== null) ?
          <>
            {weather.name} Weather
            <h1>{weather?.main?.temp}</h1>
            <h2>{weather?.weather[0].description}</h2>
            <h2>Country: {weather?.sys?.country}</h2>
            <h2>Wind Speed: {weather?.wind.speed}</h2>
            <h2>Humidity: {weather?.main?.humidity}</h2>
          </>
          :
          <h1>
            Loading.....</h1>
      }
       </Card.Footer>
</Card>



    </div>
  );
}
export default App;
