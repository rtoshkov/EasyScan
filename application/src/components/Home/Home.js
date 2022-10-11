import {Html5QrcodeScanner} from "html5-qrcode"
import styles from './Home.module.css';
import {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        function onScanSuccess(decodedText, decodedResult) {
            console.log(`Code scanned = ${decodedText}`, decodedResult);
        }
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 10, qrbox: 400}, false);
        html5QrcodeScanner.render(onScanSuccess);
        return () => {
            console.log('CleanYOPOOOO')
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        }
    },[])

    return (
        <div id="qr-reader"></div>
    )
}

export default Home;