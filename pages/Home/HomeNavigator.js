import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home.jsx';
import DetalleCalientamiento from './DetalleCalentamiento/DetalleCalentamiento.jsx';
import { RFValue } from 'react-native-responsive-fontsize';
import DetalleNivelVideo from './DetalleNivel/DetalleNivelVideo/DetalleNivelVideo.jsx';
import { Text, View } from 'react-native';
import DetalleNivelNiveles from './DetalleNivelNiveles/DetalleNivelNiveles.jsx';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#D4AF37",
          height: RFValue(110),
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: RFValue(25),
          fontFamily: 'NunitoSans_400Regular',
          letterSpacing: 2,
          color: "white",
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {/* OJO: DetalleNivel se elimina del stack como pediste */}
      <Stack.Screen name="DetalleCalentamiento" component={DetalleCalientamiento} options={{ title: 'Primeros pasos' }} />
      <Stack.Screen name="DetalleNivelVideo" component={DetalleNivelVideo} options={{ title: 'Detalle nivel video' }} />
      <Stack.Screen name="DetalleNivelNiveles" component={DetalleNivelNiveles} options={{ title: 'Este es el detalle nivel niveles' }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
