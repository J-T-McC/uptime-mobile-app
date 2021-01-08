import React from 'react'
import { View } from 'react-native'
import tailwind from 'tailwind-rn'

import {Text} from '@ui-kitten/components'

import { useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'

export default function Container (props) {

  const themeStyles = useStyleSheet(themeStyleMap)

  return (
    <View style={{...tailwind('w-full rounded-md mt-3'), ...themeStyles.container}}>
      <View style={{
        ...tailwind('p-5 border-b border-gray-100'),
        shadowColor: '#222',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 0,
        elevation: 1,
      }}>

        <View>
          <Text style={tailwind('text-lg')}>
            {props.header}
          </Text>
        </View>
      </View>

      {props.children &&
      <View style={tailwind('flex flex-wrap justify-center mt-3')}>
        {props.children}
      </View>}
    </View>

  )

}