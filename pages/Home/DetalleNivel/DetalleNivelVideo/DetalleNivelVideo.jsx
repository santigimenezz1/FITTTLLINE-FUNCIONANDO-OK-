import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./DetalleNivelVideo"; 
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";
import { CartContext } from "../../../../Context/Context";

const textos = {
  espana: { Tutorial: "Tutorial", Training: "Entrenamiento" },
  italia: { Tutorial: "Tutorial", Training: "Allenamento" },
  francia: { Tutorial: "Tutoriel", Training: "Entraînement" },
  bandera: { Tutorial: "Tutorial", Training: "Training" }, // Alemania
  paisesBajos: { Tutorial: "Tutorial", Training: "Training" },
  inglaterra: { Tutorial: "Tutorial", Training: "Training" },
  estadosUnidos: { Tutorial: "Tutorial", Training: "Training" },
  portugal: { Tutorial: "Tutorial", Training: "Treinamento" },
};

const DetalleNivelVideo = () => {
  const route = useRoute();
  const { ejercicio } = route.params; 
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [botonActive, setBotonActive] = useState("Tutorial");
  const { closed, setClosed, userRegistro, idiomaActual } = useContext(CartContext);

  useEffect(() => {
    let nombreEjercicio = ejercicio.nombre;
    if (idiomaActual === "francia") nombreEjercicio = ejercicio.nombreFrancia;
    else if (idiomaActual === "italia") nombreEjercicio = ejercicio.nombreItalia;
    else if (idiomaActual === "inglaterra" || idiomaActual === "estadosUnidos") {
      nombreEjercicio = ejercicio.nombreEstadosUnidos;
    } else if (idiomaActual === "bandera") nombreEjercicio = ejercicio.nombreAlemania;
    else if (idiomaActual === "paisesBajos") nombreEjercicio = ejercicio.nombrePaisesBajos;
    else if (idiomaActual === "portugal") nombreEjercicio = ejercicio.nombrePortugal;

    navigation.setOptions({ title: nombreEjercicio });
    setVideoDuration(ejercicio.duracion);
  }, [navigation, ejercicio, idiomaActual]);
  const traduccion = textos[idiomaActual]?.[botonActive] || botonActive;
  return (
    <ScrollView>
      <View style={{ backgroundColor: "orange", paddingBottom: RFValue(50), height: "auto" }}>
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
          <View style={{ display: "flex", width: "80%", marginBottom: 10, flexDirection: "row-reverse", justifyContent: "space-between" }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
             
             
            </View>
          </View>

          {/* Texto traducido del estado activo */}
          <Text style={{ color: "white", letterSpacing: 2, fontSize: 25, marginBottom: 10 }}>
            {traduccion}
          </Text>

          {/* Video */}
        <View style={{ width: "90%", height: 200 }}>
  <WebView
    source={{
      uri: botonActive !== "Tutorial"
        ? `https://player.vimeo.com/video/${ejercicio.videoURL}?controls=1`
        : `https://player.vimeo.com/video/${ejercicio.videoTrailerURL}?controls=1`
    }}
    style={{ width: "100%", height: "100%" }}
    allowsFullscreenVideo={true}
    javaScriptEnabled={true}
    mediaPlaybackRequiresUserAction={true} // fuerza interacción del usuario
  />
</View>

          <View style={{ width: RFValue(300), borderWidth: 3, borderColor: "white", marginTop: 20 }}>
            <Image source={{ uri: ejercicio.imagenVideo }} style={{ width: "100%", height: RFValue(120) }} />
          </View>

          <View style={{ marginTop: 40, display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ display: "flex", gap: 12, width: "90%", marginBottom: 30, justifyContent: "center", flexDirection: "row" }}>
              <TouchableOpacity
                style={botonActive === "Tutorial" ? styles.botonOn : styles.botonDesactivado}
                onPress={() => setBotonActive("Tutorial")}
              >
                <Text style={{ color: "white", textAlign: "center", letterSpacing: 1, fontFamily: 'NunitoSans_400Regular' }}>
                  {textos[idiomaActual]?.Tutorial || "Tutorial"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={botonActive === "Training" ? styles.botonOn : styles.botonDesactivado}
                onPress={() => setBotonActive("Training")}
              >
                <Text style={{ color: "white", textAlign: "center", letterSpacing: 1, fontFamily: 'NunitoSans_400Regular' }}>
                  {textos[idiomaActual]?.Training || "Training"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};



export default DetalleNivelVideo;
