import 'react-native-gesture-handler'

import {
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../../styles/_colors'
import economy from '../../../assets/e-conomy512.png'
import { useNavigation } from '@react-navigation/native'
import Text from '../../Text'

const HomeScreen = () => {
  const verticalVal = new Animated.Value(0)
  const navigation = useNavigation()

  useEffect(() => {
    Animated.timing(verticalVal, { toValue: 20, duration: 2000, easing: Easing.inOut(Easing.cubic), useNativeDriver: true, }).start()
    verticalVal.addListener(({ value }) => {
      if (value == 20) {
        Animated.timing(verticalVal, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.cubic), useNativeDriver: true, }).start()
      }
      else if (value == 0) {
        Animated.timing(verticalVal, { toValue: 20, duration: 2000, easing: Easing.inOut(Easing.cubic), useNativeDriver: true, }).start()
      }
    })
  }, [verticalVal])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor='black' />
      <LinearGradient
        style={{ width: '100%', height: '100%', alignItems: 'center' }}
        colors={[colors.black, colors.black, colors.primary]}>
        <Animated.Image
          source={economy}
          style={[styles.image, { transform: [{ translateY: verticalVal }] }]} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>E-conomy</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TabScreen')}>
            <View style={styles.textButtonContainer}>
              <Text style={styles.textButton}>Iniciar</Text>
              <Icon name='arrow-right' color={colors.white} size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 200,
  },
  titleContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  title: {
    color: colors.white,
    fontSize: 40
  },
  button: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
  },
  textButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textButton: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center',
    marginRight: 10,
  },
})