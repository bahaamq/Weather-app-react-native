import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
//ActivityIndicator loader on each change 
import { StyleSheet, Text, View,Image,ActivityIndicator  } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import WeatherInfo from './components/WeatherInfo'
import Pickeritem from './components/Pickeritem'
import Relod from './components/Relod'
import Details from './components/Details'

import { colors } from './utilis/index'


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const[currentWeather,setWeather]=useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  const[reloadpage,setrelod]=useState('')
  useEffect(() => {
    (  async () => {
      //in order to go to else each time we update the state of unitsSystem from f to c or the opposite
      setWeather(null)
      setErrorMsg(null)
      console.log(reloadpage)
      setrelod(null)
console.log("hehe")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return; //stop 
      }

      let location = await Location.
      getCurrentPositionAsync({});
      setLocation(location);
console.log(`lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=${unitsSystem}&appid=f6d36efb201309d7350146b032ed5b40`)
      console.log(response.data,"hello")


      if(response)
      {

        setWeather(response.data)
      }
      else{
        setErrorMsg('someting went wrong');
      }

//location.coords.latitude
//location.coords.longitude
//f6d36efb201309d7350146b032ed5b40

    })();
  }, [unitsSystem,reloadpage]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if(currentWeather)
  {
    return (
      
      <View style={styles.container}>
< Relod setrelod ={setrelod} />
                <StatusBar style="auto" />

      <View style={styles.main}>
        
      <Pickeritem unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}  />



        <WeatherInfo currentWeather={currentWeather}/>
    

      </View>
      <Details  currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>

    )
  }


  else if(errorMsg)
  {
    return (
    
      <View style={styles.container}>
        <Text>error</Text>
      <Text> {errorMsg} </Text>
        <StatusBar style="auto" />
      </View>
    
    )
  }

  else
  {
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      <StatusBar style="auto" />
  </View>    )
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  main: {
      justifyContent: 'center',
      flex: 1,
  },
})

