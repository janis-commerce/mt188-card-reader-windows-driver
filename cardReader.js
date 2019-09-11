var ref = require('ref');

var error = require('./error');
var types = require('./types');
var libModule =  require('./libModule');

/**
 * Get connected device list
 */
exports.selectDevice = function () {
    return new Promise(function(resolve, reject) {

        // char ReaderBuffer[1024]
        var readerBuffer = Buffer.alloc(1024, 0);
        // DWORD *ReaderBufferlen
        var readerBufferlen = ref.alloc(types.dword);

        var ret = libModule.MT188_SelectDevice(readerBuffer, readerBufferlen);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var devices = [];
            var offset = 0;
            var length = ref.deref(readerBufferlen);

            while(offset < length - 1) { // list trailing zero
                var device = ref.readCString(readerBuffer, offset);
                devices.push(device);
                offset += device.length + 1; // string trailing zero
            }

            resolve(devices);
        }
    });
}

/**
 * Can communicate with device only when connection succeeds.
 * @param {string} readerName  name of device waiting for connection
 */
exports.open = function (readerName) {
    return new Promise(function(resolve, reject) {

        var readerNameCStr = ref.allocCString(readerName);
        var ret = libModule.MT188_Open(readerNameCStr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            resolve();
        }
    });
}

/**
 * Disconnection for device
 */
exports.close = function () {
    return new Promise(function(resolve, reject) {
        var ret = libModule.MT188_Close();

        if(ret != 0) {
            reject(error(ret));
        } else {
            resolve();
        }
    });
}

/**
 * Magnetic card tracks
 */
exports.MagneticCard = {
    Track1: 0x31,
    Track2: 0x32,
    Track3: 0x33
}

/**
 * Read data from specified track
 * @param {byte} track Track option: MagneticCard.Track1, MagneticCard.Track2, MagneticCard.Track3
 */
exports.readMagneticCard = function(track) {
    return new Promise(function(resolve, reject) {

        //BYTE Data[1024] = {0};
        var data = Buffer.alloc(1024, 0);
        //int Len = 0;
        var lenIntPtr = ref.alloc(ref.types.int, 0);

        var ret = libModule.MT188_ReadMagneticCard(track, data, lenIntPtr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var len = ref.deref(lenIntPtr);
            if(len == 0x02) {
                var firstByte = ref.get(data, 0, ref.types.byte);                  
                if (firstByte == 0xE1 || firstByte == 0xE2 || firstByte == 0xE3) {
                    reject("Failure");
                }
            } else {
                var str = ref.readCString(data, 0);
                resolve(str);
            }
        }
    });
}

/**
 * Clear buffer area of magnetic card
 */
exports.clearMagneticCard = function() {
    return new Promise(function(resolve, reject) {
        var ret = libModule.MT188_ClearMagneticCard();

        if(ret != 0) {
            reject(error(ret));
        } else {
            resolve();
        }
    });
}

const CardType = {
    NoCardInside: 0x30,
    ContactIC: 0x31,
    ContactlessTypeA: 0x32,
    ContactlessTypeB: 0x33,
    ContactlessM1: 0x34,
    Unidentified: 0x3f
}

exports.CardType = CardType;

const MagneticCardType = {
    NoReadableMagneticCardInfo: 0x30,
    HasReadableMagneticCardInfo: 0x31
}

exports.MagneticCardType = MagneticCardType;

/**
 * Get card type inside card reader
 */
exports.getCardType = function() {
    return new Promise(function(resolve, reject) {
        // BYTE *Type
        var typeBytePtr = ref.alloc(ref.types.byte, 0);

        // BYTE *Magnetic
        var magneticBytePtr = ref.alloc(ref.types.byte, 0);

        var ret = libModule.MT188_GetCardType(typeBytePtr, magneticBytePtr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var type = ref.deref(typeBytePtr);
            var magnetic = ref.deref(magneticBytePtr);

            resolve({
                type: type,
                magnetic: magnetic
            });
        }
    });
}

const SIMNumber = {
    ContactCPUCard: 0,
    SIM1: 1,
    SIM2: 2,
    SIM3: 3,
    SIM4: 4
}

