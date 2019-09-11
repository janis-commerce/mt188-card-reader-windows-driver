var cardReader = require('../cardReader');
const CardType = cardReader.CardType;
const MagneticCardType = cardReader.MagneticCardType;
const SIMNumber = cardReader.SIMNumber;

cardReader.selectDevice().then(devices => {
    cardReader.open(devices[0]).then(_ => {
        console.log("Device " + devices[0] + " open.");

        cardReader.getCardType().then(types => {
            switch(types.type) {
                case CardType.NoCardInside:
                    console.log("No card inside card reader");
                    break;
                case CardType.ContactIC:  
                    console.log("Contact IC card inside card reader");

                    cardReader.SIMPowerOn(SIMNumber.ContactCPUCard).then(ATR => {
                        console.log("SIM ATR: "+ ATR);
                        console.log("Send SIM APDU: "+ "00A404000E315041592E5359532E444446303100");
                        cardReader.SIMSendAPDU(SIMNumber.ContactCPUCard, "00A404000E315041592E5359532E444446303100").then(recvData => {
                            console.log("SIM data: "+ recvData);
                            cardReader.SIMPowerOff(SIMNumber.ContactCPUCard).then(_ => {
                                console.log("Power off SIM");
                            }).catch(err => {
                                console.log("Power on SIM failed: " + err.toString());
                            });
                        }).catch(err => {
                            console.log("SIM APDU failed: " + err.toString());
                        });
                    }).catch(err => {
                        console.log("Power on SIM failed: " + err.toString());
                    });
                    
                    break;
                case CardType.ContactlessTypeA:
                    console.log("Contactless Type A card inside card reader");
                    break;
                case CardType.ContactlessTypeB:
                    console.log("Contactless Type B card inside card reader");
                    break;
                case CardType.ContactlessM1:
                    console.log("Contactless M1 card inside card reader");
                    break;
                case CardType.Unidentified:
                    console.log("There is unidentified card inside card reader");
                    break;
            }

            switch(types.magnetic) {
                case MagneticCardType.NoReadableMagneticCardInfo:
                    console.log("No readable magnetic card info");
                    break;
                case MagneticCardType.HasReadableMagneticCardInfo:
                    console.log("Has readable magnetic card info");
                    cardReader.readMagneticCard(cardReader.MagneticCard.Track1).then(data => {
                        console.log("Track 1: " + data);
                    }).catch(err => {
                        console.log("Track 1: " + err.toString());
                    });
            
                    cardReader.readMagneticCard(cardReader.MagneticCard.Track2).then(data => {
                        console.log("Track 2: " + data);
                    }).catch(err => {
                        console.log("Track 2: " + err.toString());
                    });
            
                    cardReader.readMagneticCard(cardReader.MagneticCard.Track3).then(data => {
                        console.log("Track 3: " + data);
                    }).catch(err => {
                        console.log("Track 3: " + err.toString());
                    });
            
                    cardReader.clearMagneticCard().then(_ => {
                        console.log("Clear: succeed");
                    }).catch(err => {
                        console.log("Clear: " + err.toString());
                    });
                    break;
            }
        }).catch(err => {
            console.log("getCardType failed: " + err.toString());
        });

        cardReader.RFAPowerOn().then(ATR => {
            console.log("RFA ATR: "+ ATR);
            console.log("Send RFA APDU: "+ "00A404000E315041592E5359532E444446303100");
            cardReader.RFASendAPDU("00A404000E315041592E5359532E444446303100").then(recvData => {
                console.log("RFA data: "+ recvData);
                cardReader.RFAPowerOff().then(_ => {
                    console.log("Power off RFA");
                }).catch(err => {
                    console.log("Power on RFA failed: " + err.toString());
                });
            }).catch(err => {
                console.log("RFA APDU failed: " + err.toString());
            });
        }).catch(err => {
            console.log("Power on RFA failed: " + err.toString());
        });
    }).catch(err => {
        console.log(err.toString());
    });    
}).catch(err => {
    console.log(err.toString());
});

