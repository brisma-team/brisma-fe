import QRCode from "react-qr-code";
const QRGenerator = ({ value, size }) => {
  return <QRCode value={value} size={size || 256} />;
};

export default QRGenerator;
