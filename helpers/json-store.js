import AsyncStorage from '@react-native-async-storage/async-storage'

const setItem = async (key, value = {}) => {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

const getItem = async (key) => {
  return JSON.parse(await AsyncStorage.getItem(key) ?? '{}')
}

const AsyncJSONStore = {
  setItem,
  getItem,
  removeItem: AsyncStorage.removeItem
}

export default AsyncJSONStore
