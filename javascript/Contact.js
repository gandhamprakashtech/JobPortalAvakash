// javascript/contact.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC16emUVrwlAVxqALNAvl-xOVNxxbf0X8w",
  authDomain: "avakash-25662.firebaseapp.com",
  projectId: "avakash-25662",
  storageBucket: "avakash-25662.appspot.com", // 👈 corrected bucket (remove `.app`)
  messagingSenderId: "181892515871",
  appId: "1:181892515871:web:84e2c0754e4c4a0b52ed2a",
  measurementId: "G-WM3JQK1SS4",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Handle Contact Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-query").value.trim(); // 👈 fixed ID

    if (!name || !email || !message) {
      alert("❌ Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        message,
        submittedAt: serverTimestamp(),
      });

      alert("✅ Thank you! Your message has been received.");
      document.getElementById("contact-form").reset();
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  });
