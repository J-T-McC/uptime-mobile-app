import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

export default function Container (props) {
  return (
    <View style={tailwind('w-full bg-white rounded-md mt-3 pb-3')}>
      <View style={{
        ...tailwind('p-5 border-b border-gray-100 mb-3'),
        backgroundColor: '#fff',
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
          <Text style={tailwind('text-lg text-gray-600')}>
            {props.header}
          </Text>
        </View>
      </View>

      <View style={tailwind('flex flex-wrap justify-center')}>
        {props.children}
      </View>
    </View>

  )

}