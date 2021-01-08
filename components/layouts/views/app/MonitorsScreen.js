import React, { useState, useEffect } from 'react'
import { View, Text, Keyboard } from 'react-native'
import InputWrapper from '~/components/form/InputWrapper'
import tailwind from 'tailwind-rn'
import ResourceService from '~/services/ResourceService'

export default function MonitorsScreen ({ navigation }) {

  const [monitors, setMonitors] = useState([])

  const monitorResource = ResourceService('monitors')

  const loadMonitors = async (params) => {
    try {
      const { data } = await monitorResource.index()
      setMonitors(data.data)
    }
    catch(error) {

    }
  }

  useEffect(() => {
    loadMonitors()
  }, [])

  return (
    <InputWrapper>
      <View style={tailwind('p-6 max-w-sm w-full h-full bg-white rounded-md')}>
        <View>
          <Text>Monitors</Text>
        </View>
      </View>
    </InputWrapper>
  )
}