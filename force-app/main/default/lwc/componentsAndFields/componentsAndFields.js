import { LightningElement, track, wire } from 'lwc';
import getOptions from '@salesforce/apex/SObjectController.getOptions';
import lookUpFields from '@salesforce/apex/SObjectController.lookUpFields';

//export class name for componentsAndFields will be ComponentsAndFields
export default class ComponentsAndFields extends LightningElement {
    @track items = [];
    @track value;
    @track error;
    rowOffset = 0;
    @wire(getOptions)
    optionsList({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i], label: data[i] }];
            }
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
        }
    }
    cols = [
        {
            label: 'Object Name',
            fieldName: 'EntityDefinitionId',
            type: 'text'
        },
        {
            label: 'Field',
            fieldName: 'Label',
            type: 'text'
        },
        {
            label: 'Data Type',
            fieldName: 'DataType',
            type: 'text'
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

    @wire(lookUpFields, { value: '$value' }) objectList;

    get options() {
        return this.items;
    }
    get isValueSet() {
        if (this.value)
            return true;
        return false;
    }

    handleChange(event) {
        this.value = event.detail.value;
        console.log(event.detail.value);
    }
    onRowAction(event) {
        let objName = event.detail.row.EntityDefinitionId;
        let fldName = event.detail.row.Label;
        console.log(objName, " ", fldName);
        //debugger;
    }
}
