import 'react-native-gesture-handler'

import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import React from 'react'

import Text from '../../Text'
import {
  PieChart,
  LineChart
} from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../styles/_colors'
import { useNavigation } from '@react-navigation/native'

const Relatorio = ({ categorias }) => {
  let consumoTotal = 0
  categorias.forEach(v => consumoTotal += ((parseFloat(v.potencia) * parseFloat(v.tempo) * parseInt(v.quantidade) * 30) / 1000))

  const _renderItem = ({ index }) => {
    switch (index) {
      case 0:
        // barra
        if (categorias.length === 0)
          return <Text style={{ color: 'white', height: '100%', paddingVertical: 100, color: '#aaa', width: '100%', textAlign: 'center' }}>Não há dados</Text>
        return (
          <LineChart
            data={{
              labels: categorias.map(v => v.nome),
              datasets: [{
                data: categorias.map(v => (parseFloat(v.potencia) * parseFloat(v.tempo) * parseInt(v.quantidade) * 30) / 1000)
              }]
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              height: '100%',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
          />
        )
      case 1:
        // pizza
        if (categorias.length === 0)
          return <Text style={{ color: 'white', height: '100%', paddingVertical: 100, color: '#aaa', width: '100%', textAlign: 'center' }}>Não há dados</Text>
        return (
          <PieChart
            data={categorias.map(v => ({
              name: v.nome,
              consumo: (parseFloat(v.potencia) * parseFloat(v.tempo) * parseInt(v.quantidade) * 30) / 1000,
              color: (() => `hsl(${200 + Math.random() * 130}, 60%, 40%)`)(),
              legendFontColor: '#ccc',
              legendFontSize: 15,
              legendFontFamily: 'Montserrat-Regular',
            }))}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              color: () => `hsl(${240 + Math.random() * 50}, 60%, 40%)`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              height: '100%',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
            accessor="consumo"
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        style={{ width: '100%', height: '100%', alignItems: 'center' }}
        colors={[colors.black, colors.black, colors.primary]}>
        <Text style={styles.title}>Relatório</Text>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', width: '100%', paddingVertical: 30 }}>
            <Text style={{ color: colors.white }}>Consumo mensal total</Text>
            <Text style={{ color: 'white', fontSize: 70, marginVertical: 20 }}>{consumoTotal.toFixed(2)}kWh</Text>
          </View>
          <Carousel
            style={{ backgroundColor: 'green' }}
            data={[0, 1]}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={Dimensions.get('screen').width}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Relatorio

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 40,
    marginVertical: 20,
  },
  slide: {
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  slideTitle: {
    fontSize: 30
  }
})