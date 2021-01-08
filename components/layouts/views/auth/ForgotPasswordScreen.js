import React, { useState } from 'react'
import { View, Keyboard } from 'react-native'
import Button from '~/components/ui/Button'
import useAuth from '~/hooks/useAuth'
import tailwind from 'tailwind-rn'
import TextInput from '~/components/form/TextInput'
import { Text } from '@ui-kitten/components'

import AuthContainer from '~/components/layouts/views/auth/AuthContainer'
import { useAuthContext } from '~/context/AuthContext'
import { useToast } from 'react-native-fast-toast'
import toastAPIResponse from '~/helpers/toast'

export default function ForgotPasswordScreen ({ navigation }) {
  const toast = useToast()

  const [email, onChangeEmail] = useState('')

  const Auth = useAuthContext()

  const forgotPassword = () => {
    Keyboard.dismiss()
    Auth.forgotPassword({
      email,
    }).then((response) => {
      toastAPIResponse(toast, response)
      navigation.navigate('Login')
    }).catch((error) => {
      toastAPIResponse(toast, error)
    })
  }

  return (
    <AuthContainer>
      <View>
        <TextInput label="Email" inputProps={{
          autoCompleteType: 'email',
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
          value: email,
          onChangeText: (email) => onChangeEmail(email)
        }}/>

        <Button onPress={forgotPassword}>
          Submit
        </Button>
      </View>
      <View style={tailwind('flex flex-row justify-between items-center mt-4')}>
        <View>
          <Text onPress={() => navigation.navigate('Login')}
                style={tailwind('no-underline text-blue-400')}>Return to login</Text>
        </View>
      </View>
    </AuthContainer>
  )
}