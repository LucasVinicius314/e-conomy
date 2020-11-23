import 'react-native-gesture-handler'

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Text from '../../Text'
import { Avatar, Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../styles/_colors'
import FotoAntena from '../../../assets/antena.png'

const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: colors.primary }} icon="video-input-antenna" />

export default class Listagem extends React.Component {
  state = {}

  add = (v, k) => {
    this.props.adicionar(k)
    let c = this.state
    c[k] = c[k] + 1
    this.setState(c)
  }

  remove = (v, k) => {
    if (v.quantidade === 0) return
    this.props.remover(k)
    let c = this.state
    c[k] = c[k] - 1
    this.setState(c)
  }

  render = () => {
    const { categorias } = this.props

    categorias.forEach((v, k) => this.state[k] = v.quantidade)

    console.log(this.state)

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <LinearGradient
          style={{ width: '100%', height: '100%', alignItems: 'center' }}
          colors={[colors.black, colors.black, colors.primary]}>
          <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 20, alignItems: 'center' }} style={{ width: '100%' }}>
            <Text style={styles.title}>Antenas</Text>
            {
              this.props.categorias.length > 0 ?
                this.props.categorias.map((v, k) =>
                  <Card key={k} style={{ width: '100%', marginVertical: 10 }}>
                    <Card.Title title={v.nome} subtitle={`Potência: ${v.potencia}W - ${v.tempo}h por dia`} left={LeftContent} />
                    <Card.Cover source={FotoAntena} />
                    <Card.Actions style={{ flexDirection: 'row-reverse' }}>
                      <Button mode='text' color={colors.primary} icon='plus' onPress={() => this.add(v, k)} />
                      <Button mode='text' color='gray' icon='minus' onPress={() => this.remove(v, k)} />
                      <Text>Quantidade: {this.state[k]}</Text>
                    </Card.Actions>
                  </Card>
                )
                : <Text style={{ color: 'white', paddingVertical: 30, color: '#aaa' }}>Não há antenas cadastradas</Text>
            }
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    )
  }
}

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
  }
})