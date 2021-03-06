import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { Button } from "react-bootstrap";



function WalletConnection(){
    // Create a connector
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
    });
  
    // Check if connection is already established
    if (!connector.connected) {
        // create new session
        connector.createSession();
    }
    
    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
        if (error) {
        throw error;
        }
    
        // Get provided accounts
        const { accounts } = payload.params[0];
    });
    
    connector.on("session_update", (error, payload) => {
        if (error) {
        throw error;
        }
    
        // Get updated accounts 
        const { accounts } = payload.params[0];
    });
    
    connector.on("disconnect", (error, payload) => {
        if (error) {
        throw error;
        }
    });

    return(
        <div>
            <Button variant="info" onClick={connector}>Connect to Wallet</Button>
        </div>
    )
}
export default WalletConnection;