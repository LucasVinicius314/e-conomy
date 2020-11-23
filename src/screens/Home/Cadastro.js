import 'react-native-gesture-handler'

import { SafeAreaView, ScrollView, StyleSheet, View, TextInput } from 'react-native'
import Text from '../../Text'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../styles/_colors'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-community/picker'
import { FAB, configureFonts, DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    accent: colors.complementarySemiDark,
  },
  fonts: configureFonts({
    default: {
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
    },
  }),
}

const Cadastro = ({ categorias, setCategorias }) => {
  const navigation = useNavigation()

  const [nome, setNome] = useState('')
  const [potencia, setPotencia] = useState('')
  const [tempo, setTempo] = useState('')
  const [ativo, setAtivo] = useState(true)

  const save = async () => {
    try {
      if (isNaN(potencia)) throw new Error('Gasto inválido')
      setCategorias([...categorias, { nome, potencia, tempo, quantidade: 0 }])
      setNome('')
      setPotencia('')
      setTempo('')
      setAtivo()
      navigation.navigate('Listagem')
    } catch (e) {
      alert(e)
    }
  }

  let horas = [];
  for (let i = 1; i < 25; i++) horas.push(i);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        style={{ width: '100%', height: '100%', alignItems: 'center' }}
        colors={[colors.black, colors.black, colors.primary]}>
        <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={styles.title}>Cadastro</Text>
          <MaterialIcons name="settings-input-antenna" size={54} color={colors.white} style={{ marginVertical: 20 }} />
          <TextInput style={styles.TextInput} placeholder='Nome' placeholderTextColor='#ccc' value={nome} onChangeText={setNome} />
          <TextInput style={styles.TextInput} placeholder='Potência (W)' keyboardType='numeric' placeholderTextColor='#ccc' value={potencia} onChangeText={setPotencia} />
          <View style={styles.pickerContainer}>
            <Picker selectedValue={tempo} style={styles.picker} mode='dropdown' onValueChange={e => console.log(e) || setAtivo(e == 0) || setTempo(e)}>
              <Picker.Item key={0} label='Horas por dia' value={0} />
              {horas.map(v => <Picker.Item key={v} label={`${v}h`} value={v} />)}
            </Picker>
          </View>
        </ScrollView>
        <FAB icon="plus" disabled={ativo} onPress={() => {
          save();
        }} label='Cadastrar' style={styles.fabcad} theme={theme} />
      </LinearGradient>
    </SafeAreaView >
  )
}

export default Cadastro

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  ScrollView: {
    height: '100%',
    width: '100%',
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
    fontSize: 40,
    marginVertical: 20,
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
  TextInput: {
    width: '100%',
    height: 55,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 12,
    borderRadius: 6,
    borderColor: '#F0F0F5',
    borderWidth: 1,
    color: colors.white
  },
  pickerContainer: {
    width: '100%',
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13,
    paddingVertical: 6,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F0F5',
    color: colors.white,
  },
  picker: {
    color: '#ccc',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  fabcad: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontFamily: 'Montserrat-Regular',
  },
})