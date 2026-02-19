import React, { useState, useEffect, useContext } from "react";
import { View, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./DetalleNivelVideo"; 
import { RFValue } from "react-native-responsive-fontsize";
import { Vimeo } from "react-native-vimeo-iframe"; 
import { CartContext } from "../../../../Context/Context";

const textos = {
  espana: { Tutorial: "Tutorial", Training: "Entrenamiento" },
  italia: { Tutorial: "Tutorial", Training: "Allenamento" },
  francia: { Tutorial: "Tutoriel", Training: "Entraînement" },
  bandera: { Tutorial: "Tutorial", Training: "Training" },
  paisesBajos: { Tutorial: "Tutorial", Training: "Training" },
  inglaterra: { Tutorial: "Tutorial", Training: "Training" },
  estadosUnidos: { Tutorial: "Tutorial", Training: "Training" },
  portugal: { Tutorial: "Tutorial", Training: "Treinamento" },
};

const DetalleNivelVideo = () => {
  const route = useRoute();
  const { ejercicio } = route.params; 
  const navigation = useNavigation();
  const [botonActive, setBotonActive] = useState("Tutorial");
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const { idiomaActual } = useContext(CartContext);

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
  }, [navigation, ejercicio, idiomaActual]);

  useEffect(() => {
    // Resetear loading cuando cambia el video
    setIsVideoLoading(true);
    
    // Timer para desaparecer el spinner después de 400ms
    const timer = setTimeout(() => {
      setIsVideoLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [botonActive]);

  const traduccion = textos[idiomaActual]?.[botonActive] || botonActive;

  // Lógica para alternar el ID del video según el botón activo
  const activeVideoId = botonActive !== "Tutorial" ? ejercicio.videoURL : ejercicio.videoTrailerURL;

  return (
    <ScrollView 
      style={{ flex: 1 }} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ImageBackground
        source={{ uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1770820181/Dise%C3%B1o_sin_t%C3%ADtulo_40_x7dgir_1_qpopo4_1_uesan7.png' }}
        style={{ 
          flex: 1, 
          paddingBottom: RFValue(50), 
          alignItems: "center",
          minHeight: "100%"
        }}
        resizeMode="cover"
      >
        {/* OVERLAY OSCURO */}
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }} />
        
        <View style={{ marginTop: 30, alignItems: "center", width: "100%", zIndex: 1 }}>
          <Text style={{ color: "white", letterSpacing: 2, fontSize: 25, marginBottom: 10 }}>
            {traduccion}
          </Text>

          {/* --- REPRODUCTOR VIMEO (COPIADO EXACTO) --- */}
          <View style={{ 
            width: "105%", 
            aspectRatio: 16 / 9, 
            overflow: 'hidden', 
            backgroundColor: "transparent",
            borderRadius: 8,
            position: 'relative'
          }}>
            
            {/* SPINNER MIENTRAS CARGA */}
            {isVideoLoading && (
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 5
              }}>
                <ActivityIndicator size="large" color="#34cee6" />
              </View>
            )}

            <Vimeo
              videoId={activeVideoId}
              params={'api=1&autoplay=0&controls=1'}
              allowsFullscreenVideo={true}
              style={{ 
                width: '125%', 
                height: '125%',
                marginLeft: '-12.5%', 
                marginTop: '-7%',
                transform: [{ scale: 0.8 }],
                backgroundColor: 'transparent',
                opacity: isVideoLoading ? 0 : 1,
                zIndex: isVideoLoading ? 1 : 10
              }}
              webViewProps={{
                scrollEnabled: false,
                style: { backgroundColor: 'transparent' },
                containerStyle: { backgroundColor: 'transparent' },
                underlayColor: 'black',
                userAgent: "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
              }}
            />
          </View>
          {/* ------------------------------------------- */}

          <View style={{ width: RFValue(300), borderWidth: 3, borderColor: "white", marginTop: 20 }}>
            <Image source={{ uri: ejercicio.imagenVideo }} style={{ width: "100%", height: RFValue(120) }} />
          </View>

          <View style={{ marginTop: 40, flexDirection: "row", gap: 12, width: "90%", justifyContent: "center" }}>
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

      </ImageBackground>
    </ScrollView>
  );
};

export default DetalleNivelVideo;