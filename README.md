# FlightBoard-client

A flight management system, including a client side (React) and a server side (ASP.NET Core). The system allows flights to be displayed, added, deleted, filtered and updated in real time using SignalR.

---

## 🚀 Installation and running instructions


### ✅ Client side (Frontend - React)

1. Open the client folder:

```
cd FlightBoardApp/flight_board_client
```

2. Install the packages:

```
npm install
```

3. Run the application:

```
npm start
```

> The application will open at: `http://localhost:3000`

---

## 🧱 Architectural explanation

- **Frontend**:
- Based on React 18.
- Using **React Query** to manage state from the server.
- Using **Redux Toolkit** to manage UI (such as filtering flights, models).
- **Axios** for HTTP calls.
- **SignalR** for live flight updates.

- **Communication**:
- REST API between the frontend and backend.
- SignalR for live broadcasts from the server to the client (such as adding a flight in real time).

---

## 📦 Third-party packages

### Frontend:

- `react`
- `@reduxjs/toolkit`
- `react-redux`
- `react-query`
- `axios`
- `@microsoft/signalr`
- `antd` (or `@mui/material` if applicable)


## ✨ Project creator

**Rinat skinny**
[rinat6687@gmail.com](mailto:rinat6687@gmail.com)
