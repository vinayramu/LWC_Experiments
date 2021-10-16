import { LightningElement, api } from 'lwc';
import Id from '@salesforce/user/Id';

export default class HelloWorld extends LightningElement {
    @api firstName = "Love";
    @api lastName = "LWC";
    debugger;
    greeting = Id;
    changeHandler(event) {
        this.greeting = event.target.value;
    }
    handleChange(event) {
        const field = event.target.name;
        if (field === 'firstName') {
            this.firstName = event.target.value;
        } else if (field === 'lastName') {
            this.lastName = event.target.value;
        }
    }
    get uppercasedFullName() {
        return `${this.firstName} ${this.lastName}`.toUpperCase();
    }
}