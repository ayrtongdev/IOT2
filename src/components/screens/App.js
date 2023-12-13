// App.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Maçã',
      description: 'Esta é uma maçã fresca e deliciosa.',
      image: 'https://static.vecteezy.com/system/resources/previews/017/340/392/original/basket-of-red-apples-png.png', // Substitua pelo URL real da imagem
    },
    {
      id: 2,
      name: 'Picanha',
      description: 'Picanha de alta qualidade.',
      image: 'https://storage.googleapis.com/phygital_files/figurasupermercado/uploads/produto/picanha_bov_trad_verdi_kg_a5e625e9-1fa3-4c71-858f-3827194f8b59.png', // Substitua pelo URL real da imagem
    },
    {
      id: 3,
      name: 'Gorgonzola',
      description: 'Queijo gorgonzola cremoso.',
      image: 'https://www.scala.com.br/wp-content/themes/scala/assets/images/gorgonzola.png', // Substitua pelo URL real da imagem
    },
  ]);

  const removeFromFavorites = (itemId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicione aos Favoritos</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromFavorites(item.id)}
          >
            <Text style={styles.buttonText}>Remover dos Favoritos</Text>
          </TouchableOpacity>
          
        </View>
      ))}
      <CilindricalMenu navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop:50,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
