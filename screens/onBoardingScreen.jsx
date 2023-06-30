import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'

const img=require("../assets/1.png");

export default function OnBoardingScreen() {

    const navigation=useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
        <Image className="w-full h-full object-cover" source={img} />

        <SafeAreaView className="absolute z-10 inset-0 flex items-center justify-start">
            <View className="w-full flex px-4 mb-[500px] mr-14">
                <Text className="text-xl text-[#f6e8e1]">Mobile</Text>
                <Text className="text-[34px] text-white tracking-wider">4k Wallpaper</Text>
            </View>

            <TouchableOpacity onPress={()=>{navigation.navigate("HomeScreen")}}className="w-full px-16 ">
                <View className="w-full bg-[#F46223] p-2 flex-row items-center justify-center rounded-full">
                    <Text className="text-[#aab606] text-xl font-bold">Get Started</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
  );
}
