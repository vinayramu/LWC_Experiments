public with sharing class AccountSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(string searchTerm){
        List<Account> accounts = new List<Account>();
        try {
            System.debug('searchTerm : ' + searchTerm);
            if(string.isNotBlank(searchTerm) && searchTerm.length() > 1){
                List<List<sObject>> searchResults = [FIND :searchTerm 
                                                         RETURNING Account(
                                                            Id, Name, Phone, Website,
                                                            BillingStreet, BillingCity,
                                                            BillingState, BillingPostalCode
                                                            ORDER BY Name
                                                            LIMIT 10
                                                                         )
                                                    ];
                accounts = searchResults[0];
                System.debug(accounts.size());
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return accounts;
    }
}
