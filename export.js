const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json")
});

const db = admin.firestore();

async function exportNivelesToJSListo() {
  // 1. Obtener la colección 'niveles'
  const nivelesCollection = db.collection('niveles');
  const snapshot = await nivelesCollection.get();

  // 2. Extraer los datos de los documentos
  const nivelesData = snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });

  // 3. Formatear como cadena JSON con indentación
  let jsContent = JSON.stringify(nivelesData, null, 2);

  // 4. ELIMINAR COMILLAS DE LAS PROPIEDADES (KEYS)
  // Se usa una expresión regular para encontrar patrones como "clave": y reemplazar por clave:
  jsContent = jsContent.replace(/^[\t ]*"[^"]+":/gm, match => 
    match.replace(/"([^"]+)":/, '$1:')
  );
  
  // 5. Encapsular en el código JavaScript final (exportable)
  const finalContent = `const niveles = ${jsContent};\n\nexport default niveles;`;

  // 6. Escribir el contenido al archivo
  fs.writeFileSync("niveles-listos.js", finalContent);
  console.log("✔ Exportación completa: niveles-listos.js");
}

exportNivelesToJSListo();