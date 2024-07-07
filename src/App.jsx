import AppLayout from "./components/AppLayout";
import { CryptoContextProvider } from "./context/CryptoContext";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
