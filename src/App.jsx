import WagmiProvider from "./WagmiContext";
import Home from "./home";
function App() {
  return (
    <div>
      <WagmiProvider>
        <Home />
      </WagmiProvider>
    </div>
  );
}

export default App;
