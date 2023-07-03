import React,{useState,useEffect} from 'react';
import { View, Text ,TouchableOpacity,ActivityIndicator,ScrollView,Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {getCategoryItemsById} from '../sanity';
import { Entypo } from '@expo/vector-icons';
import MasonryLayout from "./MasonryLayout";


export default function ItemsScreens({route}) {

    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const id = route?.params.param;

    useEffect(()=>{
        setIsLoading(true);
        getCategoryItemsById(id).then((data)=>setItems(data)).catch((err)=>alert(err));
        setInterval(()=>{
            setIsLoading(false);
        },2000);
    },[])

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      {isLoading ? (
        <ActivityIndicator color={"#F46223"} size="large" />
      ) : (<>
      {items ? <>
        <SafeAreaView className="flex w-full h-full items-center justify-start gap-4">
            <View className="w-full px-6 flex-row items-center justify-between">
                <Text className="text-2xl text-gray-50 font-semibold">4k Wallpaper</Text>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView className="w-full h-full px-4">
                {
                items ? (
                    <MasonryLayout data={items} screen="Item" />
                ) : (<>
                <ActivityIndicator color={"#F46223"} size="large" />
                </>)
                }
            </ScrollView>
        </SafeAreaView>
      </> : <>
      <Text className="text-3xl font-bold text-white ">No Items Found</Text>
      </>}
      </>)}
    </View>
  );
}
