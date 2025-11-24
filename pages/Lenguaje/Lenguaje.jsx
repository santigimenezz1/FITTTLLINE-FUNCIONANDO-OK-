import { Pressable, Text, View, Alert, Image, ImageBackground, ScrollView } from "react-native";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Context.jsx";
import { Query, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from "../../firebaseConfig.js";
import { showMessage } from "react-native-flash-message";

const Perfil = () => {
  const { setUsuarioOn, userRegistro, eliminarUsuario, idiomaActual, setIdiomaActual } = useContext(CartContext);
  const [userPerfil, setUserPerfil] = useState();
  const [idioma, setIdioma] = useState("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/espana_wyfm4p.png");
  const { userOnline } = useContext(CartContext);

  useEffect(() => {
    {idiomaActual === "espana" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/espana_wyfm4p.png")}
    {idiomaActual === "italia" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984646/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/italia_r7gxfl.png")}
    {idiomaActual === "francia" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/francia_bluayx.png")}
    {idiomaActual === "bandera" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/bandera_ykvinl.png")}
    {idiomaActual === "paisesBajos" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746973779/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/paisesBajos_fo5ey6.png")}
    {idiomaActual === "inglaterra" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/inglaterra_vgobrt.png")}
    {idiomaActual === "estadosUnidos" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747076206/estadosUnidos_x4bgrp.png")}
    {idiomaActual === "portugal" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746808357/portugal_ynpltt.png")}
  }, []);

  const obtenerNombrePais = (url) => {
    const match = url.match(/\/([^\/_]+)_\w+\.png$/);
    const pais = match ? match[1].replace(/-/g, " ") : null;
    setIdiomaActual(pais)
  };

  const actualizarPaisUsuario = async (idioma) => {
    try {
      const userCollectionRef = collection(db, "usuarios");
      const q = query(userCollectionRef, where("email", "==", userOnline.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = userDoc.ref;
        await updateDoc(userDocRef, { pais: idioma });
        console.log("País actualizado correctamente a:", idioma);
      } else {
        console.error("Usuario no encontrado.");
      }
    } catch (error) {
      console.error("Error al actualizar el país:", error);
    }
  };

  const cambiarIdioma = async (idioma) => {
    setIdioma(idioma);
    const match = idioma.match(/\/([^\/_]+)_\w+\.png$/);
    const pais = match ? match[1].replace(/-/g, " ") : null;

    showMessage({
      message: '✅',
      type: 'success',
      style: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleStyle: {
        fontSize: 20,
        textAlign: 'center',
      },
    });

    actualizarPaisUsuario(pais);
    setIdiomaActual(pais);
  };

  const urlIdiomas = {
    españa: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/espana_wyfm4p.png",
    italia: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984646/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/italia_r7gxfl.png",
    francia: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/francia_bluayx.png",
    inglaterra: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/inglaterra_vgobrt.png",
    estadosUnidos: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747076206/estadosUnidos_x4bgrp.png",
    paisesBajos: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746973779/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/paisesBajos_fo5ey6.png",
    alemania: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/bandera_ykvinl.png",
    portugal: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746808357/portugal_ynpltt.png"
  };

  useEffect(() => {
    const fetchUserByEmail = async (email) => {
      const userCollectionRef = collection(db, "usuarios");
      const q = query(userCollectionRef, where("email", "==", userRegistro.email));
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserPerfil(userDoc.data());
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUserByEmail("test3@gmail.com");
  }, []);

  const handleEliminarCuenta = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceptar",
          onPress: () => {
            eliminarUsuario();
            showMessage({
              message: 'Cuenta eliminada con éxito',
              type: 'success',
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "orange" }}>
      <NavBar />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8 }}>
        {/* HEADER limpio tema claro */}
        <View style={{ marginTop: 8, marginBottom: 12 }}>
          {idiomaActual === "espana" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Idioma</Text>}
          {idiomaActual === "italia" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Lingua</Text>}
          {idiomaActual === "francia" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Langue</Text>}
          {idiomaActual === "bandera" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Sprache</Text>}
          {idiomaActual === "inglaterra" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Language</Text>}
          {idiomaActual === "estadosUnidos" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Language</Text>}
          {idiomaActual === "paisesBajos" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Taal</Text>}
          {idiomaActual === "portugal" && <Text style={{ color: "#111827", fontSize: 24, fontWeight: "800" }}>Idioma</Text>}

          <Text style={{ color: "white", marginTop: 4 }}>
            Selecciona el idioma para toda la app.
          </Text>
        </View>

        {/* TARJETA: Idioma actual */}
        <View
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: 16,
            padding: 14,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16
          }}
        >
          <View
            style={{
              width: 52,
              height: 40,
              borderRadius: 10,
              overflow: "hidden",
              marginRight: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB"
            }}
          >
            <Image source={{ uri: idioma }} style={{ width: "100%", height: "100%" }} />
          </View>

          <View style={{ flex: 1 }}>
            {idiomaActual === "espana" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Idioma actual</Text>}
            {idiomaActual === "italia" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Lingua attuale</Text>}
            {idiomaActual === "francia" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Langue actuelle</Text>}
            {idiomaActual === "bandera" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Aktuelle Sprache</Text>}
            {idiomaActual === "inglaterra" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Current language</Text>}
            {idiomaActual === "estadosUnidos" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Current language</Text>}
            {idiomaActual === "paisesBajos" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Huidige taal</Text>}
            {idiomaActual === "portugal" && <Text style={{ color: "#6B7280", fontSize: 12 }}>Idioma atual</Text>}

            {idiomaActual === "espana" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>España</Text>}
            {idiomaActual === "italia" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>Italia</Text>}
            {idiomaActual === "francia" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>France</Text>}
            {idiomaActual === "bandera" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>Germany</Text>}
            {idiomaActual === "inglaterra" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>England</Text>}
            {idiomaActual === "estadosUnidos" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>United States</Text>}
            {idiomaActual === "paisesBajos" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>Netherlands</Text>}
            {idiomaActual === "portugal" && <Text style={{ color: "#111827", fontSize: 16, fontWeight: "700" }}>Portugal</Text>}
          </View>
        </View>

        {/* GRID de banderas (chips) */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          {/* fila 1 */}
          <Pressable onPress={() => cambiarIdioma(urlIdiomas.españa)} style={chipStyle(idioma === urlIdiomas.españa)}>
            <Image source={{ uri: urlIdiomas.españa }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.españa)}>España</Text>
          </Pressable>

          <Pressable onPress={() => cambiarIdioma(urlIdiomas.italia)} style={chipStyle(idioma === urlIdiomas.italia)}>
            <Image source={{ uri: urlIdiomas.italia }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.italia)}>Italia</Text>
          </Pressable>

          <Pressable onPress={() => cambiarIdioma(urlIdiomas.francia)} style={chipStyle(idioma === urlIdiomas.francia)}>
            <Image source={{ uri: urlIdiomas.francia }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.francia)}>Francia</Text>
          </Pressable>

          <Pressable onPress={() => cambiarIdioma(urlIdiomas.inglaterra)} style={chipStyle(idioma === urlIdiomas.inglaterra)}>
            <Image source={{ uri: urlIdiomas.inglaterra }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.inglaterra)}>Inglaterra</Text>
          </Pressable>

          {/* fila 2 */}
          <Pressable onPress={() => cambiarIdioma(urlIdiomas.estadosUnidos)} style={chipStyle(idioma === urlIdiomas.estadosUnidos)}>
            <Image source={{ uri: urlIdiomas.estadosUnidos }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.estadosUnidos)}>Estados Unidos</Text>
          </Pressable>

          <Pressable onPress={() => cambiarIdioma(urlIdiomas.paisesBajos)} style={chipStyle(idioma === urlIdiomas.paisesBajos)}>
            <Image source={{ uri: urlIdiomas.paisesBajos }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.paisesBajos)}>Países Bajos</Text>
          </Pressable>

          <Pressable onPress={() => cambiarIdioma(urlIdiomas.alemania)} style={chipStyle(idioma === urlIdiomas.alemania)}>
            <Image source={{ uri: urlIdiomas.alemania }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.alemania)}>Alemania</Text>
          </Pressable>

          <Pressable onPress={() => cambiarIdioma(urlIdiomas.portugal)} style={chipStyle(idioma === urlIdiomas.portugal)}>
            <Image source={{ uri: urlIdiomas.portugal }} style={flagImg} />
            <Text style={chipText(idioma === urlIdiomas.portugal)}>Portugal</Text>
          </Pressable>
        </View>

        {/* Espaciado final */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
};

// --- estilos de “chip” reutilizables (solo UI) ---
const chipStyle = (selected) => ({
  width: "48%",
  backgroundColor: selected ? "#111827" : "#F3F4F6",
  borderRadius: 16,
  paddingVertical: 12,
  paddingHorizontal: 10,
  marginBottom: 12,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: selected ? 0 : 1,
  borderColor: "#E5E7EB",
  shadowColor: "#000",
  shadowOpacity: selected ? 0.15 : 0.07,
  shadowRadius: selected ? 8 : 4,
  elevation: selected ? 4 : 2,
});

const flagImg = { width: 44, height: 32, borderRadius: 8, marginRight: 10 };

const chipText = (selected) => ({
  color: selected ? "#FFFFFF" : "#111827",
  fontWeight: "700",
  flexShrink: 1
});

export default Perfil;
