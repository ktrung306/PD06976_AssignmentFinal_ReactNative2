import React, { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhoneNumber,
  isValidRePassword,
} from '../../constants/validation';
import CryptoJS from 'crypto-js';
import { darkGreen } from '../../constants/color';

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorRePassword, setErrorRePassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const handleTextPressRegister = () => {
    console.log('Sign In');
    navigation.navigate('LoginScreen');
  };

  const checkEmailExists = async () => {
    try {
      let url_check_login = 'http://192.168.1.6:3000/users?email=' + email;
      const response = await fetch(url_check_login);
      const data = await response.json();
      console.log(data.length);
      if (data.length === 0) {
        setIsEmailExists(true);
      } else {
        setIsEmailExists(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    if (isValidEmail(email)) {
      try {
        await checkEmailExists();
        // Kiểm tra isEmailExists và hiển thị thông báo tương ứng
        if (!isEmailExists) {
          Alert.alert('Email already exists! Please enter another email ');
          return;
        } else {
          const hashedPassword = CryptoJS.SHA256(password).toString();
          // console.log('Register success:', data);
          navigation.navigate('Login');
          const apiUrl = 'http://192.168.1.6:3000/users';
          await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              phone,
              hashedPassword,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Register success:', data);
              navigation.navigate('LoginScreen');
            })
            .catch(error => {
              console.error('Register error:', error);
            });
        }
      } catch (error) {
        console.error('Check email error:', error);
      }
    } else {
      console.log('Invalid email');
    }
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
            Đăng ký
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: -25,
            }}>
            Tạo tài khoản
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#828282"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={text => {
                setErrorName(
                  isValidName(text) == true
                    ? ''
                    : 'The name cannot contain numbers and at least 3 characters',
                );
                setName(text);
              }}
              style={styles.textInput}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorName}
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#828282"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={text => {
                setErrorEmail(
                  isValidEmail(text) == true
                    ? ''
                    : 'Email not in correct format',
                );
                setEmail(text);
              }}
              style={styles.textInput}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorEmail}
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#828282"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={text => {
                setErrorPhone(
                  isValidPhoneNumber(text) == true
                    ? ''
                    : 'The phone number is not in the correct format',
                );
                setPhone(text);
              }}
              style={styles.textInput}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorPhone}
            </Text>
          </View>
          <View style={styles.passWordInput}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#828282"
              secureTextEntry={!showPassword}
              style={styles.textInput}
              value={password}
              onChangeText={text => {
                setErrorPassword(
                  isValidPassword(text) == true
                    ? ''
                    : 'Passwords do not contain spaces and are 8 to 10 characters long',
                );
                setPassword(text);
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorPassword}
            </Text>
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 45,
                top: 21,
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
          <View style={styles.passWordInput}>
            <TextInput
              placeholder="Re-type password"
              placeholderTextColor="#828282"
              secureTextEntry={!showRePassword}
              style={styles.textInput}
              value={rePassword}
              onChangeText={text => {
                setErrorRePassword(
                  isValidRePassword(text, password) == true
                    ? ''
                    : 'Repassword is not the same as password',
                );
                setRePassword(text);
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorRePassword}
            </Text>
            <TouchableOpacity
              onPress={toggleRePasswordVisibility}
              style={{
                position: 'absolute',
                right: 45,
                top: 21,
              }}>
              <Image
                source={
                  showRePassword
                    ? require('../../../assets/images/eye.png')
                    : require('../../../assets/images/eyeClose.png')
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16, 
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Tôi đã có tài khoản
            </Text>
          </View>
          <View style={{ marginStart: 5, marginBottom: 10 }}>
            <TouchableOpacity onPress={handleTextPressRegister}>
              <Text
                style={{
                  color: darkGreen, 
                  fontWeight: 'bold', 
                  fontSize: 16
                }}>
                Login
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
  },
  image: {
    width: 400, 
    height: 350, 
    marginTop: -160
  },
  inputsContainer: {
    paddingStart: 30,
    marginTop: 25,
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
    color: '#828282',
    paddingStart: 25,
    marginEnd: 30,
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: darkGreen,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 16,
    color: 'white',
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

export default RegisterScreen;
