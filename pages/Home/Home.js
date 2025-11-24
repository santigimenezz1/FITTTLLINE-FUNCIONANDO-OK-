import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  home: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent", // antes "black" para que se vea el fondo
    position: "relative",
    height: "100%",
  },
  home__main: {
    width: "95%",
    height: "100%",
    padding: 5,
    flexDirection: "column",
  
  },
  home__contentContainer: {
    paddingBottom: 60,
  },
  home__introText: {
    fontSize: RFValue(18),
    color: "white",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: 'NunitoSans_400Regular',
    letterSpacing: 0.7,
  },
  home__sectionTitle: {
    fontSize: RFValue(20),
    color: "white",
    fontFamily: 'NunitoSans_400Regular',
    display:"flex",
  },
  home__tipsContainer: {
    marginTop: 30,
  },
  home__buttonText: {
    color: "white",
  },
  home__textCode: {
    color: "white",
    fontSize:15,
  },
});

export default styles;
