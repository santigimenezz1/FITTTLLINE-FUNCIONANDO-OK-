import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions } from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';
import { Swing } from 'react-native-animated-spinkit';
import TarjetaNivel from "../../components/TarjetaNivel/TarjetaNivel.jsx";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48) / 2;

const Home = ({ navigation }) => {
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerNiveles = async () => {
    try {
      const nivelesCollection = collection(db, "niveles");
      const querySnapshot = await getDocs(nivelesCollection);
      let arreglo = [];
      querySnapshot.forEach((doc) => {
        arreglo.push({ id: doc.id, data: doc.data() });
      });
      setNiveles(arreglo);
    } catch (error) {
      console.error("Error obteniendo documentos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerNiveles();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Swing size={48} color="#3B82F6" />
      </View>
    );
  }

  const ordenPersonalizado = [
    "Introducción",
    "MODULO 1 - Qué es la maderoterapia",
    "MODULO 2 - CELULITIS",
    "MODULO 3 - Protocolo vientre",
    "Modulo 4 - protocolo parte trasera"
  ];

  const nivelesOrdenados = niveles
    .filter((nivel) => ordenPersonalizado.includes(nivel.data.nombre))
    .sort(
      (a, b) =>
        ordenPersonalizado.indexOf(a.data.nombre) -
        ordenPersonalizado.indexOf(b.data.nombre)
    );

  const nivelesNormales = niveles
    .filter(
      (nivel) =>
        nivel.data.nombre !== "Primeros pasos" &&
        !ordenPersonalizado.includes(nivel.data.nombre)
    )
    .sort((a, b) => {
      const orden = [
        "Nivel 1",
        "Nivel 2",
        "Nivel 3",
        "Nivel 4",
        "Nivel 5",
        "Nivel 6"
      ];
      return orden.indexOf(a.data.nombre) - orden.indexOf(b.data.nombre);
    });

  const renderNivel = ({ item }) => (
    <View
      style={{
        width: cardWidth,
        margin: 8,
        backgroundColor: "orange",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <TarjetaNivel
        key={item.id}
        data={item}
        navigation={navigation}
        nivel={item.data}
        tiempo={item.data.tiempoTotal}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "orange" }}>
      <NavBar />

      {/* Mostrar siempre todos los niveles */}
      <FlatList
        data={[...nivelesOrdenados, ...nivelesNormales]}
        keyExtractor={(item) => item.id}
        renderItem={renderNivel}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
      />
    </View>
  );
};

export default Home;
