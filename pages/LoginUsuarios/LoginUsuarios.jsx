import React, { useContext } from "react";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./LoginUsuarios.js";
import BotonLoginUsuario from "../../components/BotonLoginUsuario/BotonLoginUsuario.jsx";
import { CartContext } from "../../Context/Context.jsx";

// importamos el mismo login que usas en InicioSesion
import { login } from "../../firebaseConfig.js";

const LoginUsuarios = ({ navigation }) => {
  const { setPaisSeleccionado, setUserOnline, setUsuarioOn } = useContext(CartContext);

  // Login invitado usando la misma función login de firebaseConfig
  const loginInvitado = async () => {
    try {
      await login("invitado1@gmail.com", "123456", setUsuarioOn);
      
      // guardo al invitado en el contexto
      setUserOnline({ email: "invitado@gmail.com" });
      setPaisSeleccionado("espana"); // idioma por defecto

      console.log("✅ Sesión iniciada como invitado");

      // navego a la pantalla principal (ajusta el nombre al que tengas en tu Navigator)
      navigation.replace("Home"); 
    } catch (error) {
      console.error("❌ Error al iniciar sesión como invitado:", error);
      Alert.alert("Error", "No se pudo iniciar sesión como invitado.");
    }
  };

  return (
    <View style={styles.container__loginUsuarios}>
      {/* Logo */}
     

      {/* Texto de bienvenida */}
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Bienvenida/o a FITTLLINE App
        </Text>
        <Text style={{ color: "white", fontSize: 16, textAlign: "center", marginHorizontal: 30 }}>
          Regístrate o accede como invitado para comenzar con los módulos.
        </Text>
      </View>

      {/* Botones */}
      <View style={{ marginTop: 50, gap: 20, width: "80%" }}>
        {/* Botón de login normal */}
        <BotonLoginUsuario navigation={navigation} />

        {/* Botón para entrar como invitado */}
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            paddingVertical: 15,
            borderRadius: 8,
          }}
          onPress={loginInvitado}
        >
          <Text style={{ color: "black", fontSize: 16, textAlign: "center" }}>
            Entrar como invitado
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginUsuarios;
