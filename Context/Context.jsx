import { deleteUser, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const GlobalContext = ({ children }) => {
    const [userRegistro, setUserRegistro] = useState({
      email: "",
      password: "",
      nombre: "",
      pais: "",
      numeroCamiseta: "",
      posicion: "",
      clubFavorito: "",
      imagenPerfil: "",
      codigoAcceso: "BLC2831",
      access: false
    });
    
    const [usuarioOn, setUsuarioOn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // ✅ AGREGADO
    const [closed, setClosed] = useState(false);
    const [userOnline, setUserOnline] = useState({
        email: ""
    });
    const [idiomaActual, setIdiomaActual] = useState("espana");
    const [paisSeleccionado, setPaisSeleccionado] = useState("inglaterra");

    // ✅ AGREGADO: Verificar sesión de Firebase al iniciar
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Usuario está autenticado
          setUsuarioOn(true);
          setUserOnline({ email: user.email });
          console.log("✅ Usuario autenticado:", user.email);
        } else {
          // Usuario NO está autenticado
          setUsuarioOn(false);
          console.log("❌ Usuario no autenticado");
        }
        // ✅ IMPORTANTE: Marcar como listo DESPUÉS de verificar
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, []);

    // ✅ AGREGADO: Restaurar idioma al iniciar
    useEffect(() => {
      const restaurarIdioma = async () => {
        try {
          const idiomaGuardado = await AsyncStorage.getItem('idiomaActual');
          if (idiomaGuardado) {
            setIdiomaActual(idiomaGuardado);
          }
        } catch (error) {
          console.log("Error al restaurar idioma:", error);
        }
      };
      restaurarIdioma();
    }, []);

    // ✅ AGREGADO: Guardar idioma cada vez que cambia
    useEffect(() => {
      const guardarIdioma = async () => {
        try {
          await AsyncStorage.setItem('idiomaActual', idiomaActual);
        } catch (error) {
          console.log("Error al guardar idioma:", error);
        }
      };
      guardarIdioma();
    }, [idiomaActual]);

    const eliminarUsuarioDeColeccion = async (email) => {
        try {
          const userColecction = collection(db, "usuarios");
          const q = query(userColecction, where("email", "==", email));
          const querySnapshot = await getDocs(q);
      
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
            });
            console.log("✅ Usuario eliminado de la colección.");
          } else {
            console.log("❌ No se encontró usuario con ese correo.");
          }
        } catch (error) {
          console.error("❌ Error al eliminar usuario:", error);
        }
    };

    // ✅ MEJORADO: logout completo
    const logout = async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        setUsuarioOn(false);
        setUserOnline({ email: "" });
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('usuarioOn');
        console.log("✅ Sesión cerrada correctamente");
      } catch (error) {
        console.error("❌ Error al cerrar sesión:", error);
      }
    };

    const eliminarUsuario = async () => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
        
          if (user) {
            await deleteUser(user);
            console.log("✅ Usuario eliminado exitosamente.");
            await eliminarUsuarioDeColeccion(user.email);
            await logout(); // Llamar logout para limpiar todo
          } else {
            console.error("❌ No hay usuario autenticado.");
          }
        } catch (error) {
          console.error("❌ Error al eliminar usuario:", error);
        }
    };

    const data = {
        userRegistro,
        setUserRegistro,
        usuarioOn,
        setUsuarioOn,
        isLoading, // ✅ AGREGADO
        closed,
        setClosed,
        userOnline, 
        setUserOnline,
        idiomaActual,
        setIdiomaActual,
        eliminarUsuario,
        paisSeleccionado,
        setPaisSeleccionado,
        logout, // ✅ AGREGADO
    };

    return (
        <CartContext.Provider value={data}>{children}</CartContext.Provider>
    );
};

export default GlobalContext;