public with sharing class LwcAccountSearch {
	 
    @auraEnabled(cacheable=true)
    public static list<Account> searchAcc(String Name, Integer Records){
        String NameLike = '%'+Name+'%';
        
        return [select Id, Name,Website,AccountNumber,Industry,Rating from account where Name Like :NameLike LIMIT :Records];
    }
}