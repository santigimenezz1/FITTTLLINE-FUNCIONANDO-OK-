import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container__inicioSesion: {
    backgroundColor: "orange",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 45,
    color: "black",
    padding: 5,
    borderRadius: 12,
    backgroundColor: "white",
    paddingLeft: 10,
    fontFamily: 'NunitoSans_400Regular',
    letterSpacing: 1,
  },
  botonText: {
    color: "black",
    fontFamily: 'NunitoSans_400Regular',
    letterSpacing: 1,
  },
  botonLoginUsuario: {
    width: 150,
    height: 40,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  botonLoginGoogle: {
    width: "auto",
    paddingLeft: 15,
    paddingRight: 15,
    height: 45,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    backgroundColor: "hsl(215, 18%, 13%)",
  },
  container__form: {
    display: "flex",
    gap: 15,
    alignItems: "center",
    marginTop: 30,
  },
  // ⬇️ Estilos nuevos para el Picker
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    width: 300,
    overflow: "hidden",
  },
  picker: {
    color: "black",
    width: "100%",
    fontFamily: 'NunitoSans_400Regular',
    letterSpacing: 1,
    paddingLeft: 10,
  },
});

export default styles;
