import React from "react";
import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

// Asegúrate de que estos archivos existan
import InicioSesion from "./InicioSesion/InicioSesion.jsx";
import Registro from "./Registro/Registro.jsx";
import CrearPerfil from "./CrearPerfil/CrearPerfil.jsx";
import CargarImagen from "./CargarImagen/CargarImagen.jsx";

const Stack = createStackNavigator();

const LoginUsuarioNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "black"
                },
                headerTintColor: 'white',
            }}>
                {/* ✅ CORREGIDO: Usamos InicioSesion en vez de LoginUsuarios */}
                <Stack.Screen
                    name="Principal"
                    component={InicioSesion}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Iniciar sesión"
                    component={InicioSesion}
                />
                <Stack.Screen
                    name="Registrarse"
                    component={Registro}
                />
                <Stack.Screen
                    name="Crear Perfil"
                    component={CrearPerfil}
                />
                <Stack.Screen
                    name="Cargar imagen"
                    component={CargarImagen}
                />
            </Stack.Navigator>
        </View>
    );
}

export default LoginUsuarioNavigator;
