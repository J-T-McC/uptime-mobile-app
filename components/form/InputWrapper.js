import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tailwind from 'tailwind-rn'

export default function InputWrapper (props) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={tailwind('flex flex-wrap content-center min-h-full')} extraScrollHeight={150} enableOnAndroid={true}>
        {props.children}
    </KeyboardAwareScrollView>
  )
}