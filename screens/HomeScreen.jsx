import React,{useState}from 'react';
import { View, Text ,TouchableOpacity,ActivityIndicator,ScrollView,Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { Entypo } from '@expo/vector-icons';
import MasonryLayout from "./MasonryLayout"

export default function HomeScreen() {

const [categories, setCategories] = useState(null);
const data=[
    {id:'1',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2023/06/08/08/27/plant-8049076_960_720.jpg"},
    {id:'2',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_960_720.jpg"},
    {id:'3',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg"},
    {id:'4',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2014/12/24/05/02/drop-of-water-578897_960_720.jpg"},
    {id:'5',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2013/04/04/12/34/mountains-100367_960_720.jpg"},
    {id:'6',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052_960_720.jpg"},
    {id:'7',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2023/06/18/19/37/spider-8072622_960_720.jpg"},
    {id:'8',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2018/04/06/00/25/trees-3294681_960_720.jpg"},
    {id:'9',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2013/12/17/20/10/bubbles-230014_960_720.jpg"},
    {id:'10',name:"Nature",imageURL:"https://cdn.pixabay.com/photo/2014/12/24/05/02/drop-of-water-578897_960_720.jpg"},
]

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
        <SafeAreaView className="flex w-full h-full items-center justify-start gap-4">
            <View className="w-full px-6 flex-row items-center justify-between">
                <Text className="text-2xl text-gray-50 font-semibold">4k Wallpaper</Text>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView className="w-full h-full px-4">
                {
                data ? (
                    <MasonryLayout data={data} />
                ) : (<>
                <ActivityIndicator color={"#F46223"} size="large" />
                </>)
                }
            </ScrollView>
        </SafeAreaView>
     </View>
  );
}
