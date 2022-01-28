import { useState } from "react";
import QRCode from "qrcode";
import notFound from "./images/Artboard 1.png";
import QrReader from "react-qr-reader";

function scanner() {
  const [userName, setUserName] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [scannedResult, setScannedResult] = useState("");

  const errorHandler = (err) => {
    console.log(err);
  };

  const webcamScanHandler = (result) => {
    result ? setScannedResult(result) : setScannedResult(null);
  };
  // qr generator function
  const generateQr = async () => {
    const date = new Date();
    const currentDate = date.toDateString();
    const currentTime = date.toTimeString().split(" ", 1);
    const data = {
      rebel: userName,
      arrivalDate: currentDate,
      arrivalTime: currentTime,
    };

    try {
      // data.rebel?
      const response = data.rebel
        ? await QRCode.toDataURL(JSON.stringify(data))
        : null;
      response ? setQrImage(response) : setQrImage(notFound);
    } catch (error) {
      console.log(error);
    }

    setUserName("");
  };

  return (
    <div className="App">
      <div className="outline">
        <div className="inputGroup">
          <label htmlFor="username">Full Name</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter fullname"
            value={userName}
          />
          <button onClick={() => generateQr()}>Generate Qr Code</button>
        </div>

        <div className="generated">
          {qrImage ? (
            <img
              src={qrImage}
              alt="qr-code"
              width="200px"
              height="200px"
              className="genImage"
            />
          ) : null}
        </div>
      </div>

      <div className="scanner">
        <QrReader
          delay={5000}
          style={{ width: "100px" }}
          onScan={webcamScanHandler}
          onError={errorHandler}
          className="inputGroupScanner"
        />

        <div className="scannerResult">
          {scannedResult ? JSON.stringify(scannedResult) : "Nothing To Show"}
        </div>
      </div>

      <div className="scanner">
        <QrReader
          delay={5000}
          style={{ width: "300px" }}
          onScan={webcamScanHandler}
          onError={errorHandler}
          className="inputGroupScanner"
        />

        <div className="scannerResult">
          {scannedResult ? JSON.stringify(scannedResult) : "Nothing To Show"}
        </div>
      </div>
    </div>
  );
}

export default scanner;
