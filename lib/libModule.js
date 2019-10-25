'use strict';

const ffi = require('ffi');
/* eslint-disable-next-line */
const ref = require('ref'); // Types, pointers, and references in node. More info http://tootallnate.github.io/ref/

const path = require('path');

const types = require('./types');

module.exports = ffi.Library(path.resolve(__dirname, 'dll/Module'), {
	// DLLEXPORT DWORD WINAPI MT188_SelectDevice(char ReaderBuffer[1024], DWORD *ReaderBufferlen)
	MT188_SelectDevice: [types.dword, [ref.types.CString, ref.refType(types.dword)]],

	// DLLEXPORT DWORD WINAPI MT188_Open(char *ReaderName)
	MT188_Open: [types.dword, [ref.types.CString]],

	// DLLEXPORT DWORD WINAPI MT188_Close(char *ReaderName)
	MT188_Close: [types.dword, [ref.types.CString]],


	// -- Magnetic Card

	// DLLEXPORT int WINAPI MT188_ReadMagneticCard(BYTE Track, BYTE Data[256], int *len)
	MT188_ReadMagneticCard: [ref.types.int, [ref.types.byte, ref.refType(ref.types.byte), ref.refType(ref.types.int)]],

	// DLLEXPORT int WINAPI MT188_ClearMagneticCard()
	MT188_ClearMagneticCard: [ref.types.int, []],

	// DLLEXPORT int WINAPI MT188_GetCardType(BYTE *Type, BYTE *Magnetic)
	MT188_GetCardType: [ref.types.int, [ref.refType(ref.types.byte), ref.refType(ref.types.byte)]],

	// -- SIM Card

	// DLLEXPORT int WINAPI MT188_SIM_PowerOn(BYTE SIMNO, BYTE ATR[1024], DWORD *ATRLen)
	MT188_SIM_PowerOn: [ref.types.int, [ref.types.byte, ref.refType(ref.types.byte), ref.refType(types.dword)]],

	// DLLEXPORT int WINAPI MT188_SIM_APDU(BYTE SIMNO, BYTE SendData[1024], int SendDataLen, BYTE RecvData[1024], DWORD *RecvDataLen)
	MT188_SIM_APDU: [ref.types.int, [ref.types.byte, ref.refType(ref.types.int), ref.types.byte, ref.refType(ref.types.byte), ref.refType(types.dword)]],

	// DLLEXPORT int WINAPI MT188_SIM_PowerOff(BYTE SIMNO)
	MT188_SIM_PowerOff: [ref.types.int, [ref.types.byte]],

	// -- TypeA Card
	// DLLEXPORT int WINAPI MT188_RFA_PowerOn(BYTE ATR[1024], DWORD *ATRLen)
	MT188_RFA_PowerOn: [ref.types.int, [ref.refType(ref.types.byte), ref.refType(types.dword)]],

	// DLLEXPORT int WINAPI MT188_RFA_APDU(BYTE SendData[1024], int SendDataLen, BYTE RecvData[1024], DWORD *RecvDataLen)
	MT188_RFA_APDU: [ref.types.int, [ref.refType(ref.types.int), ref.types.int, ref.refType(ref.types.byte), ref.refType(types.dword)]],

	// DLLEXPORT int WINAPI MT188_RFA_PowerOff()
	MT188_RFA_PowerOff: [ref.types.int, []]

});
