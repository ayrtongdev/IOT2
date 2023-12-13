import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleTextBold}>Aproveite as melhores ofertas!</Text>
        <Text style={styles.titleTextNormal}>Produtos frescos e do dia.</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('assets/fundo_welcome_screen.png')} style={styles.backgroundImage} />
      </View>

      <View style={styles.contentContainer}>


        <TouchableOpacity style={[styles.button, { backgroundColor: '#487CC2', marginBottom: 27 }]} onPress={() => navigation.navigate('Signup')}>
          <View style={styles.textContainer}>
            <Text style={[styles.buttonText, { textAlign: 'center' }]}>Começar</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity

          style={[styles.button, { backgroundColor: '#737373', marginBottom: 27 }]}
          onPress={() => navigation.navigate('Home')}
        >

          <View style={styles.textContainer}>
            <Text style={[styles.buttonText, { textAlign: 'center' }]}>
              Botão teste
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#FFF" />
          </View>

        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundContainer: { 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#F2F2F2' 
  },

  titleContainer: {
    alignItems: 'flex-start', 
    paddingHorizontal: 20, 
    marginTop: 80, 
  },

  titleTextBold: {
    color: '#0D0D0D',
    fontSize: 20,
    fontWeight: 'bold',
  },

  titleTextNormal: {
    color: '#0D0D0D',
    fontSize: 16,
    marginTop: 10, 
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    flex: 1,
  },

  backgroundImage: {
    width: '150%',
    height: '160%',
    resizeMode: 'contain'
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10
  },

  button: {
    marginTop: 0,
    paddingVertical: 15,
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonText: {
    color: '#F4FFE5',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 35
  },
  
  iconContainer: { marginLeft: 10 },

  textContainer: { flex: 1, alignItems: 'center', },
});

export default WelcomeScreen;
