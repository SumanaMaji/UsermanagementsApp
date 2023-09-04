import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Text, Button, Image, Modal, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectEmail, selectUserName, setSignOut } from '../redux/slices/authSlice';
import Card from '../Components/Card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Urls from '../constants/ConstantVariables/Urls';

import {Picker} from '@react-native-picker/picker';

const DashboardScreen = ({navigation}, props) => {
  console.log("prrops--"+JSON.stringify(props));
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter] = useState('');
    
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    useEffect(() => {
        fetchUserList();
        console.log('data')
      }, []);

    const fetchUserList = async () => {
        console.log('data22')
        setLoading(true);
        setError(null);
      
        try {
          const response = await fetch(Urls.userList, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        const data = await response.json();
        setUserData(data.data);
         console.log("userListData----"+JSON.stringify(userData));
        } catch (error) {
          setError(error);
        } finally {
            setLoading(false);
        }
      };
  const searchFilter = () => {
    setModalVisible(true)
  }
  const deleteUsers = usersId => {
    console.log("delete");
    Alert.alert('Are your sure?', 'You want to delete this User?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          fetch(Urls.userList + '/' + usersId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(data => {
               console.log('Success:', data);
              // setLoading(false);
            
              setLoading(false);
              fetchUserList();
            })
            .catch(error => {
              console.error('Error:', error);
            });
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };
  const updateUsers = usersId => {
 
    navigation.navigate('AccountScreen', {usersId:usersId})

    // let record = userLists.filter(d => {
    //   return d.Id == usersId;
    // });
    // setEditUserId(usersId);
    // setFormData({
    //   name: record[0].name,
    //   phone: JSON.stringify(record[0].phone),
    //   email: record[0].email,
    //   // password: record[0].Password,
    //   // confirmPassword: record[0].Password,
    // });
    // fetchUserList();
  };
    return (
        <>
        <SafeAreaView style={styles.container}>
        <ScrollView>
       
        <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text>
                Wellcome to Dashboard, {username}
            </Text>
            <View style={styles.searchBox}>
              <View style={styles.inputDropdown}>
                  <Picker
                    //selectedValue={formaData.role}
                    // onValueChange={itemValue => {
                    //   setFormData({...formaData, role: itemValue});
                    // }}
                    >
                    <Picker.Item label="Filter" />
                    <Picker.Item label="A-Z" value="AZ" />
                    <Picker.Item label="Z-A" value="ZA" />
                    <Picker.Item label="Last modified" value="LM" />
                    <Picker.Item label="Last Inserted" value="LI" />
                  </Picker>
                </View>
             <TouchableOpacity
                     onPress={() => searchFilter()}>
                     <MaterialIcons name="filter-alt" size={30} color="#841584" />
                   </TouchableOpacity>
            </View>
            {/* <Button onPress={() => navigation.navigate('AccountScreen')} title="Add New User" /> */}
            {userData.length > 0 ? (
            userData.map((userListData) => (
                 <Card style={styles.divcard} key={userListData._id}>
                 <View style={styles.divcardname}>
                   <Text style={styles.sectionTitle}>Name: {userListData.name} </Text>
                   <Text style={styles.sectionTitle}>
                     UserName:{userListData.name}
                   </Text>
                   <Text style={styles.sectionTitle}>
                     Mobile No:{userListData.phone}
                   </Text>
                   <Text style={styles.sectionTitle}>Email:{userListData.email} </Text>
                 </View>
                 <View style={styles.divcardbtn}>
                   <TouchableOpacity
                      onPress={() => updateUsers(userListData._id)}
                    >
                     <MaterialIcons name="edit" size={30} color="#841584" />
                   </TouchableOpacity>
       
                   <TouchableOpacity
                      onPress={() => deleteUsers(userListData._id)}
                     >
                     <MaterialIcons name="delete" size={30} color="red" />
                   </TouchableOpacity>
                 </View>
               </Card>
            ))) : <Text>'No Data Found'</Text>}
        <TouchableOpacity
          activeOpacity={0.7}
          //onPress={clickHandler}
          onPress={() => navigation.navigate('AccountScreen')}
          style={styles.touchableOpacityStyle}>
          <Image
            // FAB using TouchableOpacity with an image
            // For online image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            // For local image
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'red', paddingHorizontal: 50, paddingVertical: 15, margin: 10 }}
                onPress={() => dispatch(setSignOut())}
            >
                <Text style={{ color: 'white' }}>Sign out</Text>
            </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
    </SafeAreaView>
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      style={{ flex: 1 }}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 20, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 26 }}>Filtering</Text>
        </View>
            <Button title="Apply" onPress={() => {
          setModalVisible(!modalVisible)
        }} />
        <Button title="Clear" onPress={() => {
          setModalVisible(!modalVisible)
         
        }} />
      </SafeAreaView>
    </Modal>
  </>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 8,
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
      },
      textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
      },
      touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 20,
      },
      searchBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      inputDropdown :{
        width: 300,
        height: 55,
        marginLeft: 10,
        padding: 0,
        color: 'black',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 18,
        fontWeight: '900',
      },
      floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign:'left',
      },
      card: {
        height: 200,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flexDirection: 'row',
      },
      divcard: {flexDirection: 'row', padding: 10, width: '100%', margin: 2},
      divcardname: {flex: 1},
      editbtn: {marginTop: 5, backgroundColor: '#ccc'},
    });
    