import { LightningElement, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class AccountLocatorLWC extends LightningElement {
    searchTerm = 'San Francisco';
    //accounts = [];
    error;
    cols = [
        {
            label: 'Name',
            fieldName: 'Name',
            type: 'text'
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone'
        },
        {
            label: 'Website',
            fieldName: 'Website',
            type: 'url'
        },
        {
            label: 'Action',
            type: 'button',
            typeAttributes: {
                label: 'View details',
                name: 'view_details'
            }
        }
    ];
    @wire(searchAccounts, { searchTerm: '$searchTerm' }) accounts;

    onSearchTermChange(event) {
        this.searchTerm = event.target.value;
        console.log(this.searchTerm);
        /*searchAccounts({ searchTerm: this.searchTerm })
            .then((result) => {
                this.accounts = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.accounts = [];
            });*/
    }
}