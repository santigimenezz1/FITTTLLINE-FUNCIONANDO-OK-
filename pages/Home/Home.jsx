import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, Alert, ImageBackground } from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import TarjetaCalentamiento from "../../components/TarjetaCalentamiento/TarjetaCalentamiento";
import TarjetaNivel from "../../components/TarjetaNivel/TarjetaNivel.jsx";
import styles from '../Home/Home.js';
import TarjetaIngresoCodigo from './TarjetaIngesoCodigo/TarjetaingresoCodigo.jsx';
import TarjetaConsejos from '../../components/TarjetaConsejos/TarjetaConsejos.jsx';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';
import { CartContext } from '../../Context/Context.jsx';
import { FontAwesome5 } from '@expo/vector-icons';
import { Swing } from 'react-native-animated-spinkit';
import TarjetaNivelKitEntrenamiento from '../../components/TarjetaNivelKitEntrenamiento/TarjetaNivelKitEntrenamiento.jsx';
import DetalleNivelNivelesKit from './DetalleNivelKit/DetalleNivelNivelesKit/DetalleNivelNivelesKit.jsx';

const Home = ({ navigation }) => {
  const [niveles, setNiveles] = useState([]);
  const { closed, setClosed, userRegistro, userOnline, idiomaActual } = useContext(CartContext);
  const [codigoCorrecto, setCodigoCorrecto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const CerrarModal = () => {
    setCodigoCorrecto(false);
    setModalVisible(false);
  };

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
    }
  };

  const verificarAccesoUsuario = async () => {
    if (!userOnline) return;

    try {
      setLoading(true);

      const userCollectionRef = collection(db, 'usuarios');
      const q = query(userCollectionRef, where('email', '==', userOnline.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setClosed(userData.access || false);
      } else {
        setClosed(false);
      }
    } catch (error) {
      console.error('Error al verificar acceso:', error);
      Alert.alert("Error", "Hubo un fallo. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verificarAccesoUsuario();
    obtenerNiveles();
  }, [userRegistro, userOnline]);

  if (loading) {
    return (
      <View style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
        <Swing size={48} color="hsl(199, 76%, 28%)" />
      </View>
    );
  }

  const nivelesOrdenados = niveles
    .filter((n) =>
      ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5", "Nivel 6"]
        .includes(n.data.nombre)
    )
    .sort((a, b) => {
      const orden = ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5", "Nivel 6"];
      return orden.indexOf(a.data.nombre) - orden.indexOf(b.data.nombre);
    });

  const tarjetasConos = niveles.filter((n) =>
    ["Conos sin pelota", "Conos con pelota"].includes(n.data.nombre)
  );

  const tarjetasConosExtra = niveles.filter((n) =>
    ["Escalera", "Mixtos"].includes(n.data.nombre)
  );

  const calentamiento = niveles.filter(
    (n) => n.data.nombre === "Primeros pasos"
  );

  return (
    <ImageBackground
      source={{ uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1757458381/Captura_de_pantalla_2025-09-10_005242_ijrhwo.png' }}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 1 }}
    >
      {/* Capa oscura encima */}
      <View 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)' 
        }} 
      />

      <View style={styles.home}>
        {!niveles.length > 0 ? (
          <View style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <Swing size={48} color="hsl(199, 76%, 28%)" />
          </View>
        ) : (
          <>
            <NavBar />

            <ScrollView style={styles.home__main} contentContainerStyle={styles.home__contentContainer}>

              {nivelesOrdenados.map((nivel) => (
                <TarjetaNivel
                  key={nivel.id}
                  data={nivel}
                  navigation={navigation}
                  nivel={nivel.data}
                  tiempo={nivel.data.tiempoTotal}
                />
              ))}

              {!closed && (
                <>
                  <TarjetaIngresoCodigo
                    setModalVisible={setModalVisible}
                    CerrarModal={CerrarModal}
                    setCodigoCorrecto={setCodigoCorrecto}
                  />
                </>
              )}

              {calentamiento.map((nivel) => (
                <TarjetaCalentamiento
                  key={nivel.id}
                  data={nivel}
                  navigation={navigation}
                  nivel={nivel.data}
                  tiempo={nivel.data.tiempoTotal}
                />
              ))}

              <Text style={styles.home__sectionTitle}>
                <FontAwesome5 name="play" size={18} color="white" /> Ejercicios con conos
              </Text>

              {tarjetasConos.map((nivel) => (
                <TarjetaNivelKitEntrenamiento
                  key={nivel.id}
                  data={nivel}
                  navigation={navigation}
                  nivel={nivel.data}
                  tiempo={nivel.data.tiempoTotal}
                />
              ))}

              <Text style={styles.home__sectionTitle}>
                <FontAwesome5 name="play" size={18} color="white" /> Ejercicios extra GRATIS
              </Text>

              {tarjetasConosExtra.map((nivel) => (
                <TarjetaNivelKitEntrenamiento
                  key={nivel.id}
                  data={nivel}
                  navigation={navigation}
                  nivel={nivel.data}
                  tiempo={nivel.data.tiempoTotal}
                />
              ))}

              <View style={styles.home__tipsContainer}>
                <TarjetaConsejos />
              </View>

            </ScrollView>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default Home;
