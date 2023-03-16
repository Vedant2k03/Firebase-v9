import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB7oLC7merpn1yhj9XtV0NH4_pCF9mowKk",
    authDomain: "fir-v9-72e89.firebaseapp.com",
    projectId: "fir-v9-72e89",
    storageBucket: "fir-v9-72e89.appspot.com",
    messagingSenderId: "335997032653",
    appId: "1:335997032653:web:c8eb73ef892027d6ccf184"
  };

// initn firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data

onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  }) 

})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })

})

// get a single document

const docRef = doc(db, 'books', '2K3Kha1wf4n4nrctB0iv')

  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  })