exports.SIMNumber = SIMNumber;

/**
 * SIM card activation
 * @param {SIMNumber} SIMNo Card slot number.
 */
exports.SIMPowerOn = function (SIMNo) {
    return new Promise(function(resolve, reject) {
        // BYTE ATR[1024]
        var ATRBuffer = Buffer.alloc(1024, 0);

        // DWORD *ATRLen
        var ATRLenDWordPtr = ref.alloc(types.dword, 0);

        var ret = libModule.MT188_SIM_PowerOn(SIMNo, ATRBuffer, ATRLenDWordPtr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var len = ref.deref(ATRLenDWordPtr) * 2; // Warning! Legnth is wrong informed, or doesnt match demo app. We're getting half of the value.
            var ATR = ATRBuffer.toString('hex').substr(0, len);
            resolve(ATR);
        }
    });
}

/**
 * SIM card data transfer command
 * @param {SIMNumber} SIMNo Card slot number.
 */
exports.SIMSendAPDU = function (SIMNo, sendData) {
    return new Promise(function(resolve, reject) {
        // BYTE SendData[1024]
        var sendDataBuffer = Buffer.from(sendData, 'hex');
        
        // BYTE RecvData[1024]
        var recvDataBuffer = Buffer.alloc(1024, 0);

        // DWORD *RecvDataLen
        var recvDataLenDWordPtr = ref.alloc(types.dword, 0);
        
        var ret = libModule.MT188_SIM_APDU(SIMNo, sendDataBuffer, sendData.length / 2, recvDataBuffer, recvDataLenDWordPtr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var len = ref.deref(recvDataLenDWordPtr) * 2; // Warning! Legnth is wrong informed, or doesnt match demo app. We're getting half of the value.
            var recvData = recvDataBuffer.toString('hex').substr(0, len); 
            resolve(recvData);
        }
    });
}

/**
 * SIM card power off
 * @param {SIMNumber} SIMNo Card slot number.
 */
exports.SIMPowerOff = function (SIMNo) {
    return new Promise(function(resolve, reject) {
        var ret = libModule.MT188_SIM_PowerOff(SIMNo);

        if(ret != 0) {
            reject(error(ret));
        } else {
            resolve();
        }
    });
}

/**
 * RFA card activation
 */
exports.RFAPowerOn = function () {
    return new Promise(function(resolve, reject) {
        // BYTE ATR[1024]
        var ATRBuffer = Buffer.alloc(1024, 0);

        // DWORD *ATRLen
        var ATRLenDWordPtr = ref.alloc(types.dword, 0);

        var ret = libModule.MT188_RFA_PowerOn(ATRBuffer, ATRLenDWordPtr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var len = ref.deref(ATRLenDWordPtr) * 2; 
            var ATR = ATRBuffer.toString('hex').substr(0, len);
            resolve(ATR);
        }
    });
}

/**
 * RFA card data transfer, confirm activation succeeded before execution.
 */
exports.RFASendAPDU = function (sendData) {
    return new Promise(function(resolve, reject) {
        // BYTE SendData[1024]
        var sendDataBuffer = Buffer.from(sendData, 'hex');
        
        // BYTE RecvData[1024]
        var recvDataBuffer = Buffer.alloc(1024, 0);

        // DWORD *RecvDataLen
        var recvDataLenDWordPtr = ref.alloc(types.dword, 0);
        
        var ret = libModule.MT188_RFA_APDU(sendDataBuffer, sendData.length / 2, recvDataBuffer, recvDataLenDWordPtr);

        if(ret != 0) {
            reject(error(ret));
        } else {
            var len = ref.deref(recvDataLenDWordPtr) * 2;
            var recvData = recvDataBuffer.toString('hex').substr(0, len); 
            resolve(recvData);
        }
    });
}

/**
 * RFA card power off
 */
exports.RFAPowerOff = function () {
    return new Promise(function(resolve, reject) {
        var ret = libModule.MT188_RFA_PowerOff();

        if(ret != 0) {
            reject(error(ret));
        } else {
            resolve();
        }
    });
}