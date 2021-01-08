import React, { useState } from 'react'
import { View } from 'react-native'
import { useToast } from 'react-native-fast-toast'
import { Text } from '@ui-kitten/components'

import TextInput from '~/components/form/TextInput'
import Button from '~/components/ui/Button'
import tailwind from 'tailwind-rn'

import { useAuthContext } from '~/context/AuthContext'

import toastAPIResponse from '~/helpers/toast'

import AuthContainer from '~/components/layouts/views/auth/AuthContainer'

export default function LoginScreen ({ navigation }) {
  const toast = useToast()
  const [email, setEmail] = useState('tyson_mcc@hotmail.com')
  const [password, setPassword] = useState('It$Te$tTime!')

  const Auth = useAuthContext()

  const login = async () => {
    try {
      await Auth.login({
        email,
        password
      })
    } catch (error) {
      toastAPIResponse(toast, error)
    }
  }

  return (
    <AuthContainer>

      <View>

        {Auth.userIsAuthenticated() && !Auth.userIsVerified() &&
        <View style={tailwind('mb-3')}>
          <Text style={tailwind('pt-3 pb-3')}>
            A verification email was sent to you. Please check your email and follow the instructions to validate your
            account.
          </Text>

          <Button onPress={() => {
            Auth.resendVerificationEmail().then(() => {
              toastMessage({
                message: 'Email verification sent'
              })
            })
          }}>
            Request a new email
          </Button>
        </View>
        }

        <TextInput label="Email" inputProps={{
          autoCompleteType: 'email',
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
          onChangeText: setEmail,
          value: email
        }}/>

        <TextInput label="Password" inputProps={{
          onChangeText: setPassword,
          secureTextEntry: true,
          value: password
        }}/>

        <Button onPress={login}>
          Sign In
        </Button>
      </View>

      <View style={tailwind('flex flex-row justify-between items-center mt-4')}>

        <View>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={tailwind('no-underline text-blue-400')}>Register
          </Text>
        </View>

        <View>
          <Text
            onPress={() => navigation.navigate('Forgot Password')}
            style={tailwind('no-underline text-blue-400')}>
            Forgot Password
          </Text>
        </View>

      </View>

    </AuthContainer>
  )

}