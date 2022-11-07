import {Html5QrcodeScanner} from "html5-qrcode"
import styles from './Home.module.css';
import {useEffect} from "react";
import ResultWindow from "../ResultWindow/ResultWindow";

const Home = (props) => {
    useEffect(() => {
        let tempResults = [];
        const audio = new Audio('/beep.wav');
        function onScanSuccess(decodedText, decodedResult) {
            //TODO Remove console.log
            console.log(`Code scanned = ${decodedText}`, decodedResult);
            if (!tempResults.includes(decodedText)) {
                tempResults.push(decodedText);
                audio.play();
                props.setResult(serial => serial.concat(decodedText));

            }
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", {fps: 10, qrbox: 250}, false);
        html5QrcodeScanner.render(onScanSuccess);
    }, [])

    return (
        <>
            <ResultWindow results={props.results}></ResultWindow>
            <div id="qr-reader"></div>
        </>
    )
}

export default Home;