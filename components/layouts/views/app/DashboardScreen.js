import React, { useState, useEffect } from 'react'
import { View, Text, Keyboard } from 'react-native'
import InputWrapper from '~/components/form/InputWrapper'
import tailwind from 'tailwind-rn'
import Logo from '~/components/layouts/views/sections/Logo'

export default function DashboardScreen ({ navigation }) {

  return (
    <InputWrapper>
        <View style={tailwind('p-6 max-w-sm w-full top-1/4 bg-white rounded-md')}>
          <Logo/>

          <View>
            <Text>Dashboard</Text>
          </View>

        </View>
    </InputWrapper>
  )
}