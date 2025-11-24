import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './pages/Home/HomeNavigator.js';
import Perfil from './pages/Perfil/Perfil.jsx';
import AppLoading from 'expo-app-loading';
import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import LoginUsuarioNavigator from './pages/LoginUsuarios/LoginUsuariosNavigator.js';
import GlobalContext, { CartContext } from './Context/Context.jsx';
import FlashMessage from 'react-native-flash-message';
import { RFValue } from 'react-native-responsive-fontsize';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import Lenguaje from './pages/Lenguaje/Lenguaje.jsx';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const { idiomaActual } = useContext(CartContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white' }, // barra superior dorada
        headerTintColor: 'black',
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        drawerLabelStyle: { fontSize: RFValue(14), fontFamily: 'Roboto_400Regular' },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeNavigator}
        options={{
          drawerLabel:
            idiomaActual === 'espana' ? 'Ejercicios' :
            idiomaActual === 'italia' ? 'Esercizi' :
            idiomaActual === 'francia' ? 'Exercices' :
            idiomaActual === 'bandera' ? 'Übungen' :
            idiomaActual === 'paisesBajos' ? 'Oefeningen' :
            idiomaActual === 'inglaterra' || idiomaActual === 'estadosUnidos' ? 'Exercises' :
            idiomaActual === 'portugal' ? 'Exercícios' : 'Ejercicios',
          drawerIcon: ({ color }) => <AntDesign name="playcircleo" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Idioma"
        component={Lenguaje}
        options={{
          drawerLabel:
            idiomaActual === 'espana' ? 'Lenguaje' :
            idiomaActual === 'italia' ? 'Linguaggio' :
            idiomaActual === 'francia' ? 'Langage' :
            idiomaActual === 'bandera' ? 'Sprache' :
            idiomaActual === 'paisesBajos' ? 'Taal' :
            idiomaActual === 'inglaterra' || idiomaActual === 'estadosUnidos' ? 'Language' :
            idiomaActual === 'portugal' ? 'Linguagem' : 'Lenguaje',
          drawerIcon: ({ color }) => <Ionicons name="language" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Cuenta"
        component={Perfil}
        options={{
          drawerLabel:
            idiomaActual === 'espana' ? 'Cuenta' :
            idiomaActual === 'italia' ? 'Account' :
            idiomaActual === 'francia' ? 'Compte' :
            idiomaActual === 'bandera' ? 'Konto' :
            idiomaActual === 'paisesBajos' ? 'Account' :
            idiomaActual === 'inglaterra' || idiomaActual === 'estadosUnidos' ? 'Account' :
            idiomaActual === 'portugal' ? 'Conta' : 'Cuenta',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function MainComponent() {
  const { usuarioOn } = useContext(CartContext);
  return usuarioOn ? <MyDrawer /> : <LoginUsuarioNavigator />;
}

export default function App() {
  let [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GlobalContext>
      <NavigationContainer>
        <MainComponent />
        <FlashMessage position="center" />
      </NavigationContainer>
    </GlobalContext>
  );
}
