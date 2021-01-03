import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import * as Device from 'expo-device'

export default function InputWrapper(props) {

  const getDeviceType = async () => {
    return await Device.getDeviceTypeAsync()
  }

  const dismissKeyboard = async () => {
    const deviceType = await getDeviceType();
    if(deviceType !== Device.DeviceType.DESKTOP) {
      Keyboard.dismiss()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {props.children}
    </TouchableWithoutFeedback>
  )
}