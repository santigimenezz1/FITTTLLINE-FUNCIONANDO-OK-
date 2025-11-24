import { Image, Pressable, Text, View } from "react-native";
import styles from './TarjetaNivelDetalleStyles.js';
import { useContext } from "react";
import { CartContext } from "../../../../Context/Context.jsx";
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

const TarjetaNivelDetalle = ({ setModalVisible, nivel, tiempo, navigation, ejercicio, handlePresentModalPress, numero, index }) => {
    const { closed, setClosed, userRegistro, idiomaActual } = useContext(CartContext);

    const navegarDetalleVideo = () => {
        if (closed) {
            navigation.navigate("DetalleNivelVideo", { ejercicio, numero });
        } else {
            setModalVisible();
        }
    };

    // Obtener nombre y duración según idiomaActual
    const obtenerNombreEjercicio = () => {
        switch (idiomaActual) {
            case "italia": return ejercicio.nombreItalia;
            case "francia": return ejercicio.nombreFrancia;
            case "bandera": return ejercicio.nombreAlemania;
            case "inglaterra": return ejercicio.nombreUsa;
            case "estadosUnidos": return ejercicio.nombreUsa;
            case "paisesBajos": return ejercicio.nombrePaisesBajos;
            case "portugal": return ejercicio.nombrePortugal;
            case "espana":
            default: return ejercicio.nombre;
        }
    };

    return (
        <View style={styles.container__tarjetaNivelDetalle}>
            <Pressable onPress={navegarDetalleVideo} style={styles.container__tarjetaNivel}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#D4AF37' }}>{numero}</Text>
                        </View>
                        <View style={{ width: RFValue(150) }}>
                            <Text style={styles.text}>{obtenerNombreEjercicio()}</Text>
                            <Text style={styles.texth2}>{ejercicio.duracion}</Text>
                            
                        </View>
                    </View>

                    {closed ? (
                        <View style={{ flexDirection: 'row', gap: 3 }}>
                           
                        </View>
                        
                    ) : (
                        <View style={styles.container__bloqueado}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Image
                                    width={26}
                                    height={26}
                                    source={{ uri: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747228419/candado_2_oloewu.png" }}
                                />
                            </View>
                            <Text style={bloqueadoTextStyle}>
                                {{
                                    espana: "Bloqueado",
                                    italia: "Bloccato",
                                    francia: "Bloqué",
                                    bandera: "Blockiert",
                                    inglaterra: "Blocked",
                                    paisesBajos: "Geblokkeerd",
                                    portugal: "Bloqueado",
                                    estadosUnidos: "Blocked"
                                }[idiomaActual] || "Bloqueado"}
                            </Text>
                        </View>
                    )}
                </View>
            </Pressable>
        </View>
    );
};
const bloqueadoTextStyle = {
    color: "white",
    fontFamily: 'NunitoSans_400Regular',
    letterSpacing: 1,
};
export default TarjetaNivelDetalle;
