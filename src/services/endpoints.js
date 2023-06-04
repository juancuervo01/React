import { app } from '@/firebase'
import {
  collection,
  doc,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  deleteDoc,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore'

export const loginWithUsernameAndPassword = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!password) {
        reject(new Error('Clave no válida'))
        return
      }
      const db = getFirestore(app)
      const usuariosCollection = collection(db, 'usuarios')

      const usernameQuery = query(usuariosCollection, where('username', '==', username))
      const passwordQuery = query(usernameQuery, where('clave', '==', password))

      getDocs(passwordQuery)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            reject(new Error('Usuario o contraseña incorrectos'))
          } else {
            const user = querySnapshot.docs[0].data()
            resolve(user)
          }
        })
        .catch((error) => {
          reject(error)
        })
    }, 1000)
  })
}

export const createUserWithUsernameAndPassword = ({ name, username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const db = getFirestore(app)
        const usuariosCollection = collection(db, 'usuarios')

        const querySnapshot = await getDocs(query(usuariosCollection, orderBy('idusuario', 'desc'), limit(1)))

        let newIdusuario = 1 // Valor predeterminado si no hay documentos en la colección

        if (!querySnapshot.empty) {
          const lastDoc = querySnapshot.docs[0]
          const lastIdusuario = lastDoc.data().idusuario
          newIdusuario = lastIdusuario + 1
        }

        const newUser = {
          idusuario: newIdusuario,
          nombre_usuario: name,
          username,
          clave: password
        }

        const docRef = await addDoc(usuariosCollection, newUser)
        resolve({ id: docRef.id, ...newUser })
      } catch (error) {
        reject(error)
      }
    }, 1000)
  })
}

export const getAllShoppingList = async (idusuario) => {
  // devielve todas las listas de compras a partir del id del usuario
  const db = getFirestore(app)
  const q = query(collection(db, 'lista_compras'), where('idusuario', '==', idusuario))
  const querySnapshot = await getDocs(q)
  const shoppingList = []
  querySnapshot.forEach((doc) => {
    shoppingList.push({ id: doc.id, ...doc.data() })
  })
  return shoppingList
}

export const getShoppingList = async (idusuario, idlista) => {
  // devuelve una lista de compras a partir del id del usuario y el id de la lista
  const db = getFirestore(app)
  const q = query(collection(db, 'lista_compras'), where('idusuario', '==', idusuario), where('idlista', '==', idlista))
  const querySnapshot = await getDocs(q)
  const shoppingList = []
  querySnapshot.forEach((doc) => {
    shoppingList.push({ id: doc.id, ...doc.data() })
  })
  return shoppingList
}

export const getProduct = async (idproducto) => {
  // devuelve una lista de compras a partir del id del usuario y el id de la lista
  const db = getFirestore(app)
  const q = query(collection(db, 'productos'), where('idproducto', '==', idproducto))
  const querySnapshot = await getDocs(q)
  const producto = []
  querySnapshot.forEach((doc) => {
    producto.push({ id: doc.id, ...doc.data() })
  })
  return producto
}

export const getIdProductList = async (idlista) => {
  // devuelve los idproducto asociadas a un id de lista
  const db = getFirestore(app)
  const q = query(collection(db, 'lista_producto'), where('idlista', '==', idlista))
  const querySnapshot = await getDocs(q)
  const idPorductList = []
  querySnapshot.forEach((doc) => {
    console.log('endpoints getIdProductList: =>', doc.data().idproducto)
    idPorductList.push(doc.data().idproducto)
  })
  return idPorductList
}

export const getProductbyIds = async (idproductos) => {
  const db = getFirestore(app)
  const productos = []
  for (const idproducto of idproductos) {
    const q = query(collection(db, 'productos'), where('idproducto', '==', idproducto))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      productos.push(doc.data())
    })
  }
  return productos
}

export const getProvedorbyId = async (idproveedores) => {
  // devuelve los proveedores deacuerdo a los idproveedor
  const db = getFirestore(app)
  const productos = []
  for (const idproveedor of idproveedores) {
    const q = query(collection(db, 'proveedores'), where('idproveedor', '==', idproveedor.idproveedor))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      productos.push(doc.data())
    })
  }
  return productos
}

