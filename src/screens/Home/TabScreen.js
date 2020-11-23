import 'react-native-gesture-handler'

import React from 'react'

import Cadastro from './Cadastro'
import colors from '../../styles/_colors'
import Listagem from './Listagem'
import Relatorio from './Relatorio'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Feather,
  AntDesign,
  MaterialIcons,
} from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

const TabScreen = ({ categorias, setCategorias, adicionar, remover }) => {
  return (
    <Navigator
      initialRouteName='Listagem'
      tabBarOptions={{
        labelStyle: { fontFamily: 'Montserrat-Regular' },
        activeTintColor: colors.primary,
        inactiveTintColor: colors.gray,
        style: {
          backgroundColor: 'black',
          borderTopColor: "transparent",
        },
      }} >
      <Screen
        name='Cadastro'
        options={{ tabBarIcon: ({ focused, color }) => <MaterialIcons name="settings-input-antenna" size={24} color={color} /> }}
        children={() => <Cadastro categorias={categorias} setCategorias={setCategorias} />}
      />
      <Screen
        name='Listagem'
        options={{ tabBarIcon: ({ focused, color }) => <Feather name="list" size={24} color={color} /> }}
        children={() => <Listagem categorias={categorias} setCategorias={setCategorias} adicionar={adicionar} remover={remover} />}
      />
      <Screen
        name='Relatorio'
        children={() => <Relatorio categorias={categorias} setCategorias={setCategorias} />}
        options={{ tabBarIcon: ({ focused, color }) => <AntDesign name="barschart" size={24} color={color} /> }}
      />
    </Navigator>
  )
}

export default TabScreen
