import React, { useState, useEffect } from 'react'
import { View, Text, Keyboard } from 'react-native'
import TextInput from '~/components/form/TextInput'
import InputWrapper from '~/components/form/InputWrapper'
import Button from '~/components/ui/Button'
import useAuth from '~/hooks/useAuth'
import tailwind from 'tailwind-rn'
import Logo from '~/components/layouts/views/sections/Logo'

import toastMessage from '~/helpers/toast'

export default function LoginScreen ({ navigation }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  const login = async () => {
    try {
      await auth.login({
        email,
        password
      })
    } catch (error) {
      toastMessage(error)
    }
  }

  return (
    <InputWrapper>
      <View style={tailwind('p-6 max-w-sm w-full top-1/4 bg-white rounded-md')}>
        <Logo/>

        <View>

          {auth.userIsAuthenticated() && !auth.userIsVerified() &&
          <View style={tailwind('mb-3')}>
            <Text style={tailwind('pt-3 pb-3')}>
              A verification email was sent to you. Please check your email and follow the instructions to validate your
              account.
            </Text>

            <Button onPress={() => {
              auth.resendVerificationEmail().then(() => {
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
            onChangeText: setEmail
          }}/>

          <TextInput label="Password" inputProps={{
            onChangeText: setPassword,
            secureTextEntry: true
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
      </View>
    </InputWrapper>
  )
}