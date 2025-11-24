import { Text, View } from "react-native"
import styles from "./TarjetaConsejos"
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useContext } from "react";
import { CartContext } from "../../Context/Context";

const TarjetaConsejos = () => {
    const { closed, setClosed, userRegistro, idiomaActual } = useContext(CartContext)

    return (
        <View style={styles.container__tarjetaConsejos}>
            <Text style={styles.tittle}>Consejos</Text>

            {/* Consejo 1 */}
            <View style={styles.container__consejos}>
                <FontAwesome name="calendar-check-o" size={24} color="#34cee6" />
                <View style={{ width: "80%" }}>
                    {idiomaActual === "espana" && <Text style={estiloTexto}>Entrena todos los días con la app y sácale el máximo partido a tu kit de escalera y conos.</Text>}
                    {idiomaActual === "italia" && <Text style={estiloTexto}>Allénati ogni giorno con l'app e sfrutta al massimo il tuo kit con scala e coni.</Text>}
                    {idiomaActual === "francia" && <Text style={estiloTexto}>Entraîne-toi chaque jour avec l'app et tire le meilleur parti de ton kit d'entraînement.</Text>}
                    {idiomaActual === "bandera" && <Text style={estiloTexto}>Trainiere täglich mit der App und nutze dein Trainingskit mit Leiter und Hütchen optimal.</Text>}
                    {idiomaActual === "paisesBajos" && <Text style={estiloTexto}>Train elke dag met de app en haal het maximale uit je agility kit.</Text>}
                    {idiomaActual === "inglaterra" && <Text style={estiloTexto}>Train every day with the app and get the most out of your agility kit.</Text>}
                    {idiomaActual === "estadosUnidos" && <Text style={estiloTexto}>Train every day with the app and get the most out of your agility kit.</Text>}
                    {idiomaActual === "portugal" && <Text style={estiloTexto}>Treine todos os dias com o app e aproveite ao máximo o seu kit com escada e cones.</Text>}
                </View>
            </View>

            {/* Consejo 2 */}
            <View style={styles.container__consejos}>
                <AntDesign name="clockcircleo" size={24} color="#34cee6" />
                <View style={{ width: "80%" }}>
                    {idiomaActual === "espana" && <Text style={estiloTexto}>Empieza despacio, perfecciona la técnica y luego aumenta la velocidad.</Text>}
                    {idiomaActual === "italia" && <Text style={estiloTexto}>Inizia piano, perfeziona la tecnica e poi aumenta la velocità.</Text>}
                    {idiomaActual === "francia" && <Text style={estiloTexto}>Commence lentement, perfectionne ta technique puis augmente la vitesse.</Text>}
                    {idiomaActual === "bandera" && <Text style={estiloTexto}>Starte langsam, perfektioniere die Technik und erhöhe dann das Tempo.</Text>}
                    {idiomaActual === "paisesBajos" && <Text style={estiloTexto}>Begin langzaam, perfectioneer je techniek en verhoog dan je snelheid.</Text>}
                    {idiomaActual === "inglaterra" && <Text style={estiloTexto}>Start slow, master your technique, then increase the speed.</Text>}
                    {idiomaActual === "estadosUnidos" && <Text style={estiloTexto}>Start slow, master your technique, then increase the speed.</Text>}
                    {idiomaActual === "portugal" && <Text style={estiloTexto}>Comece devagar, aperfeiçoe a técnica e depois aumente a velocidade.</Text>}
                </View>
            </View>

            {/* Consejo 3 */}
            <View style={styles.container__consejos}>
                <FontAwesome6 name="person-running" size={24} color="#34cee6" />
                <View style={{ width: "80%" }}>
                    {idiomaActual === "espana" && <Text style={estiloTexto}>Usa la escalera y los conos para trabajar agilidad, velocidad y coordinación.</Text>}
                    {idiomaActual === "italia" && <Text style={estiloTexto}>Usa la scala e i coni per allenare agilità, velocità e coordinazione.</Text>}
                    {idiomaActual === "francia" && <Text style={estiloTexto}>Utilise l'échelle et les cônes pour travailler agilité, vitesse et coordination.</Text>}
                    {idiomaActual === "bandera" && <Text style={estiloTexto}>Nutze die Leiter und Hütchen, um Agilität, Geschwindigkeit und Koordination zu trainieren.</Text>}
                    {idiomaActual === "paisesBajos" && <Text style={estiloTexto}>Gebruik de ladder en pionnen om aan behendigheid, snelheid en coördinatie te werken.</Text>}
                    {idiomaActual === "inglaterra" && <Text style={estiloTexto}>Use the ladder and cones to improve agility, speed, and coordination.</Text>}
                    {idiomaActual === "estadosUnidos" && <Text style={estiloTexto}>Use the ladder and cones to improve agility, speed, and coordination.</Text>}
                    {idiomaActual === "portugal" && <Text style={estiloTexto}>Use a escada e os cones para treinar agilidade, velocidade e coordenação.</Text>}
                </View>
            </View>
        </View>
    )
}

const estiloTexto = {
    color: "white",
    letterSpacing: 1,
    fontSize: RFValue(13),
    fontFamily: 'NunitoSans_400Regular',
};

export default TarjetaConsejos
