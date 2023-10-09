const Qrterminal = require("qrcode-terminal")
const { ScanStatus ,log,LOGPRE} = require("wechaty")
module.exports = function onScan(qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')

    log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);

    console.log("\n==================================================================");
    console.log("\n* Two ways to sign on with qr code");
    console.log("\n1. Scan following QR code:\n");

    Qrterminal.generate(qrcode, {small: true})  // show qrcode on console

    console.log(`\n2. Or open the link in your browser: ${qrcodeImageUrl}`);
    console.log("\n==================================================================\n");

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
  // Qrterminal.generate(qrcode, { small: true })
}