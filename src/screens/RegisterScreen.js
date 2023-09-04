import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {CustomColors} from '../constants/CustomColors/CustomColors';
import Loader from '../Components/Loader/Loader';
import * as Urls from '../constants/ConstantVariables/Urls';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const RegisterScreen = ({navigation}) => {
    navigation.setOptions({
        headerTitle: 'Register',
      });
      const [userName, setUserName] = useState('');
      const [userPhone, setUserPhone] = useState('');
      const [userEmail, setUserEmail] = useState('');
      const [userPassword, setUserPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const [errortext, setErrortext] = useState('');
      const [isSelected, setSelection] = useState(false);
      var radio_props = [
        {label: 'Male', value: 0 },
        {label: 'Female', value: 1 },
        {label: 'Others', value: 2 }
      ];
       
      const passwordInputRef = createRef();
   
      const handleCheckBox = () => {
        settermsAccepted(true);
      }
      const resetHandler = () => {
        setUserName('');
        setUserPhone('');
        setUserEmail('');
        setUserPassword('');
        setLoading(false);
        setErrortext('');
      };
      const handleSubmitPress = () => {
        setErrortext('');
        
        if (!userName) {
          setErrortext('Please enter name');
          return;
        }
        if (!userPhone) {
          setErrortext('Please enter phone');
          return;
        }
        if (!userEmail) {
          setErrortext('Please enter email');
          return;
        }
        if (!userPassword) {
          setErrortext('Please enter password');
          return;
        }
        if(!isSelected)
        {
          setErrortext('Please accept How you hear about this');
          return;
        }
        setLoading(true);
        let dataToSend = {
          name:userName,
          email:userEmail,
          phone:userPhone,
          password:userPassword,
          about:isSelected, 
          city:"kolkata",
          state:"West Bengal"
        };
        console.log(Urls.register);
        fetch(Urls.register, {
          method: 'POST',
          body: JSON.stringify(dataToSend),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log('register-->'+ JSON.stringify(responseJson))
            setLoading(false);
            if (responseJson.status == 0) {              
              alert("Thank you to register with us");
              resetHandler();
              navigation.navigate('LoginScreen');
            } else {
              setErrortext('The given email address already has an account associated with it.');
            }
          })
          .catch(error => {
            //Hide Loader
            setLoading(false);
            setErrortext(
              'An error occured, Please check your internet and try again later.',
            );
            console.error(error);
          });
       // navigation.replace('LoginScreen');
        
      };
    return (
           <View style={styles.mainContainer}> 
           <Loader loading={loading} />
           <ScrollView>
             <View style={styles.container}>
     
             <View style={styles.inputView}>
                 <TextInput
                   style={styles.TextInput}
                   onChangeText={UserName => setUserName(UserName)}
                   placeholder="Name"
                   placeholderTextColor="#9e9e9e"
                   keyboardType="default"
                   value={userName}
                   returnKeyType="next"             
                 />
              </View>
     
              <View style={styles.inputView}>
              
              <TextInput
                style={styles.TextInput}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Email" //dummy@abc.com
                placeholderTextColor="#9c9c9c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                value={userEmail}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>

              <View style={styles.inputView}>
                 <TextInput
                   style={styles.TextInput}
                   onChangeText={UserPhone => setUserPhone(UserPhone)}
                   placeholder="Phone"
                   placeholderTextColor="#9e9e9e"
                   keyboardType="default"
                   value={userPhone}
                 />
              </View>
     
              
               <View style={styles.inputView}>  
                 <TextInput
                   style={styles.TextInput}
                   onChangeText={UserPassword => setUserPassword(UserPassword)}
                   placeholder="Password"
                   placeholderTextColor="#9c9c9c"
                   keyboardType="default"
                   ref={passwordInputRef}
                   onSubmitEditing={Keyboard.dismiss}
                   blurOnSubmit={false}
                   secureTextEntry={true}
                   underlineColorAndroid="#f000"
                   returnKeyType="next"
                   value={userPassword}
                 />     
               </View>
             {errortext != '' ? (
               <Text style={styles.errorTextStyle}> {errortext} </Text>
             ) : null}
               <View>
                <Text>Gender</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                 />
            </View>
            <View style={styles.MainermsConditions}>
              <View style={styles.checkboxContainer}>
                <Text>How did you hear about this? </Text>
                <View style={styles.innercheckbox}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>LinkedIn</Text>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Friends</Text>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Job Portal</Text>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Others</Text>
                </View>
              </View>
            </View>
          
             <View style={styles.btngrp}>
               <TouchableOpacity
                 style={styles.loginBtn}
                 onPress={() => handleSubmitPress()}>
                 <Text style={styles.loginText}>Save</Text>
               </TouchableOpacity>       
             </View>  
             </View> 
           </ScrollView>   
         </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    mainContainer: {  
      flexDirection: 'row',
      height:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: CustomColors.white,
    }, 
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
        width: '100%',
    },
  
    inputView: {
      backgroundColor: CustomColors.white,
      borderRadius: 10,
      width: '90%',
      height: 60,
      marginBottom: 25,
    },
  
    TextInput: {
      height: 40,
      fontSize: 20,
      flex: 1,
      padding: 5,
      borderWidth: 2,
      borderColor: '#e7e7e7',
    },
  
    forgot_button: {
      marginBottom: 0,
      fontSize: 16,
      fontWeight: 'normal',
      height: 25,
      textDecorationLine: 'underline',
    },
    loginText: {
      fontSize: 20,
      fontWeight: 'normal',
      color: 'white',
    },
    btngrp: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '90%',
      height: 60,
      marginBottom: 40,
    },
    MainermsConditions: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      paddingLeft: 20 
    },
    signingMessage: {
      color: '#9c9c9c',
      paddingLeft: 15,
      marginBottom: 40,
      fontSize:16,
      paddingTop:5,
      width: '90%', 
      justifyContent: 'flex-start',
    },
    registerBtn:{
      width: '50%',
      borderRadius: 0,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: CustomColors.black,
      color: 'white',
    },
    loginBtn: {
      width: '50%',
      borderRadius: 0,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: CustomColors.blue,
      color: 'white',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    checkboxContainer: {
      alignItems: "center",
      flexDirection: 'row',
      flexWrap: 'wrap' , 
      padding: 5 ,
      marginBottom: 20
      },
      innercheckbox:{
        flexDirection: 'row',
        padding: 5 ,
      },
      checkbox: {
        alignSelf: 'center',
      },
  });
