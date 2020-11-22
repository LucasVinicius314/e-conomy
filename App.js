import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/Home/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import TabScreen from './src/screens/Home/TabScreen'
import * as Font from 'expo-font'
import { useState } from 'react'

const { Navigator, Screen } = createStackNavigator()

const config = {
  animation: 'restSpeedThreshold',
  config: {
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    stiffness: 1000,
  },
}

const screenOptions = {
  headerShown: false,
  animationEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureDirection: 'horizontal',
  gestureEnabled: true,
  transitionSpec: { open: config, close: config },
}

export default function App() {
  const [categorias, setCategorias] = useState([])
  const [loaded] = Font.useFonts({
    'Montserrat-Regular': {
      uri: require('./assets/fonts/Montserrat-Regular.ttf'),
      fontDisplay: Font.FontDisplay.FALLBACK,
    },
    'Montserrat-Bold': {
      uri: require('./assets/fonts/Montserrat-Bold.ttf'),
      fontDisplay: Font.FontDisplay.FALLBACK,
    },
  })
  if (!loaded) return null


  return (
    <NavigationContainer>
      <Navigator
        headerMode='none'
        screenOptions={screenOptions}>
        <Screen
          name='HomeScreen'
          component={HomeScreen} />
        <Screen
          name='TabScreen'
          children={() => <TabScreen categorias={categorias} setCategorias={setCategorias} />} />
      </Navigator>
    </NavigationContainer>
  )
}
