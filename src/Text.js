import { Text as _Text } from 'react-native'
import React from 'react'

export default function Text(props) {
  return (
    <_Text style={{ fontFamily: 'Montserrat-Regular', ...props.style }}>{props.children}</_Text>
  )
}