import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tailwind from 'tailwind-rn'
import { useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'

export default function InputWrapper (props) {
  const themeStyles = useStyleSheet(themeStyleMap)

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        ...tailwind('flex flex-wrap content-center min-h-full'),
        ...themeStyles.screen
      }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps='handled'>
        {props.children}
    </KeyboardAwareScrollView>
  )
}