import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View,Image  } from 'react-native';
import { colors } from '../utilis/index'
const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({ currentWeather }) {
    const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`

    return (
        <View style={styles.weatherInfo}>
<Text  style = {styles.texSecondary}> {currentWeather.name} </Text>

               

            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />

        <Text style = {styles.textPrimary}>{currentWeather.main.temp} </Text>


        <Text  style = {styles.texSecondary}> {currentWeather.weather[0].main} </Text>
        

        <Text style={styles.weatherDescription}>{currentWeather.weather[0].description}</Text>

        </View>

    )
}
const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },
    weatherIcon: {
        width: 75,
        height: 75,
    },
    weatherDescription: {
        textTransform: 'capitalize',
    },

        textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },

    texSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },


})
