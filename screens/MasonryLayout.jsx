import React from 'react';
import { View, Text,TouchableOpacity,Image} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {useNavigation} from '@react-navigation/native'


export default function MasonryLayout({data}) {
  return (
    <MasonryList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardItem data={item} />}
    />
  );
}
const CardItem = ({data})=>{
    const navigation=useNavigation();
    const handClick=()=>{
        navigation.navigate("Item",{param:data.id});
    }

    return(
        <TouchableOpacity onPress={handClick} style={{height:Math.round(Math.random() * 100 + 200)}} className="bg-[#111] m-1 rounded-md overflow-hidden relative">
            <Image source={{uri:data.imageURL}} className="w-full h-full object-cover" />
        </TouchableOpacity>
    )
}