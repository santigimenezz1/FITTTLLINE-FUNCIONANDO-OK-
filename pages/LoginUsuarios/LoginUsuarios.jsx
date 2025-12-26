import React, { useContext } from "react";
import { Image, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./LoginUsuarios.js";
import BotonLoginUsuario from "../../components/BotonLoginUsuario/BotonLoginUsuario.jsx";
import { CartContext } from "../../Context/Context.jsx";

const LoginUsuarios = ({ navigation }) => {
  const { paisSeleccionado, setPaisSeleccionado } = useContext(CartContext);

  const textos = {
    espana: {
      selectLanguage: "Seleccionar idioma",
      selectPlaceholder: "Selecciona tu país",
    },
    francia: {
      selectLanguage: "Choisir la langue",
      selectPlaceholder: "Sélectionnez votre pays",
    },
    italia: {
      selectLanguage: "Seleziona la lingua",
      selectPlaceholder: "Seleziona il tuo paese",
    },
    portugal: {
      selectLanguage: "Selecionar idioma",
      selectPlaceholder: "Selecione seu país",
    },
    paisesBajos: {
      selectLanguage: "Taal selecteren",
      selectPlaceholder: "Selecteer je land",
    },
    bandera: {
      selectLanguage: "Sprache wählen",
      selectPlaceholder: "Wählen Sie Ihr Land",
    },
    inglaterra: {
      selectLanguage: "Select language",
      selectPlaceholder: "Select your country",
    },
    estadosUnidos: {
      selectLanguage: "Select language",
      selectPlaceholder: "Select your country",
    },
  };

  const idioma = textos[paisSeleccionado] || textos.inglaterra;

  return (
    <View style={styles.container__loginUsuarios}>
      <Image
        width={250}
        height={70}
        source={{
          uri:
            "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1764599157/fittlline_ir0yke.png",
        }}
      />

      <View
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Texto encima del Picker */}
        <Text style={{ color: "white", fontSize: 24 }}>
          {idioma.selectLanguage}
        </Text>

        {/* Picker de países */}
        <Picker
          selectedValue={paisSeleccionado}
          onValueChange={(itemValue) => setPaisSeleccionado(itemValue)}
          style={{ width: 250, backgroundColor: "white", marginBottom: 20 }}
          dropdownIconColor="black"
        >
          <Picker.Item label={idioma.selectPlaceholder} value="" />
          <Picker.Item label="Español (España)" value="espana" />
          <Picker.Item label="Français (France)" value="francia" />
          <Picker.Item label="Deutsch (Deutschland)" value="bandera" />
          <Picker.Item label="Italiano (Italia)" value="italia" />
          <Picker.Item label="Nederlands (Nederland)" value="paisesBajos" />
          <Picker.Item label="English (United States)" value="estadosUnidos" />
          <Picker.Item label="Português (Portugal)" value="portugal" />
        </Picker>
      </View>

      <View>
        <BotonLoginUsuario
          navigation={navigation}
          paisSeleccionado={paisSeleccionado}
        />
      </View>
    </View>
  );
};

export default LoginUsuarios;
