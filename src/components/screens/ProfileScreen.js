import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CilindricalMenu from '../menu/CilindricalMenu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProfileScreen = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('Nome Fictício');
  const [email, setEmail] = useState('email@ficticio.com');
  const [phone, setPhone] = useState('(11) 11111-1111');
  const [address, setAddress] = useState('Endereço Fictício');

  const navigateToChatbot = () => {
    navigation.navigate('Chatbot');
  };

  const handleSave = () => {
    // Save the data
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
        />
        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Concluir</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.faleButton} onPress={navigateToChatbot}>
        <View style={styles.buttonContent}>
          <Icon name="headset-outline" size={24} color="#ffffff" />
        </View>
      </TouchableOpacity>

      <CilindricalMenu navigation={navigation} />
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#88A649',
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  iconContainer: {
    marginLeft: 10,
  },
  faleButton: {
    position: 'absolute',
    bottom: 620,
    backgroundColor: '#0BB3D9',
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    right: 20
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
