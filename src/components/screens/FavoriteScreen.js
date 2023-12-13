import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CilindricalMenu from '../../components/menu/CilindricalMenu';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://192.168.137.1:3000/users/favorites', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {favorites.map((product) => (
          <View key={product._id} style={styles.productContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>R$ {product.price}</Text>
          </View>
        ))}
      </ScrollView>
      <CilindricalMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#0BB3D9',
    fontWeight: 'bold',
  },
});

export default FavoriteScreen;