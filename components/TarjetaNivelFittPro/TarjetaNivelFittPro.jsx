// TarjetaNivelFittPro.jsx
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useContext } from "react";
import { CartContext } from "../../Context/Context.jsx";
import styles from "./TarjetaNivelFittPro.js";

const TarjetaNivelFittPro = ({ data, nivel, tiempo, navigation, nivelNombre, rutaNivel }) => {
  const { closed, idiomaActual } = useContext(CartContext);

  const traduccionesNivel = {
    espana: "Nivel",
    italia: "Livello",
    francia: "Niveau",
    bandera: "Stufe",
    inglaterra: "Level",
    estadosUnidos: "Level",
    paisesBajos: "Niveau",
    portugal: "Nível",
  };

  const palabraNivel = traduccionesNivel[idiomaActual] || "Nivel";

  const match = nivelNombre.match(/^([a-zA-Z]+)(\d+)$/);
  const numero = match ? match[2] : "";
  const nivelNombreTraducido = `${palabraNivel} ${numero}`;

  return (
    <ImageBackground
      source={{
        uri: data.data.imagenTarjetaNivel
      }}
      style={styles.fondoImagen}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.overlay} />

      <Pressable
        onPress={() =>
          navigation.navigate("DetalleNivelNiveles", {
            rutaNivel,
            data,
            nivelNombre,
          })
        }
        style={styles.container__tarjetaNivel}
      >
        <View style={styles.centroTexto}>
          <Text style={styles.text}>
            {nivelNombreTraducido}
          </Text>
        </View>
      </Pressable>
    </ImageBackground>
  );
};

export default TarjetaNivelFittPro;
