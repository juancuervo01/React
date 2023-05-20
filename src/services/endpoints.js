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
  deleteDoc
} from 'firebase/firestore'
import { usersMocks } from '@/services/mocks'

export const loginWithEmailAndPassword = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const findUser = usersMocks.find((u) => u.email === email && u.password === password)
      if (!findUser) reject(new Error('Usuario o contraseña incorrectos'))
      resolve(findUser)
    }, 1000)
  })
}

export const getAllFoodMenus = async () => {
  const db = getFirestore(app)
  const q = query(collection(db, 'food-menus'))
  const querySnapshot = await getDocs(q)
  const dailyFoodMenus = []
  querySnapshot.forEach((doc) => {
    dailyFoodMenus.push({ id: doc.id, ...doc.data() })
  })
  return dailyFoodMenus
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

export const deleteTicketHolder = async (id) => {
  const db = getFirestore(app)
  await deleteDoc(doc(db, 'ticket-holders', id))
  return true
}
