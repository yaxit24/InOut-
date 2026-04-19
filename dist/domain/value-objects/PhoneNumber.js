"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumber = void 0;
const InvalidPhoneNumberError_1 = require("../errors/InvalidPhoneNumberError");
class PhoneNumber {
    // Readonly limit the decleration only once, modification is not allowed. as we dont need the obtaned phone to be acessed as well as modified. 
    constructor(value) {
        this.value = value;
    }
    static create(raw) {
        const cleaned = raw.replace(/\s+/g, ''); // Removes all the white spaces, /s(means any white space-space, tab, newline), '+' means one or More, 'g' means replace all matches in the string. 
        // here we are returning the object(: PhoneNumber) here
        // where traditionally we create a object then call a method, like let y = new phonenumber(); phonenumber.create("Dfd")
        // now it happens that the method is called it check validates does error handling then creates the Object. 
        // basically we are validating the logic before the creation. 
        // RealWorld EXample: Think of a factory, PhoneNumber = factory building, constructor = machine inside (hidden), create() = front desk
        //** A factory is something that creates objects for you, instead of you using new directly.
        if (!/^\d{10}$/.test(cleaned)) {
            throw new InvalidPhoneNumberError_1.InvalidPhoneNumberError(raw);
        }
        // ^ = start, \d = a digit from 0-9, {10} = exactly Ten, $ = End of string.
        return new PhoneNumber(cleaned);
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
exports.PhoneNumber = PhoneNumber;
