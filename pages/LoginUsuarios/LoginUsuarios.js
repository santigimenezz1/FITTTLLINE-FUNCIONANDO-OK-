import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center"

  },
  container__loginUsuarios: {
    flex: 1, // Esto hace que el View ocupe todo el espacio de su padre (ImageBackground)
    backgroundColor: "transparent", // ¡Este es el cambio clave para que la imagen se vea!
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20, // Añadido para un mejor espaciado
    backgroundColor:"orange"
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    opacity:1
  },
  backgroundImageStyle: {
    resizeMode: 'cover', // o 'stretch' si prefieres
  },

  // ScrollView transparente, para que deje ver el fondo
  container__detalleNivel: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Padding interno de los ejercicios
  contentContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 30,
    // Si tu versión de RN no soporta gap, reemplázalo con marginBottom en los items
  }

  
});

export default styles;