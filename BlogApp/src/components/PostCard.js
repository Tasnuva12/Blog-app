import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import { getDataJSON } from "../functions/AsyncStorageFunctions";
import { useIsFocused } from '@react-navigation/native';

const PostCard=(props)=>{
    return (
        <Card>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
                >
             <Avatar
             containerStyle={{ backgroundColor: "#ffab91" }}
             rounded
             icon={{ name: "user", type: "font-awesome", color: "black" }}
             activeOpacity={1} 
             />
             <Text h4Style={{ padding: 10 }} h4>
               {props.author}
             </Text>     

            </View>
            <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
            <Text
              style={{
                paddingVertical: 10,
                   }}
             >    
             {props.body}  
              </Text>
              <Card.Divider />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button
                type="outline"
                title="  Like "
                icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
              />    
              <Button type="solid" title="comment"
        
               onPress={function () {
         
               props.navigation.navigate('IPost', props.post);

             }}
      />
              </View>


        </Card>
    );
};
export default PostCard;