import React, { useState, useEffect } from 'react'
import {
  View,
  Share,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Entypo } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as Expo from 'expo'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import moment from 'moment'
import * as MediaLibrary from 'expo-media-library'
import { getItemById } from '../sanity'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Item ({ route }) {
  const id = route?.params?.param
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)

  const [item, setItem] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getItemById(id)
      .then(data => setItem(data))
      .catch(err => alert(err))
    setInterval(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const handleDownload = async () => {
    let date = moment().format('YYYYMMDDhhmmss')
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)

      if (status === 'granted') {
        const res = await FileSystem.downloadAsync(
          urlFor(item?.image).url(),
          fileUri
        )
        saveFile(res.uri)
      } else if (status === 'denied') {
        const { status: newStatus } = await Permissions.askAsync(
          Permissions.MEDIA_LIBRARY
        )

        if (newStatus === 'granted') {
          const res = await FileSystem.downloadAsync(
            urlFor(item?.image).url(),
            fileUri
          )
          saveFile(res.uri)
        } else {
          alert('Please allow permissions to download')
        }
      }
    } catch (err) {
      console.log('FS Err: ', err)
    }
  }

  const shareImage = async () => {
    if (item && item.image) {
      const imageUrl = urlFor(item.image).url();
      try {
        await Share.share({
          message: 'Share image',
          url: imageUrl
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const setWallpaper = async () => {}

  const saveFile = async fileUri => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === 'granted') {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        const album = await MediaLibrary.getAlbumAsync('Download')
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false)
          alert('Image Saved')
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
          alert('Image Saved')
        }
      } catch (err) {
        console.log('Save err: ', err)
      }
    } else if (status === 'denied') {
      alert('please allow permissions to download')
    }
  }

  return (
    <View className='flex-1 items-center justify-center bg-[#04020d] relative'>
      {isLoading ? (
        <ActivityIndicator color={'#F46223'} size='large' />
      ) : item ? (
        <>
          <Image
            className='h-screen w-full'
            source={{ uri: urlFor(item?.image).url() }}
          />

          <SafeAreaView className='w-full absolute z-10 inset-0 flex items-center justify-start'>
            <TouchableOpacity
              className='w-full flex px-4 mb-[650px]'
              onPress={() =>
                navigation.navigate('ItemsScreens', {
                  param: item.category[0]._ref
                })
              }
            >
              <Ionicons name='arrow-back' size={32} color='white' />
            </TouchableOpacity>

            <View className='w-full relative'>
              <View className='absolute bottom-8 inset-x-0 p-4'>
                <BlurView
                  className='p-4 flex-row items-center justify-between'
                  intensity={60}
                  tint='dark'
                >
                  <TouchableOpacity onPress={shareImage}>
                    <Entypo name='share' size={24} color='white' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={setWallpaper}>
                    <Feather name='image' size={24} color='white' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDownload}>
                    <AntDesign name='save' size={24} color='white' />
                  </TouchableOpacity>
                </BlurView>
              </View>
            </View>
          </SafeAreaView>
        </>
      ) : (
        <Text>No item found</Text>
      )}
    </View>
  )
}
