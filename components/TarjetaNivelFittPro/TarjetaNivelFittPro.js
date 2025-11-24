import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container__tarjetaNivel: {
    width: "90%", // centrado automático sin necesidad de condicional
    marginHorizontal: "auto",
    paddingHorizontal: 16,
    position: "relative",
    height: "100%", // eliminado si te sigue generando problemas, pruébalo también sin esta línea
  },
  fondoImagen: {
    width: "100%",
    height: RFValue(120), // se adapta proporcionalmente
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center", // importante para que el texto se posicione correctamente
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)", // ligeramente más oscuro para contraste
  },
  text: {
    color: "white",
    fontSize: RFValue(30), // más flexible que 28
    fontFamily: "NunitoSans_400Regular",
    textAlign: "center",
    zIndex: 1, // asegura que esté por encima de overlay
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  centroTexto: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 1, // importante para mantenerlo sobre la imagen
  },
  tarjetaNaranja: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#34cee6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    maxWidth: "80%",
    zIndex: 1,
  },
  textoTarjetaNaranja: {
    color: "white",
    fontSize: RFValue(13),
    fontFamily: "NunitoSans_400Regular",
  },
  container__candado: {
    alignItems: "center",
    gap: 3,
  },
  candadoTexto: {
    color: "white",
    fontFamily: "NunitoSans_400Regular",
  },
});

export default styles;
