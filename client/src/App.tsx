// App.tsx
import { AuthProvider } from "./context/AuthContext";
import RouterApp from "./router";

function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}

export default App;

