import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './DetalleNivelKit.js';
import TarjetaNivelFittPro from '../../../components/TarjetaNivelFittPro/TarjetaNivelFittPro.jsx';

const DetalleNivelKit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rutaNivel, data } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: rutaNivel });
  }, [navigation, rutaNivel]);

  console.log({ data });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/f_auto,q_auto,w_600/v1756570556/Captura_de_pantalla_2025-08-30_181303_ohwsrk.png',
        }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Capa negra encima para oscurecer la imagen */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 1,
          }}
        />

        {/* Contenido con zIndex superior */}
        <ScrollView
          style={[styles.container__detalleNivel, { zIndex: 2 }]}
          contentContainerStyle={styles.contentContainer}
        >
          {data &&
            Object.entries(data.data.ejercicios)
              .sort(([nivelA], [nivelB]) => {
                const numA = parseInt(nivelA.replace('nivel', '')) || 0;
                const numB = parseInt(nivelB.replace('nivel', '')) || 0;
                return numA - numB;
              })
              .map(([nivelNombre]) => {
                // Extraer número de nivel (1, 2, 3, 4…)
                const numNivel =
                  parseInt(nivelNombre.replace('nivel', '')) || 0;

                // Clave dinámica según nivel
                const keyImagen =
                  numNivel === 1
                    ? 'imagenTarjetaNivel'
                    : `imagenTarjetaNivel${numNivel}`;

                // Obtener foto según nivel
                const fotoNivel = data.data[keyImagen];

                return (
                  <View key={nivelNombre}>
                    <TarjetaNivelFittPro
                      nivelNombre={nivelNombre}
                      navigation={navigation}
                      rutaNivel={rutaNivel}
                      data={data}
                      fotoo={fotoNivel} // <- Foto dinámica
                    />
                  </View>
                );
              })}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default DetalleNivelKit;
