public with sharing class SObjectController {
    @AuraEnabled(cacheable=true)
    public static List<String> getOptions() {
        List<String> optionsList = new List<String>();
        try {
            List<Schema.SObjectType> sObjTypeList;
            Map<String, Schema.SObjectType> objMap = Schema.getGlobalDescribe();
            sObjTypeList = objMap.values();
            for(Schema.SObjectType scs : sObjTypeList){
                optionsList.add(scs.getDescribe().getName());
            }
            if(optionsList.size() > 0)
                optionsList.sort();
            //System.debug(optionsList);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return optionsList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Object> lookUpFields(string value){
        List<Object> objectList = [SELECT EntityDefinitionId , Label, DataType  FROM FieldDefinition WHERE EntityDefinitionId =: value];
        return objectList;
    }
}
