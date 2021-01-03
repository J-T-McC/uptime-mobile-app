import React, { useState } from 'react'
import { View, Text, Keyboard } from 'react-native'
import Button from '@/components/ui/Button'
import useAuth from '@/hooks/useAuth'
import tailwind from 'tailwind-rn'
import Logo from '@/components/layouts/views/sections/Logo'
import { Link } from '@/react-router'
import InputWrapper from '@/components/form/InputWrapper'
import TextInput from '@/components/form/TextInput'

export default function Login () {

  const [name, onChangeName] = useState('')
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [passwordConfirm, onChangePasswordConfirm] = useState('')

  const auth = useAuth()

  const register = () => {
    Keyboard.dismiss()
    auth.register({
      name,
      email,
      password,
      password_confirmation: passwordConfirm
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

            <TextInput label="Name" inputProps={{
              autoCompleteType: "name",
              keyboardType: "default",
              autoCapitalize: "words",
              autoCorrect: false,
              value: name,
              onChangeText: (name) => onChangeName(name)
            }}/>

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

            <TextInput label="Confirm Password" inputProps={{
              value: passwordConfirm,
              onChangeText: (passwordConfirm) => onChangePasswordConfirm(passwordConfirm),
              secureTextEntry: true
            }}/>

            <Button onPress={register}>
              Register
            </Button>
          </View>

          <View style={tailwind('flex flex-row justify-between items-center mt-4')}>

            <View>
              <Link style={tailwind('no-underline')} to="/auth/login">
                <Text style={tailwind('no-underline text-blue-400')}>Return to login</Text>
              </Link>
            </View>

          </View>
        </View>
      </View>
    </InputWrapper>

  )
}