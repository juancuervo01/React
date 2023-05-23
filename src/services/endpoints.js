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
  const db = getFirestore(app)
  const q = query(collection(db, 'lista_compras'), where('idusuario', '==', idusuario))
  const querySnapshot = await getDocs(q)
  const shoppingList = []
  querySnapshot.forEach((doc) => {
    shoppingList.push({ id: doc.id, ...doc.data() })
  })
  return shoppingList
}

export const deleteList = async (idlista) => {
  const db = getFirestore(app)
  const q = query(collection(db, 'lista_compras'), where('idlista', '==', idlista))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })

  return true
}

export const createList = async (nameList, idusuario) => {
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
    idusuario,
    fecha_lista: serverTimestamp()
  }

  return new Promise((resolve, reject) => {
    addDoc(listaCollection, list)
      .then(() => resolve(list))
      .catch((error) => reject(error))
  })
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
