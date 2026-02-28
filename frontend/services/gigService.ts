// // Replace this with your computer's IP address (e.g., 192.168.1.50)
// const BASE_URL = 'http://10.0.2.2:3000/api/gigs';

// export const publishGig = async (gigData: any, token: string) => {
//   try {
//     const response = await fetch(`${BASE_URL}/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}` // This proves who is logged in
//       },
//       body: JSON.stringify(gigData),
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("API Error:", error);
//     return { success: false, message: "Network error" };
//   }
// };


// export const getAllGigs = async () => {
//   try {
//     // We use the same 10.0.2.2 IP for the emulator
//     const response = await fetch('http://10.0.2.2:3000/api/gigs', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     return { success: false, data: [] };
//   }
// };



const API_BASE = "http://localhost:3000/api";

// Gigs
export const publishGig = async (gigData: any, token: string) => {
  const response = await fetch(`${API_BASE}/gigs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gigData),
  });
  return await response.json();
};

export const getAllGigs = async () => {
  const response = await fetch(`${API_BASE}/gigs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};