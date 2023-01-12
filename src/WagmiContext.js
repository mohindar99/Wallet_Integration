import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [infuraProvider({ apiKey: "fc1e8c48abfd48a6884170d6b8782549" })]
);

// Set up client
const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const WagmiProvider = ({ children }) => {
  return <WagmiConfig client={client}> {children}</WagmiConfig>;
};

export default WagmiProvider;
