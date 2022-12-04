import { ReceiverType } from "types/notification";
import { test_validateAddress, test_validatePayload } from "./trackedAddressService";
import { expect } from '@jest/globals';

it('throws on false email', () => {
    expect(() => test_validatePayload(ReceiverType.EMAIL, 'invalidemail')).toThrowError('Invalid email');
    expect(() => test_validatePayload(ReceiverType.EMAIL, '@gmail.com')).toThrowError('Invalid email');
})

it('throws on false phone number', () => {
    expect(() => test_validatePayload(ReceiverType.SMS, 'invalidphonenumber')).toThrowError('Invalid phone number');
    expect(() => test_validatePayload(ReceiverType.SMS, '123456789')).toThrowError('Invalid phone number');
});

it('throws on false address', () => {
    expect(() => test_validateAddress('invalidaddress')).toThrowError('Invalid address');
    expect(() => test_validateAddress('0x123456789')).toThrowError('Invalid address');
});

it('throws on false receiver type', () => {
    expect(() => test_validatePayload('invalidtype' as ReceiverType, 'validpayload')).toThrowError('Missing receiverType');
});

it('works with valid payload', () => {
    expect(() => test_validatePayload(ReceiverType.EMAIL, 'foo@mail.com')).not.toThrowError();
    expect(() => test_validatePayload(ReceiverType.SMS, '+15146051583')).not.toThrowError();
});