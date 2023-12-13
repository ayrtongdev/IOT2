import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Maçã', price: 19.99, quantity: 1, image: 'https://static.vecteezy.com/system/resources/previews/017/340/392/original/basket-of-red-apples-png.png', details: 'Esta é uma maçã fresca e deliciosa.', quantityToRemove: 0 },
    { id: '2', name: 'Picanha', price: 29.99, quantity: 2, image: 'https://storage.googleapis.com/phygital_files/figurasupermercado/uploads/produto/picanha_bov_trad_verdi_kg_a5e625e9-1fa3-4c71-858f-3827194f8b59.png', details: 'Picanha de alta qualidade.', quantityToRemove: 0 },
    { id: '3', name: 'Queijo Gorgonzola', price: 29.99, quantity: 2, image: 'https://www.scala.com.br/wp-content/themes/scala/assets/images/gorgonzola.png', details: 'Queijo gorgonzola cremoso.', quantityToRemove: 0 },
    { id: '4', name: 'Melancia', price: 29.99, quantity: 2, image: 'https://www.frutacc.com.br/public/imagemSite/melancia_1.png', details: 'Melancia fresca e suculenta.', quantityToRemove: 0 },
    // Adicione seus itens com URLs das imagens e detalhes
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal());
    setCartTotal(getCartTotal());
  }, [cartItems]);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = (selectedItem, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    setTotal(getTotal());
    setCartTotal(getCartTotal());
    setSelectedItem(null);
  };

  const incrementQuantityToRemove = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantityToRemove: item.quantityToRemove + 1,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const removeItems = (itemId, count) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity - count,
          quantityToRemove: 0,
        };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCartItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQtd}>Qtd: {item.quantity}</Text>
        <Text style={styles.itemPrice}>${item.price} / unidade</Text>
        <TouchableOpacity onPress={() => setSelectedItem(item)}>
          <Image source={{ uri: 'https://static-00.iconduck.com/assets.00/arrow-right-circle-icon-512x512-2p1e2aaw.png' }} style={styles.itemDetailsButton} />
        </TouchableOpacity>
        <View style={styles.itemActions}>
          <View style={styles.quantityButtons}>
            <Button title="-" onPress={() => incrementQuantityToRemove(item.id)} />
            <Text style={styles.quantityValue}>{item.quantityToRemove}</Text>
            <Button title="+" onPress={() => incrementQuantityToRemove(item.id)} />
          </View>
          <TouchableOpacity onPress={() => removeItems(item.id, item.quantityToRemove)}>
            <View style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remover</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <Text style={styles.totalText}>Total de itens: {cartTotal}</Text>
        <TouchableOpacity onPress={() => alert('Compra finalizada!')}>
            <View style={styles.finalyButton}>
              <Text style={styles.ButtonText}>Finalizar Compra</Text>
            </View>
          </TouchableOpacity>
      </View>

      {/* Modal para detalhes do produto */}
      <Modal visible={selectedItem !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
          <Image source={{ uri: selectedItem?.image }} style={styles.modalImage} />
          <Text style={styles.modalPrice}>Valor por unidade: ${selectedItem?.price}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText} onPress={() => setTotal(getTotal())}>Quantidade:</Text>
            <View style={styles.quantityButtons}>
              <Button title="-" onPress={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)} />
              <Text style={styles.quantityValue}>{quantity}</Text>
              <Button title="+" onPress={() => setQuantity(quantity + 1)} />
            </View>
          </View>
          <Button title="Adicionar ao Carrinho" onPress={() => handleAddToCart(selectedItem, quantity)} />
          <Button title="Fechar" onPress={() => setSelectedItem(null)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe6e6',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginTop: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 15,
    marginBottom: 25,
  },
  itemDetails: {
    flex: 1,
    marginTop: 25,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemQtd: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  itemDetailsButton: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop: -15,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginLeft: 20,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finalyButton: {
    backgroundColor: '#11c2bf',
    padding: 8,
    borderRadius: 5,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default CartScreen;
