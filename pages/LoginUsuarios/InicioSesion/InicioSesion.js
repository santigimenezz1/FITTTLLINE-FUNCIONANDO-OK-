import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container__inicioSesion: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"orange"
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
    fontWeight:"bold"
  },
  botonText: {
    color: "black",
    fontFamily: 'NunitoSans_400Regular',
    letterSpacing: 1,
    fontWeight:"bold"
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
    marginTop: 30
  }
});

export default styles;
