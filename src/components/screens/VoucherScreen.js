import React from 'react';
import { View, StyleSheet } from 'react-native';
import CilindricalMenu from '../menu/CilindricalMenu';

const VoucherScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
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
 
});

export default VoucherScreen;
