import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";

import { Card, Button, Input, Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostCard from "./../components/PostCard";

import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import { addDataJSON, getDataJSON } from "../functions/AsyncStorageFunctions";
import moment from "moment";
import { LogBox } from "react-native";

const HomeScreen = (props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const postText = React.createRef();

  const loadPosts = async () => {
    setLoading(true);

    let allpost = await getDataJSON("post");
    setPosts(allpost);
  };

  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs([
      "VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.",
    ]);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />

          <Card>
            <Input
              ref={postText}
              clearButtonMode={"always"}
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={function (currentInput) {
                setPost(currentInput);
              }}
            />
            <Button
              title="Post"
              type="outline"
              onPress={function () {
                let newpost = {
                  postId:
                    auth.CurrentUser.Email +
                    moment().format("YYYY-MM-DD hh:mm:ss a"),
                  user: auth.CurrentUser,
                  time: moment().format("YYYY-MM-DD hh:mm:ss a"),

                  body: post,
                };
                if (posts == undefined) {
                  setPosts([newpost]);
                  storeDataJSON("post", [newpost]);
                } else {
                  setPosts([...posts, newpost]);
                  addDataJSON("post", newpost);
                }
                postText.current.clear();
              }}
            />
          </Card>

          <ScrollView>
            <FlatList
              data={posts}
              inverted={true}
              renderItem={({ item }) => {
                return (
                  <PostCard
                    author={item.user.name}
                    title={"Time : " + item.time}
                    body={item.body}
                    post={item}
                    navigation={props.navigation}
                  />
                );
              }}
            />
          </ScrollView>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;


  