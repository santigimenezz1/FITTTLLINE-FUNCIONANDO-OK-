import React, { useEffect } from 'react';
import { ScrollView, ImageBackground, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalCodigoDesbloqueo from '../../../components/ModalCodigoDesbloqueo/ModalCodigoDesbloqueo';

const DetalleNivel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rutaNivel, data, nivelNombre } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: rutaNivel });
  }, [navigation, rutaNivel]);

  const ejercicios = Object.entries(data.data.ejercicios[nivelNombre]);

  return (
    <ImageBackground
      source={{ uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755198477/Maderotherapy_xpjkj4.jpg' }}
      style={styles.imageBackground}
      imageStyle={{ opacity: 1 }}
    >
      {/* Capa oscura semitransparente */}
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {ejercicios
          .sort(([nivelA], [nivelB]) => {
            const numA = parseInt(nivelA.replace('nivel', ''), 10) || 0;
            const numB = parseInt(nivelB.replace('nivel', ''), 10) || 0;
            return numA - numB;
          })
          .map(([key, ejercicioData], index) => (
            <ModalCodigoDesbloqueo
              key={key}
              nivel={rutaNivel}
              tiempo={ejercicioData.duracion}
              navigation={navigation}
              ejercicio={ejercicioData}
              numero={index + 1}
              nivelNombre={nivelNombre}
            />
          ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // para que ocupe toda la pantalla
    backgroundColor: 'rgba(0, 0, 0, 0.51)', // negro con 40% de opacidad
  },
  contentContainer: {
    padding: 16, // ajusta según tu diseño
  },
});

export default DetalleNivel;
