import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';


const CilindricalMenu = ({ navigation }) => {
  const currentRoute = useNavigationState((state) => state.routes[state.index].name);

  const createAnimatedStyle = (routeName) => {
    const isActive = currentRoute === routeName;
    const scale = isActive ? 1 : 0.7;
    const borderWidth = isActive ? 2 : 0;

    return useAnimatedStyle(() => ({
      transform: [{ scale: withTiming(scale, { duration: 200 }) }],
      borderWidth: withTiming(borderWidth, { duration: 200 }),
    }));
  };

  return (

    <View style={styles.menuContainer}>

      <Animated.View style={[styles.iconCircle, createAnimatedStyle('Home'), styles.glassEffect]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={currentRoute === 'Home' ? require('../../../assets/house.png') : require('../../../assets/house1.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.iconCircle, createAnimatedStyle('Favorite'), styles.glassEffect]}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
          <Image
            source={currentRoute === 'Planta' ? require('../../../assets/plant.png') : require('../../../assets/plant1.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.iconCircle, createAnimatedStyle('Voucher'), styles.glassEffect]}>
        <TouchableOpacity onPress={() => navigation.navigate('Voucher')}>
          <Image
            source={currentRoute === 'Calendario' ? require('../../../assets/news.png') : require('../../../assets/news1.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.iconCircle, createAnimatedStyle('Profile'), styles.glassEffect]}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={currentRoute === 'Terra' ? require('../../../assets/map.png') : require('../../../assets/map1.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  
  glassEffect: {
    backgroundColor: '#0BB3D9',
    overflow: 'hidden',
    borderRadius: 50,
    padding: 10,
  },


  iconCircle: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#FF6961',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 15,
    borderColor: '#F2F2F2',
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0BB3D9',
    borderRadius: 50,
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },


});

export default CilindricalMenu;