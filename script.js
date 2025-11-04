const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "schooly.firebaseapp.com",
  projectId: "schooly"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      const uid = user.user.uid;
      db.collection("users").doc(uid).get().then(doc => {
        if (doc.exists && doc.data().role === role) {
          window.location.href = role === "developer" ? "admin.html" : "index.html";
        } else {
          document.getElementById("loginStatus").textContent = "Access denied: role mismatch.";
        }
      });
    })
    .catch(err => {
      document.getElementById("loginStatus").textContent = "Login failed: " + err.message;
    });
});
