import React from 'react'
import { View } from 'react-native'
import tailwind from 'tailwind-rn'
import SvgLogo from '~/components/svg/SvgLogo'
import { Text } from '@ui-kitten/components'

export default function Logo() {
  return (
    <View style={tailwind('flex items-center mb-2')}>
      <View style={tailwind('flex flex-row')}>
        <SvgLogo/>
        <Text style={tailwind('font-semibold text-2xl')}>Uptime</Text>
      </View>
    </View>
  )
}