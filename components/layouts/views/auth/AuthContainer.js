import React from 'react'
import { View } from 'react-native'

import { useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'

import InputWrapper from '~/components/form/InputWrapper'
import tailwind from 'tailwind-rn'
import Logo from '~/components/ui/Logo'

export default function AuthContainer ({ children }) {
  const themeStyles = useStyleSheet(themeStyleMap)

  return (
    <View style={themeStyles.container}>
      <InputWrapper>
        <View style={{ ...tailwind('p-6 max-w-sm w-full top-20 rounded-md'), ...themeStyles.container }}>
          <Logo/>
          <View>
            {children}
          </View>
        </View>
      </InputWrapper>
    </View>
  )
}

