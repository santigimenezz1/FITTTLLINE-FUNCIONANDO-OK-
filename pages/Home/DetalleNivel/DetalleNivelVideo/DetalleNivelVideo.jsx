import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./DetalleNivelVideo";
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";
import { CartContext } from "../../../../Context/Context";

const DetalleNivelVideo = () => {
  const route = useRoute();
  const { ejercicio, numero } = route.params;
  const navigation = useNavigation();
  const [videoDuration, setVideoDuration] = useState(0);
  const { idiomaActual } = useContext(CartContext);

  useEffect(() => {
    navigation.setOptions({ title: getNombreEjercicio() });
    setVideoDuration(ejercicio.duracion);
  }, [navigation, ejercicio, idiomaActual]);

  const getNombreEjercicio = () => {
    switch (idiomaActual) {
      case "espana":
        return ejercicio.nombre;
      case "italia":
        return ejercicio.nombreItalia;
      case "francia":
        return ejercicio.nombreFrancia;
      case "estadosUnidos":
      case "inglaterra":
        return ejercicio.nombreUsa;
      case "bandera":
        return ejercicio.nombreAlemania;
      case "paisesBajos":
        return ejercicio.nombrePaisesBajos;
      case "portugal":
        return ejercicio.nombrePortugal;
      default:
        return ejercicio.nombre;
    }
  };

  const getVideoUrl = () => {
    switch (idiomaActual) {
      case "espana":
        return ejercicio.videoUrl;
      case "italia":
        return ejercicio.videoUrl;
      case "francia":
        return ejercicio.videoUrl;
      case "estadosUnidos":
      case "inglaterra":
        return ejercicio.videoUrl;
      case "bandera":
        return ejercicio.videoUrl;
      case "paisesBajos":
        return ejercicio.videoUrl;
      case "portugal":
        return ejercicio.videoUrl;
      default:
        return ejercicio.videoUrl;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755205783/Maderoth%C3%A9rapie_btr1q8.jpg",
        }}
        style={{ flex: 1, opacity:1 }}
        resizeMode="cover"
      >
        {/* Overlay oscuro para que el texto sea legible */}
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent:"center", paddingBottom: RFValue(50), borderWidth:8, borderTopWidth:0,borderBottomWidth:0, borderColor:"#34cee6"  }}>
              <Text
                style={{
                  color: "#D4AF37",
                  letterSpacing: 2,
                  fontSize: 70,
                }}
              >
                {numero}
              </Text>
                <Text
                style={{
                  color: "white",
                  letterSpacing: 2,
                  fontSize: 25,
                  padding: 20,
                  textAlign: "center",
                 
                }}
              >
                {getNombreEjercicio()}
              </Text>

              {/* Video */}
              <View style={{ width: "90%", height: 200, }}>
                <WebView
                  source={{
                 uri: `https://vimeo.com/1118577486?fl=ml&fe=ec`
                  }}
                  style={{ width: "100%", height: "100%" }}
                  allowsFullscreenVideo
                  javaScriptEnabled
                  mediaPlaybackRequiresUserAction={false}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DetalleNivelVideo;
