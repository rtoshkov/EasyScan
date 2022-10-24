import {Html5QrcodeScanner} from "html5-qrcode"
import styles from './Home.module.css';
import {useEffect} from "react";
import ResultWindow from "../ResultWindow/ResultWindow";

const Home = (props) => {
    useEffect(() => {
        let tempResults = [];

        function onScanSuccess(decodedText, decodedResult) {
            console.log(`Code scanned = ${decodedText}`, decodedResult);
            if (!tempResults.includes(decodedText)) {
                props.setResult(serial => serial.concat(decodedText));
                tempResults.push(decodedText);
            }
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", {fps: 10, qrbox: 250}, false);
        html5QrcodeScanner.render(onScanSuccess);
    }, [])

    return (
        <>
            <div id="qr-reader"></div>
            <ResultWindow results={props.results}></ResultWindow>
        </>
    )
}

export default Home;