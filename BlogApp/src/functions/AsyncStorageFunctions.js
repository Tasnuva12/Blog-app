import AsyncStorage from '@react-native-community/async-storage'
import {ToastAndroid} from "react-native";
import { ToastAndroid } from "react-native";

const storeData =async(key,value)=>{
    try{
        await AsyncStorage.setItem(key,value);
        ToastAndroid.show("Data Stored Successfully!",ToastAndroid.SHORT);
    }
    catch(error){
        alert(error);
    }

};

const storeDataJSON = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      ToastAndroid.show("Data Stored Successfully!", ToastAndroid.SHORT);
    } catch (error) {
      alert(error);
    }
  };

  const getData = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      if (data != null) {
        return data;
      } else {
        ToastAndroid.show("Data received Successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      alert(error);
    }
  };
  const getDataJSON = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      if (data != null) {
        const jsonData = JSON.parse(data);
        return jsonData;
      } else {
      }
    } catch (error) {
      alert(error);
    }
  };



  export {
    storeData,
    storeDataJSON,
    getData,
    getDataJSON,
    removeData,
    addDataJSON,
  };
  
  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      ToastAndroid.show("Data removed Successfully!", ToastAndroid.SHORT);
    } catch (error) {
      alert(error);
    }
  };
  
  const addDataJSON = async (key, value) => {
    try {
      let val = await AsyncStorage.getItem(key);
      val = JSON.parse(val);
      val.push(value);
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.setItem(key, jsonValue);
      ToastAndroid.show("Data added Successfully!", ToastAndroid.SHORT);
    } catch (error) {
      alert(error);
    }
  };