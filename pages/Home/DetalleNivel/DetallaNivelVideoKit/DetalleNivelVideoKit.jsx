import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";
import { CartContext } from "../../../../Context/Context";

const DetalleNivelVideoKit = () => {
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
        return ejercicio.videoUrlItalia;
      case "francia":
        return ejercicio.videoUrlFrancia;
      case "estadosUnidos":
      case "inglaterra":
        return ejercicio.videoUrlEstadosUnidos;
      case "bandera":
        return ejercicio.videoUrlAlemania;
      case "paisesBajos":
        return ejercicio.videoUrlPaisesBajos;
      case "portugal":
        return ejercicio.videoUrlPortugal;
      default:
        return ejercicio.videoUrl;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://res.cloudinary.com/dcf9eqqgt/image/upload/f_auto,q_auto,w_600/v1751020771/Dise%C3%B1o_sin_t%C3%ADtulo_68_dhzq2k.png",
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
                  color: "white",
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
                 uri: `https://player.vimeo.com/video/${getVideoUrl()}?controls=1`
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

export default DetalleNivelVideoKit;
