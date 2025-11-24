// TarjetaNivel.jsx
import { ImageBackground, Pressable, Text, View } from "react-native";
import styles from "../TarjetaNivel/TarjetaNivel.js";
import { useContext, useMemo } from "react";
import { CartContext } from "../../Context/Context.jsx";

const TarjetaNivel = ({ data, nivel, tiempo, navigation }) => {
  const { idiomaActual } = useContext(CartContext);

  // Diccionario para los nombres por idioma
  const clavesNombre = {
    espana: "nombre",
    italia: "nombreItalia",
    francia: "nombreFrancia",
    bandera: "nombreAlemania",
    estadosUnidos: "nombreInglaterra",
    inglaterra: "nombreInglaterra",
    paisesBajos: "nombrePaisesBajos",
    portugal: "nombrePortugal",
  };

  // Clave del nombre según idiomaActual, con fallback a "nombre"
  const claveNombre = clavesNombre[idiomaActual] || "nombre";
  const rutaNivel = nivel?.[claveNombre] || nivel?.nombre || "";

  // Calcular nivelNombre inicial (ej. "nivel1") según el primer key ordenado por número
  const nivelNombreInicial = useMemo(() => {
    const ejercicios = data?.data?.ejercicios || {};
    const keys = Object.keys(ejercicios);
    if (!keys.length) return null;
    const ordenadas = keys.sort((a, b) => {
      const numA = parseInt(String(a).replace(/^\D+/g, "")) || 0;
      const numB = parseInt(String(b).replace(/^\D+/g, "")) || 0;
      return numA - numB;
    });
    return ordenadas[0] || null;
  }, [data]);

  return (
    <ImageBackground
      source={{
        uri:
          nivel?.imagen ||
          "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747219924/4125b593-3b1a-446b-b222-6d9dd6945592_lymwxp.png",
      }}
      style={styles.fondoImagen}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
      <View style={styles.overlay} />

      <Pressable
        onPress={() =>
          navigation.navigate("DetalleNivelNiveles", {
            rutaNivel,
            data,          // objeto { id, data }
            nivel,         // el payload interno data.data
            tiempo,        // tiempo total si lo necesitas allí
            nivelNombre: nivelNombreInicial, // primer subnivel si existe
          })
        }
        style={styles.container__tarjetaNivel}
      >
        <View style={styles.centroTexto}>
          <Text style={styles.text}>{rutaNivel}</Text>
        </View>

        <View style={styles.tarjetaNaranja} />
      </Pressable>
    </ImageBackground>
  );
};

export default TarjetaNivel;
