{!REQUIRESCRIPT("/soap/ajax/31.0/connection.js")} 
//query for the record type, replace Case_Record_One with your case record type DeveloperName 
var rt = sforce.connection.query("Select Id From RecordType Where SobjectType = 'Case' and DeveloperName = 'Product_Request_Type_7'"); 
var records = rt.getArray("records");
var recordtypeID = records[0].Id;

var theNewCase = new sforce.SObject("Case"); 

//change the case record type 
theNewCase.RecordTypeId = recordtypeID; 
theNewCase.subject = "{!Case.Subject}"; 
theNewCase.description = "{!Case.Description}"; 
theNewCase.Target_Application__c = "{!JSENCODE(Case.Target_Application__c)}" 
theNewCase.Description_of_New_Product__c ="  {!JSENCODE(Case.Description_of_New_Product__c)}" 
//add your other fields here 
//.. 

//insert the record
result = sforce.connection.create([theNewCase]);
if (result[0].getBoolean("success")){
  //redirect to new record
  window.location.href = '/'+result[0].id;  
} 
else{ 
	//otherwise show the error message 
 alert("There is an error: "+result); 
}