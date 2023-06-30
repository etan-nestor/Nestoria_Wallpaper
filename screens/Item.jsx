import React,{useState} from 'react';
import { View, Text,ActivityIndicator,Image,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Expo from 'expo';
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from "react-native-safe-area-context";

export default function Item({route}) {
    const id = route?.params?.param;
    const navigation=useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      {isLoading ? <ActivityIndicator color={"#F46223"} size="large" />: <>
        <Image className="h-full w-full" source={{uri:"https://cdn.pixabay.com/photo/2012/03/07/05/48/garden-22449_960_720.jpg"}} />

        <SafeAreaView className="w-full absolute z-10 inset-0 flex items-center justify-start">
            <TouchableOpacity className="w-full flex px-4 mb-[650px]" onPress={()=>navigation.navigate("HomeScreen")}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            <View className="w-full relative">
                <View className="absolute bottom-8 inset-x-0 p-4">
                    <BlurView className="p-4 flex-row items-center justify-between" intensity={60} tint="dark">
                        <View className="flex items-start justify-between gap-3">
                            <Text className="text-3xl text-white font-bold">Some Title</Text>
                            <Text className="text-white font-bold">Some Description</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="cloud-download-sharp" size={24} color="white" />
                        </TouchableOpacity>
                    </BlurView>
                </View>
            </View>
        </SafeAreaView>
      </>}
     </View>
  );
}
