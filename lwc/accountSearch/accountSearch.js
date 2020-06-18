import { LightningElement, track } from 'lwc';

import searchAcc from '@salesforce/apex/LwcAccountSearch.searchAcc'

export default class AccountSearch extends LightningElement {

    @track Name;
    @track Records;
    @track myAccounts;
    @track error;
    @track filterString;
    @track filteredAccounts;


    handleNameChange(event) {
        this.Name = event.target.value;

    }

    handleRecordsChange(event) {
        this.Records = event.target.value;
    }

    handleClick() {

        this.myAccounts = '';
        this.error = '';
        this.filteredAccounts = '';

        searchAcc({ Name: this.Name, Records: this.Records })
            .then(result => { this.myAccounts = result })
            .catch(error => { this.error = error })

        this.template.querySelectorAll('lightning-input').forEach(each => {
            if (each.value == this.filterString) {
                each.value = '';
            }

        });

    }

    handleFilterChange(event) {
        this.filterString = event.target.value;
    }

    resultFilter(filterString, masterCopy) {
        let filteredResults;

        return filteredResults = masterCopy.filter(obj => {
            return obj.Name.includes(filterString) == true;
        }, 0);

    }

    handleFilter() {
        this.filteredAccounts = this.resultFilter(this.filterString, this.myAccounts);

    }

    get MyAccountsSize() {
        if (this.myAccounts != undefined) {
            return this.myAccounts.length > 0;
        }
    }

}