import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './RegistroStyles';
import { CartContext } from '../../../Context/Context';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { create, db, login } from '../../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Swing } from 'react-native-animated-spinkit';

// Validación con Yup
const RegistroSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
  tipoUsuario: Yup.string().required('Select a country or language')
});

const Registro = ({ navigation }) => {
  const {
    userRegistro,
    setUserRegistro,
    setUsuarioOn,
    setUserOnline,
    idiomaActual,
    setIdiomaActual,
    paisSeleccionado,
    setPaisSeleccionado
  } = useContext(CartContext);

  const [imagen, setImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Traducciones por idioma
  const textos = {
    espana: {
      email: 'Correo electrónico',
      password: 'Contraseña',
      repeatPassword: 'Repite la contraseña',
      selectLanguage: 'Seleccionar idioma',
      registrar: 'Registrar',
    },
    francia: {
      email: 'E-mail',
      password: 'Mot de passe',
      repeatPassword: 'Répéter le mot de passe',
      selectLanguage: 'Choisir la langue',
      registrar: "S'inscrire",
    },
    italia: {
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Ripeti la password',
      selectLanguage: 'Seleziona la lingua',
      registrar: 'Registrati',
    },
    portugal: {
      email: 'Email',
      password: 'Senha',
      repeatPassword: 'Repetir senha',
      selectLanguage: 'Selecionar idioma',
      registrar: 'Registrar',
    },
    paisesBajos: {
      email: 'E-mail',
      password: 'Wachtwoord',
      repeatPassword: 'Herhaal wachtwoord',
      selectLanguage: 'Taal selecteren',
      registrar: 'Registreren',
    },
    bandera: {
      email: 'E-Mail',
      password: 'Passwort',
      repeatPassword: 'Passwort wiederholen',
      selectLanguage: 'Sprache wählen',
      registrar: 'Registrieren',
    },
    inglaterra: {
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat password',
      selectLanguage: 'Select language',
      registrar: 'Register',
    },
    estadosUnidos: {
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat password',
      selectLanguage: 'Select language',
      registrar: 'Register',
    },
  };

  const idioma = textos[paisSeleccionado] || textos.inglaterra;

  const verificarUsuarioExistente = async (email) => {
    const userColecction = collection(db, 'usuarios');
    const q = query(userColecction, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const crearUsuario = async (usuario) => {
    try {
      const usuarioExistente = await verificarUsuarioExistente(usuario.email);
      if (usuarioExistente) {
        showMessage({
          message: 'User already registered',
          description: 'The entered email is already in use.',
          type: 'danger'
        });
        return;
      }

      await create(usuario.email, usuario.password);
      setUserOnline({ email: usuario.email });
      await login(usuario.email, usuario.password, setUsuarioOn);

      const userColecction = collection(db, 'usuarios');
      await addDoc(userColecction, usuario);

      showMessage({
        message: '✅',
        type: 'success',
        style: {
          height: 100,
          width: 100,
          alignItems: 'center',
          justifyContent: 'center'
        }
      });

      console.log('✅ Usuario creado correctamente:', usuario.email);
    } catch (error) {
      showMessage({
        message: 'Registration error',
        description: error.message || 'Something went wrong. Please try again.',
        type: 'danger'
      });
    }
  };

  const openImagePicker = async () => {
    let permisos = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permisos.granted) {
      alert('Permisos necesarios para acceder a la cámara');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      setImagen(uri);
    }
  };

  const EnviarRegistroUsuario = async (values) => {
    setIsLoading(true);
    try {
      await setIdiomaActual(values.tipoUsuario);

      const datosCompletos = {
        ...userRegistro,
        email: values.email.toLowerCase(),
        password: values.password,
        pais: values.tipoUsuario,
        access: false,
        codigoAcceso: 'BLC2831'
      };

      setUserRegistro(datosCompletos);
      await crearUsuario(datosCompletos);
    } catch (error) {
      console.error('❌ Error en el registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container__inicioSesion}>
      {isLoading && (
        <View style={{ marginVertical: 20 }}>
          <Swing size={48} color="orange" />
        </View>
      )}

      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
          tipoUsuario: ''
        }}
        validationSchema={RegistroSchema}
        onSubmit={values => EnviarRegistroUsuario(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue
        }) => (
          <View style={styles.container__form}>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              placeholderTextColor="black"
              placeholder={idioma.email}
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red' }}>{errors.email}</Text>
            )}

            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              placeholderTextColor="black"
              placeholder={idioma.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red' }}>{errors.password}</Text>
            )}

            <TextInput
              onChangeText={handleChange('repeatPassword')}
              onBlur={handleBlur('repeatPassword')}
              value={values.repeatPassword}
              style={styles.input}
              placeholderTextColor="black"
              placeholder={idioma.repeatPassword}
              secureTextEntry
            />
            {touched.repeatPassword && errors.repeatPassword && (
              <Text style={{ color: 'red' }}>{errors.repeatPassword}</Text>
            )}

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.tipoUsuario}
                onValueChange={(itemValue) => {
                  setFieldValue('tipoUsuario', itemValue);
                }}
                dropdownIconColor="black"
                style={styles.picker}
              >
                <Picker.Item label={idioma.selectLanguage} value="" />
                <Picker.Item label="Español (España)" value="espana" />
                <Picker.Item label="Français (France)" value="francia" />
                <Picker.Item label="Deutsch (Deutschland)" value="bandera" />
                <Picker.Item label="Italiano (Italia)" value="italia" />
                <Picker.Item label="Nederlands (Nederland)" value="paisesBajos" />
                <Picker.Item label="English (United States)" value="inglaterra" />
                <Picker.Item label="Português (Portugal)" value="portugal" />
                <Picker.Item label="United States (USA)" value="estadosUnidos" />
              </Picker>
            </View>
            {touched.tipoUsuario && errors.tipoUsuario && (
              <Text style={{ color: 'red' }}>{errors.tipoUsuario}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.botonLoginUsuario}
              disabled={isLoading}
            >
              <Text style={styles.botonText}>{idioma.registrar}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Registro;