export const getAllProductsList = async () => {
  // devielve todas las listas de compras a partir del id del usuario
  const db = getFirestore(app)
  const q = query(collection(db, 'productos'))
  const querySnapshot = await getDocs(q)
  const allShoppingList = []
  querySnapshot.forEach((doc) => {
    allShoppingList.push(doc.data())
  })
  return allShoppingList
}

export const getAllProveedoresList = async () => {
  // devielve todas las listas de compras a partir del id del usuario
  const db = getFirestore(app)
  const q = query(collection(db, 'proveedores'))
  const querySnapshot = await getDocs(q)
  const allProvedoresList = []
  querySnapshot.forEach((doc) => {
    allProvedoresList.push(doc.data())
  })
  return allProvedoresList
}

export const deleteProductOfList = async (idproducto, idlista) => {
  // elimina un producto de una lista
  const db = getFirestore(app)
  const q = query(
    collection(db, 'lista_producto'),
    where('idproducto', '==', idproducto),
    where('idlista', '==', idlista)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })

  return true
}

export const deleteList = async (idlista) => {
  const db = getFirestore(app)
  const q = query(collection(db, 'lista_compras'), where('idlista', '==', idlista))
  const querySnapshot = await getDocs(q)
  const q1 = query(collection(db, 'lista_producto'), where('idlista', '==', idlista))
  const querySnapshot1 = await getDocs(q1)

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref)
    querySnapshot1.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
  })

  return true
}

export const createProductOnList = async (idproducto, idlista) => {
  // crea una lista
  const db = getFirestore(app)
  const listaCollection = collection(db, 'lista_producto')

  // Consultar si existe la colección
  const collectionSnapshot = await getDocs(listaCollection)
  if (collectionSnapshot.empty) {
    // La colección no existe, crearla
    const docRef = doc(db, 'lista_producto', 'placeholder')
    await setDoc(docRef, {})
  }

  const list_product = {
    idlista: idlista,
    idproducto: idproducto,
    estado: true
  }

  return new Promise((resolve, reject) => {
    addDoc(listaCollection, list_product)
      .then(() => resolve(list_product))
      .catch((error) => reject(error))
  })
}

export const createList = async (nameList, idusuario) => {
  // crea una lista
  const db = getFirestore(app)
  const listaCollection = collection(db, 'lista_compras')

  // Consultar si existe la colección
  const collectionSnapshot = await getDocs(listaCollection)
  if (collectionSnapshot.empty) {
    // La colección no existe, crearla
    const docRef = doc(db, 'lista_compras', 'placeholder')
    await setDoc(docRef, {})
  }

  // Consultar el último documento para obtener el ID
  const q = query(listaCollection, orderBy('idlista', 'desc'), limit(1))
  const querySnapshot = await getDocs(q)

  let newIdlista = 1 // Valor predeterminado si no hay documentos en la colección

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0]
    const lastIdlista = lastDoc.data().idlista
    newIdlista = lastIdlista + 1
  }

  const list = {
    idlista: newIdlista,
    nombre_lista: nameList,
    idusuario: idusuario,
    fecha_lista: serverTimestamp()
  }

  return new Promise((resolve, reject) => {
    addDoc(listaCollection, list)
      .then(() => resolve(list))
      .catch((error) => reject(error))
  })
}

export const createProduct = async (nombre, idProveedor, precio) => {
  // crea un Producto
  const db = getFirestore(app)
  const listaCollection = collection(db, 'productos')

  // Consultar si existe la colección
  const collectionSnapshot = await getDocs(listaCollection)
  if (collectionSnapshot.empty) {
    // La colección no existe, crearla
    const docRef = doc(db, 'productos', 'placeholder')
    await setDoc(docRef, {})
  }

  // Consultar el último documento para obtener el ID
  const q = query(listaCollection, orderBy('idproducto', 'desc'), limit(1))
  const querySnapshot = await getDocs(q)

  let newIdproducto = 1 // Valor predeterminado si no hay documentos en la colección

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0]
    const lastIdproducto = lastDoc.data().idproducto
    newIdproducto = lastIdproducto + 1
  }

  const producto = {
    idproducto: newIdproducto,
    nombre_producto: nombre,
    idproveedor: idProveedor,
    fecha_creacion: serverTimestamp(),
    precio: precio
  }

  return new Promise((resolve, reject) => {
    addDoc(listaCollection, producto)
      .then(() => resolve(producto))
      .catch((error) => reject(error))
  })
}

