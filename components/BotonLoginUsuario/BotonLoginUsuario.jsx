import { Pressable, Text, View } from "react-native";
import styles from "./BotonLoginUsuario";
import niveles from "../../niveles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";


const BotonLoginUsuario = ({ navigation, paisSeleccionado }) => {
  const test = (niveles) => {
    niveles.map((nivel) => addDoc(collection(db, "niveles"), nivel));
  };

  const test2 = () => {
    alert("funciona");
  };

  // Traducciones simples
  const textos = {
    espana: { registro: "Registrarse", login: "Iniciar sesión" },
    francia: { registro: "S'inscrire", login: "Connexion" },
    alemania: { registro: "Registrieren", login: "Anmelden" },
    italia: { registro: "Registrati", login: "Accedi" },
    paisesBajos: { registro: "Registreren", login: "Inloggen" },
    estadosUnidos: { registro: "Register", login: "Login" },
    portugal: { registro: "Registrar", login: "Entrar" },
  };

  const idioma = textos[paisSeleccionado] || textos.estadosUnidos;

  return (
    <View style={styles.container__botonesRegistro}>
      <Pressable
        onPress={() => navigation.navigate("Registrarse")}
        style={styles.botonRegistroUsuario}
      >
        <Text style={styles.botonText}>{idioma.registro}</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Iniciar sesión")}
        style={styles.botonLoginUsuario}
      >
        <Text style={styles.botonText}>{idioma.login}</Text>
      </Pressable>
    </View>
  );
};

export default BotonLoginUsuario;
