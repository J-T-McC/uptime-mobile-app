import React, { useState } from 'react'
import {  View, Text, Keyboard } from 'react-native'

import TextInput from '@/components/form/TextInput'
import InputWrapper from '@/components/form/InputWrapper'
import Button from '@/components/ui/Button'
import useAuth from '@/hooks/useAuth'
import tailwind from 'tailwind-rn'
import Logo from '@/components/layouts/views/sections/Logo'
import { Link } from '@/react-router'

export default function Login () {

  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const auth = useAuth()

  const login = () => {
    Keyboard.dismiss()
    auth.login({
      email,
      password
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <InputWrapper>
      <View style={tailwind('flex top-1/4 items-center h-full px-6')}>

        <View style={tailwind('p-6 max-w-sm w-full bg-white rounded-md')}>

          <Logo/>

          <View>

            <TextInput label="Email" inputProps={{
              autoCompleteType: "email",
              keyboardType: "email-address",
              autoCapitalize: "none",
              autoCorrect: false,
              value: email,
              onChangeText: (email) => onChangeEmail(email)
            }}/>

            <TextInput label="Password" inputProps={{
              value: password,
              onChangeText: (password) => onChangePassword(password),
              secureTextEntry: true
            }}/>

            <Button onPress={login}>
              Sign In
            </Button>
          </View>

          <View style={tailwind('flex flex-row justify-between items-center mt-4')}>

            <View>
              <Link style={tailwind('no-underline')} to="/auth/register">
                <Text style={tailwind('no-underline text-blue-400')}>Register</Text>
              </Link>
            </View>

            <View>
              <Link style={tailwind('no-underline')} to="/auth/forgot-password">
                <Text style={tailwind('no-underline text-blue-400')}>Forgot password</Text>
              </Link>
            </View>

          </View>
        </View>
      </View>
    </InputWrapper>
  )
}