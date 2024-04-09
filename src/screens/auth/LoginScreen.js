import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import CryptoJS from 'crypto-js';
import { darkGreen } from '../../constants/color';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTextPressRegister = () => {
    console.log('RegisterScreen');
    navigation.navigate('RegisterScreen');
  };

  const handleSubmit = async () => {
    // Alert.alert('Sai roiii');

    if (email.length == 0) {
      Alert.alert('No email has been entered');
      return;
    }
    if (password.length == 0) {
      Alert.alert('No password has been entered');
      return;
    }
    const hashedPassword = CryptoJS.SHA256(password).toString();
    // navigation.navigate('MainContainer');
    //192.168.1.102
    let url_check_login = 'http://192.168.1.6:3000/users?email=' + email;
    fetch(url_check_login)
      .then(res => res.json())
      .then(async res_login => {
        console.log(res_login.length);
        if (res_login.length != 1) {
          Alert.alert('Account does not exist. Please register');
          return;
        } else {
          let objU = res_login[0];
          if (objU.hashedPassword != hashedPassword) {
            Alert.alert('Not correct password!');
            return;
          } else {
            navigation.navigate('MainContainer');
            dispatch(setUser(objU));
          }
        }
      });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <StatusBar
          backgroundColor={'#0C0F14'}
          barStyle="light-content"></StatusBar>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/splash.png')}></Image>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 40, 
              color: darkGreen, 
              fontWeight: 'bold'
            }}>
            Chào mừng bạn
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
            }}>
            Đăng nhập tài khoản
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.emailInput}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#828282"
              secureTextEntry={true}
              inputMode="email"
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
            />
          </View>
          <View style={styles.passWordInput}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#828282"
              secureTextEntry={!showPassword}
              style={styles.textInput}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 45,
                top: 19,
              }}>
              <Image
                source={
                  showPassword
                    ? require('../../../assets/images/eye.png')
                    : require('../../../assets/images/eyeClose.png')
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.signInWithGGButton}
            onPress={handleSubmit}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 25,
              }}>
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.signInWithGGButtonText}>
                Sign in with Google
              </Text>
              <View></View>
            </View>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16, 
                fontWeight:"bold" 
              }}>
              Bạn không có tài khoản?
            </Text>
          </View>
          <View style={{ marginStart: 5 }}>
            <TouchableOpacity onPress={handleTextPressRegister}>
              <Text
                style={{
                  color: darkGreen, 
                  fontWeight: 'bold', 
                  fontSize: 16 
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: { 
    alignItems: 'center',
    width: 390,
  },
  image: { 
    width: 400, 
    height: 350,
    marginTop: -100
  },
  inputsContainer: {
    paddingStart: 30,
    marginTop: 25,
  },
  emailInput: {

  },
  passWordInput: {
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: '#828282',
  },
  textInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#252A32',
    marginBottom: 0,
    height: 48,
    color: 'black',
    paddingStart: 25,
    marginEnd: 30,
    marginTop: 5,
  },
  signInButton: {
    backgroundColor: darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 40,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
  },
  signInWithGGButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 5,
  },
  signInWithGGButtonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular.ttf',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
  },
  googleIcon: {
    width: 15,
    height: 15,
  },
});

export default LoginScreen;
