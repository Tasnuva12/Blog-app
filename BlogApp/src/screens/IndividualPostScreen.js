import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
  } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import moment from "moment";
import { LogBox } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CommentCard from "./../components/CommentCard";

import {
    addDataJSON,
    getDataJSON,
    storeDataJSON,
  } from "../functions/AsyncStorageFunctions";
  import uuid from "uuid-random";
  const PostScreen = (props) => {
    let info = props.route.params;
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [postComments, setPostComments] = useState([]);
  
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const commentText = React.createRef();
    const LoadComments = async () => {
        setLoading(true);
        let commentss = await getDataJSON("comment");
        setComments(commentss);
        if (commentss != null) {
          setPostComments(commentss.filter((item) => item.postId == info.postId));
        } else {
          setPostComments([]);
        }
      };
      const LoadLikes = async () => {
        let likess = await getDataJSON("Like" + info.postId);
        if (likess != null) {
          setLikes(likess);
        }
        setLoading(false);
      };

      useEffect(() => {
        LoadComments();
        LoadLikes();
        LogBox.ignoreLogs([
          "VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.",
        ]);
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
              <ScrollView>
            <SafeAreaView style={styles.AreaviewStyle}>
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
                <Text h4Style={{ padding: 10, color: "#687CE1" }} h4>
                  {info.user.name}
                </Text>


              </View>
              <Text style={{ fontStyle: "italic", fontSize: 12 }}>
                Posted on {info.time}
              </Text>
              <Text style={{ fontSize: 19, paddingBottom: 10 }}>
                {info.body}
              </Text>

              <Card.Divider />

              <Text style={{ padding: 7 }}>
                {likes.length} Likes, {postComments.length} Comments.
              </Text>
              <Card.Divider />
              <Input
                ref={commentText}
                clearButtonMode={"always"}
                placeholder="Write a comment"
                leftIcon={<Entypo name="pencil" size={18} color="black" />}
                onChangeText={function (currentInput) {
                  setComment(currentInput);
                }}
              />

<Button
                type="outline"
                title="Comment"
                onPress={function () {
                  if (comment != "") {
                    const commentid = uuid();
                    let newcomment = {
                      postId: info.postId,
                      commentid: commentid,
                      user: auth.CurrentUser,
                      time: moment().format("DD MMM, YYYY"),
                      body: comment,
                    };

                    if (postComments == undefined) {
                        setPostComments([newcomment]);
                      } else {
                        setPostComments([...postComments, newcomment]);
                      }
  
                      if (comments == undefined) {
                        setComments([newcomment]);
                        storeDataJSON("comment", [newcomment]);
                      } else {
                        setComments([...comments, newcomment]);
                        addDataJSON("comment", newcomment);
                      }
                    }
                    commentText.current.clear();
                  }}
                />
              </SafeAreaView>
              <FlatList
                data={postComments}
                inverted={true}
                scrollsToTop={true}
                keyExtractor={(item) => item.commentid}
                renderItem={({ item }) => {
                  return (
                    <CommentCard
                      name={item.user.name}
                      time={"Commented on " + item.time}
                      comment={item.body}
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
    AreaviewStyle: {
      flex: 1,
      borderRadius: 10,
      borderBottomWidth: 20,
      borderLeftWidth: 15,
      borderRightWidth: 15,
      borderColor: "transparent",
    },
  });
  
  export default PostScreen; 

