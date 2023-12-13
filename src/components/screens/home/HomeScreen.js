import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import CilindricalMenu from '../../menu/CilindricalMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';


const fetchProducts = async (category) => {
  try {
    const response = await fetch(`http://192.168.137.1:3000/products/?category=${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
    return [];
  }
};


const HomeScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState({});
  const [products, setProducts] = useState(null);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);


  const handleFavoritePress = async (productId) => {
    let isFavorite = favorites[productId];
    setFavorites({ ...favorites, [productId]: !isFavorite });
    isFavorite = !favorites[productId];
    try {
      // obtenha o token do armazenamento local
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken);
      console.log(productId);
  
      const response = await fetch(`http://192.168.137.1:3000/users/favorites/${productId}`, {
        method: isFavorite ? 'PUT' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({productId, isFavorite}),
      });
      if (!response.ok) {
        throw new Error('Falha ao atualizar o estado de favorito');
      }
      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Erro ao atualizar o estado de favorito:', error);
    }
  };



  useEffect(() => {
    const fetchProductsAndSetState = async () => {
      const popularProducts = await fetchProducts('popular');
      const forYouProducts = await fetchProducts('para você');
      setProducts({ popularProducts, forYouProducts });
    };

    fetchProductsAndSetState();
  }, []);

  if (!products) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>

      <View style={styles.cylindricalContainer}>

        <View style={styles.menuButtonContainer}>

          <TouchableOpacity style={styles.menuCircle} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../../../../assets/ftperfil.png')} style={styles.userIcon} />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.greetingText}>Olá, Ayrton!</Text>
            <Text style={styles.exploreText}>Encontre tudo o que precisa aqui.</Text>
          </View>

        </View>

        <View style={styles.menuButtonContainer}>

          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Cart')} >
            <Image source={require('../../../../assets/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>

        </View>

      </View>

      <Text style={styles.headerText}>Populares</Text>

      <View style={styles.Box1}>
        <TouchableOpacity
          style={styles.iconButton1}
          onPress={() => handleFavoritePress(products.popularProducts[0]._id)}
        >
          <Image
            source={favorites[products.popularProducts[0]._id] ? require('../../../../assets/love.png') : require('../../../../assets/love1.png')}
            style={styles.icon}
          />
        </TouchableOpacity>


        <Text style={styles.name}>{products.popularProducts[0].name}</Text>
        <Text style={styles.description}>{products.popularProducts[0].description}</Text>
        <Text style={styles.price}>R$ {products.popularProducts[0].price}</Text>
        <Image source={{ uri: products.popularProducts[0].imageUrl }} style={styles.productImage} />

        <TouchableOpacity style={styles.customButton1}>
          <Image source={require('../../../../assets/add.png')} style={styles.buttonIcon1} />
        </TouchableOpacity>

      </View>

      <View style={styles.Box2}>

      <TouchableOpacity
          style={styles.iconButton1}
          onPress={() => handleFavoritePress(products.popularProducts[1]._id)}
        >
          <Image
            source={favorites[products.popularProducts[1]._id] ? require('../../../../assets/love.png') : require('../../../../assets/love1.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.name}>{products.popularProducts[1].name}</Text>
        <Text style={styles.description}>{products.popularProducts[1].description}</Text>
        <Text style={styles.price}>R$ {products.popularProducts[1].price}</Text>
        <Image source={{ uri: products.popularProducts[1].imageUrl }} style={styles.productImage1} />

        <TouchableOpacity style={styles.customButton1}>
          <Image source={require('../../../../assets/add.png')} style={styles.buttonIcon1} />
        </TouchableOpacity>

      </View>

      <Text style={styles.suggestionText}>Para você</Text>

      <View style={styles.Box3}>

      <TouchableOpacity
          style={styles.iconButton1}
          onPress={() => handleFavoritePress(products.forYouProducts[0]._id)}
        >
          <Image
            source={favorites[products.forYouProducts[0]._id] ? require('../../../../assets/love.png') : require('../../../../assets/love1.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        
        <Text style={styles.nameBox3}>{products.forYouProducts[0].name}</Text>
        <Text style={styles.descriptionBox3}>{products.forYouProducts[0].description}</Text>
        <Text style={styles.priceBox3}>R$ {products.forYouProducts[0].price}</Text>
        <Image source={{ uri: products.forYouProducts[0].imageUrl }} style={styles.productImage2} />

        <TouchableOpacity style={styles.customButton}>
          <Image source={require('../../../../assets/add.png')} style={styles.buttonIcon} />
        </TouchableOpacity>

      </View>

      <CilindricalMenu navigation={navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  Box1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 180,
    left: 20,
    position: 'absolute',
    top: 180,
    width: 150,
  },
  Box2: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 180,
    left: 190,
    position: 'absolute',
    top: 180,
    width: 150,
  },
  Box3: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 160,
    left: 20,
    position: 'absolute',
    top: 460,
    width: 320,
  },
  boxIcon: {
    height: 30,
    marginLeft: 110,
    marginTop: 20,
    width: 30,
  },
  boxText: {
    bottom: 80,
    left: 10,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    flex: 1,
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: '#0BB3D9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  customButton1: {
    backgroundColor: '#0BB3D9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  buttonIcon1: {
    width: 20,
    height: 20,
  },
  cylindricalContainer: {
    alignItems: 'center',
    backgroundColor: '#0BB3D9',
    borderRadius: 30,
    elevation: 5,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    left: 20,
    overflow: 'hidden',
    paddingHorizontal: 5,
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    top: 40,
  },
  description: {
    color: 'lightgray',
    fontSize: 12,
    marginTop: 0,
    marginLeft: 15,
  },
  descriptionBox3: {
    color: 'lightgray',
    fontSize: 14,
    marginLeft: 140,
    marginTop: 5
  },
  exploreText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 20,
    position: 'absolute',
    top: 130,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10, // ajuste conforme necessário
  },
  iconButton1: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10, // ajuste conforme necessário
  },
  icon: {
    width: 30, // ajuste conforme necessário
    height: 30,
  },
  menuButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 15,
  },
  menuCircle: {
    alignItems: 'center',
    backgroundColor: '#0BB3D9',
    borderColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 2,
    height: 52,
    justifyContent: 'center',
    padding: 8,
    width: 52,
  },
  menuIcon: {
    height: 28,
    width: 28,
  },
  name: {
    color: '#0D0D0D',
    fontSize: 16, // adjust as needed
    fontWeight: 'bold',
    marginTop: 110, // ajuste conforme necessário
    marginLeft: 15,  // adjust as needed
  },
  nameBox3: {
    color: '#0D0D0D',
    fontSize: 18, // adjust as needed
    fontWeight: 'bold',
    marginLeft: 140,
    marginTop: 40 // adjust as needed
  },
  price: {
    color: '#0BB3D9',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 3, // ajuste conforme necessário
    marginLeft: 15,
  },
  priceBox3: {
    color: '#0BB3D9',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 140,
    marginTop: 15
  },
  progressBar: {
    bottom: 20,
    height: 10,
    left: 10,
    position: 'absolute',
    width: '80%',
  },
  productImage: {
    height: 100,
    resizeMode: 'contain',
    width: 100,
    marginLeft: 25,
    marginTop: -153,
  },
  productImage1: {
    height: 100,
    resizeMode: 'contain',
    width: 100,
    marginLeft: 20,
    marginTop: -153,
  },
  productImage2: {
    height: 105,
    resizeMode: 'contain',
    width: 105,
    marginLeft: 20,
    marginTop: -95
  },
  suggestionText: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 20,
    position: 'absolute',
    top: 400,
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },

  userIcon: {
    height: 62,
    width: 62,
  },
});

export default HomeScreen;