export const updateList = async (documentId, nombre_lista) => {
  try {
    const db = getFirestore(app)
    const docRef = doc(db, 'lista_compras', documentId)
    await updateDoc(docRef, {
      nombre_lista: nombre_lista
    })
    console.log('Documento actualizado con éxito')
  } catch (error) {
    console.error('Error al actualizar el documento:', error)
  }
}

export const updateProducto = async (documentId, nombre_producto, precio, idproveedor) => {
  try {
    const db = getFirestore(app)
    const docRef = doc(db, 'productos', documentId)
    await updateDoc(docRef, {
      nombre_producto: nombre_producto,
      precio: precio,
      idproveedor: idproveedor
    })
    console.log('Documento actualizado con éxito')
  } catch (error) {
    console.error('Error al actualizar el documento:', error)
  }
}

export const getDailyFoodMenus = async () => {
  const db = getFirestore(app)
  const q = query(collection(db, 'food-menus'), where('isDaily', '==', true))
  const querySnapshot = await getDocs(q)
  const dailyFoodMenus = []
  querySnapshot.forEach((doc) => {
    dailyFoodMenus.push({ id: doc.id, ...doc.data() })
  })
  return dailyFoodMenus
}

export const getFoodMenu = async (id) => {
  const db = getFirestore(app)
  const docRef = doc(db, 'food-menus', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.data()) throw Error('No existe el menú')
  return { ...docSnap.data(), id: docSnap.id }
}

export const getTicketPrice = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(220000)
    }, 200)
  })
}

export const getUsersTickets = async () => {
  const db = getFirestore(app)
  const q = query(collection(db, 'ticket-holders'))
  const querySnapshot = await getDocs(q)
  const ticketHolders = []
  querySnapshot.forEach((doc) => {
    ticketHolders.push({ id: doc.id, ...doc.data() })
  })
  return ticketHolders
}

export const getUserReservers = async () => {
  const db = getFirestore(app)
  const q = query(collection(db, 'reserves'))
  const querySnapshot = await getDocs(q)
  const reserves = []
  querySnapshot.forEach((doc) => {
    reserves.push({ id: doc.id, ...doc.data() })
  })
  return reserves
}

export const createFoodMenu = (foodMenu) => {
  const db = getFirestore(app)
  return new Promise((resolve, reject) => {
    addDoc(collection(db, 'food-menus'), foodMenu)
      .then(() => resolve(foodMenu))
      .catch((error) => reject(error))
  })
}

export const getSettings = async () => {
  const db = getFirestore(app)
  const docRef = doc(db, 'unirestaurant', 'settings')
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export const payTicketHolder = async (ticket) => {
  const db = getFirestore(app)
  await setDoc(doc(db, 'ticket-holders', ticket.id), ticket)
  return ticket
}

export const getTicketHolder = async (id) => {
  const db = getFirestore(app)
  const docRef = doc(db, 'ticket-holders', id)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export const generateReserve = async (reserve) => {
  const db = getFirestore(app)
  await setDoc(doc(db, 'reserves', reserve.id), reserve)
  const washingtonRef = doc(db, 'food-menus', reserve.foodMenu.id)
  await updateDoc(washingtonRef, {
    availables: increment(-1)
  })
  return reserve
}

export const getReserve = async (id) => {
  const db = getFirestore(app)
  const docRef = doc(db, 'reserves', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.data()) throw Error('No existe la reserva')
  return docSnap.data()
}

export const takeOffTicket = async (id) => {
  const db = getFirestore(app)
  const washingtonRef = doc(db, 'ticket-holders', id)
  await updateDoc(washingtonRef, {
    availables: increment(-1)
  })
  return true
}
