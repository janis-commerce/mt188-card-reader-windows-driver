'use strict';

const errors = {};

function Error(name, code, description) {
	this.code = code;
	this.name = name;
	this.description = description;
}

Error.prototype.toString = function() {
	return `Error 0x${this.code.toString(16)} (${this.name}): ${this.description}`;
};

function registerError(name, code, description) {
	if(errors[code] === undefined)
		errors[code] = new Error(name, code, description);
	else
		throw new Error('Error code already registered!');
}

function init() {
	registerError('SCARD_F_INTERNAL_ERROR', 0x80100001, 'An internal consistency check failed.');
	registerError('SCARD_E_CANCELLED', 0x80100002, 'The action was cancelled by an SCardCancel request.');
	registerError('SCARD_E_INVALID_HANDLE', 0x80100003, 'The supplied handle was invalid.');
	registerError('SCARD_E_INVALID_PARAMETER', 0x80100004, 'One or more of the supplied parameters could not be properly interpreted.');
	registerError('SCARD_E_INVALID_TARGET', 0x80100005, 'Registry startup information is missing or invalid');
	registerError('SCARD_E_NO_MEMORY', 0x80100006, 'Not enough memory available to complete this command.');
	registerError('SCARD_F_WAITED_TOO_LONG', 0x80100007, 'An internal consistency timer has expired.');
	registerError('SCARD_E_INSUFFICIENT_BUFFER', 0x80100008, 'The data buffer to receive returned data is too small for the returned data.');
	registerError('SCARD_E_UNKNOWN_READER', 0x80100009, 'The specified reader name is not recognized.');
	registerError('SCARD_E_TIMEOUT', 0x8010000A, 'The user-specified timeout value has expired.');
	registerError('SCARD_E_SHARING_VIOLATION', 0x8010000B, 'The smart card cannot be accessed because of other connections outstanding');
	registerError('SCARD_E_NO_SMARTCARD', 0x8010000C, 'The operation requires a Smart Card, but no Smart Card is currently in the device.');
	registerError('SCARD_E_UNKNOWN_CARD', 0x8010000D, 'The specified smart card name is not recognized.');
	registerError('SCARD_E_CANT_DISPOSE', 0x8010000E, 'The system could not dispose of the media in the requested manner.');
	registerError('SCARD_E_PROTO_MISMATCH', 0x8010000F,
		'The requested protocols are incompatible with the protocol currently in use with the smart card.');
	registerError('SCARD_E_INVALID_VALUE', 0x80100011, 'One or more of the supplied parameters values could not be properly interpreted.');
	registerError('SCARD_E_SYSTEM_CANCELLED', 0x80100012, 'The action was cancelled by the system, presumably to log off or shut down.');
	registerError('SCARD_F_COMM_ERROR', 0x80100013, 'An internal communications error has been detected.');
	registerError('SCARD_F_UNKNOWN_ERROR', 0x80100014, 'An internal error has been detected, but the source is unknown.');
	registerError('SCARD_E_INVALID_ATR', 0x80100015, 'An ATR obtained from the registry is not a valid ATR string.');
	registerError('SCARD_E_NOT_TRANSACTED', 0x80100016, 'An attempt was made to end a non-existent transaction.');
	registerError('SCARD_E_READER_UNAVAILABLE', 0x80100017, 'The specified reader is not currently available for use.');
	registerError('SCARD_P_SHUTDOWN', 0x80100018, 'The operation has been aborted to allow the server application to exit.');
	registerError('SCARD_E_PCI_TOO_SMALL', 0x80100019, 'The PCI Receive buffer was too small.');
	registerError('SCARD_E_READER_UNSUPPORTED', 0x8010001A, 'The reader driver does not meet minimal requirements for support.');
	registerError('SCARD_E_DUPLICATE_READER', 0x8010001B, 'The reader driver did not produce a unique reader name.');
	registerError('SCARD_E_CARD_UNSUPPORTED', 0x8010001C, 'The smart card does not meet minimal requirements for support.');
	registerError('SCARD_E_NO_SERVICE', 0x8010001D, 'The Smart card resource manager is not running.');
	registerError('SCARD_E_SERVICE_STOPPED', 0x8010001E, 'The Smart card resource manager has shut down.');
	registerError('SCARD_E_UNEXPECTED', 0x8010001F, 'An unexpected card error has occurred.');
	registerError('SCARD_E_ICC_INSTALLATION', 0x80100020, 'No Primary Provider can be found for the smart card.');
	registerError('SCARD_E_ICC_CREATEORDER', 0x80100021, 'The requested order of object creation is not supported.');
	registerError('SCARD_E_UNSUPPORTED_FEATURE', 0x80100022, 'This smart card does not support the requested feature.');
	registerError('SCARD_E_DIR_NOT_FOUND', 0x80100023, 'The identified directory does not exist in the smart card.');
	registerError('SCARD_E_FILE_NOT_FOUND', 0x80100024, 'The identified file does not exist in the smart card.');
	registerError('SCARD_E_NO_DIR', 0x80100025, 'The supplied path does not represent a smart card directory');
	registerError('SCARD_E_NO_FILE', 0x80100026, 'The supplied path does not represent a smart card file.');
	registerError('SCARD_E_NO_ACCESS', 0x80100027, 'Access is denied to this file.');
	registerError('SCARD_E_WRITE_TOO_MANY', 0x80100028, 'The smartcard does not have enough memory to store the information.');
	registerError('SCARD_E_BAD_SEEK', 0x80100029, 'There was an error trying to set the smart card file object pointer.');
	registerError('SCARD_E_INVALID_CHV', 0x8010002A, 'The supplied PIN is incorrect.');
	registerError('SCARD_E_UNKNOWN_RES_MNG', 0x8010002B, 'An unrecognized error code was returned from a layered component.');
	registerError('SCARD_E_NO_SUCH_CERTIFICATE', 0x8010002C, 'The requested certificate does not exist.');
	registerError('SCARD_E_CERTIFICATE_UNAVAILABLE', 0x8010002D, 'The requested certificate could not be obtained.');
	registerError('SCARD_E_NO_READERS_AVAILABLE', 0x8010002E, 'Cannot find a smart card reader.');
	registerError('SCARD_E_COMM_DATA_LOST', 0x8010002F, 'A communications error with the smart card has been detected.Retry the operation.');
	registerError('SCARD_E_NO_KEY_CONTAINER', 0x80100030, 'The requested key container does not exist on the smart card.');
	registerError('SCARD_E_SERVER_TOO_BUSY', 0x80100031, 'The Smart card resource manager is too busy to complete this operation.');
	registerError('SCARD_W_UNSUPPORTED_CARD', 0x80100065, 'The reader cannot communicate with the card, due to ATR string configuration conflicts.');
	registerError('SCARD_W_UNRESPONSIVE_CARD', 0x80100066, 'The smart card is not responding to a reset.');
	registerError('SCARD_W_UNPOWERED_CARD', 0x80100067, 'Power has been removed from the smart card, so that further communication is not possible.');
	registerError('SCARD_W_RESET_CARD', 0x80100068, 'The smart card has been reset, so any shared state information is invalid.');
	registerError('SCARD_W_REMOVED_CARD', 0x80100069, 'The smart card has been removed, so further communication is not possible.');
	registerError('SCARD_W_SECURITY_VIOLATION', 0x8010006A, 'Access was denied because of a security violation.');
	registerError('SCARD_W_WRONG_CHV', 0x8010006B, 'The card cannot be accessed because the wrong PIN was presented.');
	registerError('SCARD_W_CHV_BLOCKED', 0x8010006C, 'The card cannot be accessed because the maximum number of PIN entry attempts has been reached.');
	registerError('SCARD_W_EOF', 0x8010006D, 'The end of the smart card file has been reached.');
	registerError('SCARD_W_CANCELLED_BY_USER', 0x8010006E, 'The action  wascanceled by  theuser.');
	registerError('SCARD_W_CARD_NOT_AUTHENTICATED', 0x8010006F, 'No PIN was presented to the Smart card.');
}

init(); // Define errors

module.exports = function(code) {
	if(code === undefined)
		return errors;

	return errors[code] || 'Failure';
};
