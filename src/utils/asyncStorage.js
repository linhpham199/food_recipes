import { AsyncStorage } from 'react-native';

export const retrieveStorage = async(storage) => {
  return JSON.parse(await AsyncStorage.getItem(storage))
}

export const updateStorage = async(storage, item) => {
  await AsyncStorage.setItem(storage, JSON.stringify(item))
}