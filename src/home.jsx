import React from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useBalance,
  useDisconnect,
} from "wagmi";

const Home = () => {
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const { data } = useBalance({
    addressOrName: address,
  });

  const handleWalletConnect = async (connector: Connector) => {
    const { chain } = await connectAsync({ connector });
    console.log(chain);
  };

  const handleDisconnected = () => {
    disconnect();
  };
  return (
    <>
      <h1>Wagmi Tutorial</h1>

      <h3>Welcome</h3>
      {!isConnected && <h4>Connect your wallet</h4>}
      {isConnected && (
        <div>
          <h4>{address}</h4>
          <h5>Your account balance is {data} ETH</h5>
        </div>
      )}

      {!isConnected &&
        connectors.map((connector) => {
          const { id, name } = connector;
          return (
            <button onClick={() => handleWalletConnect(connector)} key={id}>
              {name}
            </button>
          );
        })}
      {isConnected && <button onClick={handleDisconnected}> Disconnect</button>}
    </>
  );
};

export default Home;
