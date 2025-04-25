
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyCMOe5WGwL2g03J0O08C_H-_LVD1OjTWtg",
    authDomain: "laundrywebapp-71232.firebaseapp.com",
    projectId: "laundrywebapp-71232",
    storageBucket: "laundrywebapp-71232.appspot.com",
    messagingSenderId: "260962124147",
    appId: "1:260962124147:web:be4871909dc42077638506",
    databaseURL: "https://laundrywebapp-71232-default-rtdb.firebaseio.com"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);

  // Render user orders from Firebase Realtime DB
  function renderUserOrdersFromFirebase(uid) {
    const ordersRef = ref(db, `orders/${uid}`);

    onValue(ordersRef, (snapshot) => {
      const tbody = document.getElementById('userOrdersBody');
      tbody.innerHTML = ''; // Clear existing rows

      if (!snapshot.exists()) {
        tbody.innerHTML = '<tr><td colspan="5">No orders found.</td></tr>';
        return;
      }

      const ordersData = snapshot.val();
      Object.entries(ordersData).forEach(([orderId, order]) => {
        const row = document.createElement('tr');

        // Compose service string from services array
        const serviceSummary = order.services.map(s => `${s.serviceName} (${s.count} x KES ${s.unitPrice})`).join(', ');

        // Format pickup & delivery
        const pickupInfo = `${order.pickupDate} @ ${order.pickupTime} - ${order.pickupPlace}`;
        const deliveryInfo = `${order.deliveryDate} @ ${order.deliveryTime}`;

        row.innerHTML = `
          <td>${orderId}</td>
          <td>${serviceSummary}</td>
          <td>${pickupInfo}</td>
          <td>${deliveryInfo}</td>
          <td><strong style="color: ${getStatusColor(order.status)}">${order.status}</strong></td>
        `;

        tbody.appendChild(row);
      });
    });
  }

  // Status color helper
  function getStatusColor(status) {
    if (status === "Pending") return "orange";
    if (status === "Approved") return "blue";
    if (status === "Completed") return "green";
    return "black";
  }

  // Wait for auth state
  document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        renderUserOrdersFromFirebase(user.uid);
      } else {
        alert("You must be logged in to view your orders.");
      }
    });
  });

