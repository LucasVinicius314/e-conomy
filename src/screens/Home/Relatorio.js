import 'react-native-gesture-handler'

import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'

import Text from '../../Text'

import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../styles/_colors'
import { useNavigation } from '@react-navigation/native'

const Relatorio = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        style={{ width: '100%', height: '100%', alignItems: 'center' }}
        colors={[colors.secondaryDark, colors.secondaryDark, colors.principal]}>
        <ScrollView>
          <Text>Relatório</Text>
        </ScrollView>
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
})