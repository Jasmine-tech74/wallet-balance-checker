const connectButton = document.getElementById("connect");
    const walletDisplay = document.getElementById("wallet");
    const balanceDisplay = document.getElementById("balance");

    connectButton.onclick = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          walletDisplay.innerText = `Wallet: ${address}`;

          const balance = await provider.getBalance(address);
          balanceDisplay.innerText = `Balance: ${ethers.utils.formatEther(balance)} ETH`;
        } catch (err) {
          console.error(err);
          walletDisplay.innerText = "Connection failed!";
        }
      } else {
        alert("MetaMask not found! Install it first.");
      }
    };