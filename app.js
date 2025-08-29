const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const walletAddress = document.getElementById("walletAddress");
const balanceText = document.getElementById("balance");
const status = document.getElementById("status");

let signer, provider;

async function checkConnection() {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      walletAddress.innerText = `Connected: ${address}`;
      await updateBalance(address);
      status.innerText = "Wallet already connected ✅";
      disconnectButton.disabled = false;
    }
  }
}

connectButton.onclick = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      walletAddress.innerText = `Connected: ${address}`;
      await updateBalance(address);
      status.innerText = "Wallet connected ✅";
      disconnectButton.disabled = false;
    } catch (err) {
      console.error(err);
      status.innerText = "Connection failed ❌";
    }
  } else {
    alert("MetaMask not found! Install it first.");
  }
};

disconnectButton.onclick = () => {
  signer = null;
  provider = null;
  walletAddress.innerText = "Not connected";
  balanceText.innerText = "Balance: --";
  status.innerText = "Wallet disconnected 🔌";
  disconnectButton.disabled = true;
};

async function updateBalance(address) {
  const balance = await provider.getBalance(address);
  const ethBalance = ethers.utils.formatEther(balance);
  balanceText.innerText = `Balance: ${ethBalance} ETH`;
}

// Auto check on load
checkConnection();