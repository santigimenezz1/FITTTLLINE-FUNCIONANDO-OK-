import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
} from "react-native";
import styles from "./TarjetaIngresoCodigoStyles";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../../Context/Context";
import { showMessage } from "react-native-flash-message";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const TarjetaIngresoCodigo = ({
  CerrarModal,
  codigoCorrecto,
  setCodigoCorrecto,
}) => {
  const { closed, setClosed, userRegistro, userOnline, idiomaActual } =
    useContext(CartContext);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const guardarText = (value) => {
    const upper = value.toUpperCase();
    setText(upper);
    setCodigoCorrecto(false);

    // ✅ Si se escriben 7 caracteres, cerrar el teclado y quitar foco (pero NO validar)
    if (upper.length === 7) {
      inputRef.current?.blur();    // Quita el foco
      Keyboard.dismiss();          // Cierra el teclado
    }
  };

  const validacionCodigo = async () => {
    if (text === userRegistro.codigoAcceso) {
      try {
        const userCollectionRef = collection(db, "usuarios");
        const q = query(
          userCollectionRef,
          where("email", "==", userOnline.email)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = doc(db, "usuarios", userDoc.id);

          await updateDoc(userDocRef, {
            access: true,
          });

          setClosed(true);
          CerrarModal();

          showMessage({
            message: "✅",
            type: "success",
            style: {
              height: 100,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            },
          });
        }
      } catch (error) {
        console.error("Error al actualizar el acceso del usuario: ", error);
      }
    } else {
      setClosed(false);
      setCodigoCorrecto(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        width={35}
        height={35}
        source={{
          uri: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755341433/cerrar-con-llave_h44wxu.png",
        }}
      />

      <TextInput
        ref={inputRef}
        value={text}
        onChangeText={guardarText}
        placeholder="Code"
        placeholderTextColor="hsl(0, 0%, 74%)"
        style={styles.input}
        maxLength={7}
        returnKeyType="done"
        autoCapitalize="characters"
      />

      <TouchableOpacity onPress={validacionCodigo} style={styles.button}>
        {idiomaActual === "espana" && (
          <Text style={{color:"white"}}>Continunar</Text>
        )}
        {idiomaActual === "italia" && (
          <Text style={{color:"white"}}>Continua</Text>
        )}
        {idiomaActual === "francia" && (
          <Text style={{color:"white"}}>Continuer</Text>
        )}
        {idiomaActual === "bandera" && (
          <Text style={{color:"white"}}>Fortsetzen</Text>
        )}
        {(idiomaActual === "inglaterra" ||
          idiomaActual === "estadosUnidos") && (
          <Text style={{color:"white"}}>Continue</Text>
        )}
        {idiomaActual === "paisesBajos" && (
          <Text style={{color:"white"}}>Doorgaan</Text>
        )}
        {idiomaActual === "portugal" && (
          <Text style={{color:"white"}}>Continuar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TarjetaIngresoCodigo;
