import React, {useState, useEffect} from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { CustomColors } from '../constants/CustomColors/CustomColors';
//import DashboardScreen from './DashboardScreen';
import * as Urls from '../constants/ConstantVariables/Urls';

const AccountScreen = ({navigation, route}) => {
  navigation.setOptions({
    headerTitle: 'User Management',
  });
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editUserId, setEditUserId] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); 
  const [getData, setGetData] = useState([]);
  const [usersId, setUsersId] = useState('');

  //route ? setUsersId(route.params) : null;
  // if(route.params){
  //   setUsersId(route.params);
  // }
  //const {usersId} = route.params;
  // useEffect(() => {
  //  getDetailsdDta(usersId);
  // }, [usersId]);

  const resetHandler = () => {
    setUsername('');
    setMobile('');
    setEmail('');
  };
  const getDetailsdDta = (usersId) => {
    // let dataToSend = {
    //   name:userName,
    //   email:userEmail,
    //   phone:userPhone,
    // };
console.log(Urls.userList + '/' + usersId);
    fetch(Urls.userList + '/' + usersId, {
      method: 'GET',
      //body: JSON.stringify(dataToSend),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);
        if (responseJson.status == true) {      
          let data = responseJson.data;
          console.log("data--"+ JSON.stringify(data))
          setGetData(data);
          setLoading(false);
        } else {
          console.log('Please check your user name or password');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleSubmitButton = () => {
   // alert('Work in progress.');
    if (username.length == 0) 
    {
        alert('Enter Username');
        return false;
    }
    if (mobile.length == 0) 
    {
        alert('Enter Mobile-No');
        return false;
    }
    if (email.length == 0) 
    {
        alert('Enter Email');
        return false;
    }
    //Show Loader
    //setLoading(true);

    let dataToSend = {
      name: username,
      phone: mobile,
      email: email,
    };
    console.log(Urls.userList);
    fetch(Urls.userList, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.status == 0) {      
        setLoading(false);
        alert(responseJson.message);
        resetHandler();
      } else {
        setLoading(false);
        alert(responseJson.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  //delete user function end
  //update user function start
    return (
        <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.subcontainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                autoCapitalize="none"
                placeholderTextColor="black"
                value={getData? getData.name : username}
                onChangeText={username => setUsername(username)}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="number-pad"
                maxLength={10}
                autoCapitalize="none"
                placeholderTextColor="black"
                value={getData? getData.phone : mobile}
                onChangeText={mobile => setMobile(mobile)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="black"
                value={getData? getData.email : email}
                onChangeText={email => setEmail(email)}
              />
              <View style={styles.btngrp}>
              <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() => navigation.navigate('DashboardScreen')}>
                    <Text style={styles.btnText}> Cancel</Text>
                  </TouchableOpacity>
                <TouchableOpacity style={styles.submitbtn} onPress={handleSubmitButton}>
                  <Text style={styles.btnText}> Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      // backgroundColor: '#46d4c4',
      height: '100%',
    },
    subcontainer: {
      marginTop: 18,
      alignContent: 'center',
    },
    input: {
      width: 350,
      height: 55,
      // backgroundColor: '#42A5F5',
      margin: 10,
      padding: 8,
      color: 'black',
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 18,
      fontWeight: 'bold',
    },
    btngrp: {
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    submitbtn: {
      height: 55,
      width: '62%',
      backgroundColor: '#0cb318',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    btnText: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 18,
    },
    cancelbtn: {
      height: 55,
      width: '40%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
  });