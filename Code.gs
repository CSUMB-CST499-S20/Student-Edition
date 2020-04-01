// @OnlyCurrentDoc
function doGet(e) {  
  
  if(e.parameters.v == "dashboard"){
    var tmp = HtmlService.createTemplateFromFile('dashboard.html');
    return tmp.evaluate();
  }else if(e.parameters.v == "assignments"){
    var tmp = HtmlService.createTemplateFromFile('todolist.html');
    return tmp.evaluate();
  }else if(e.parameters.v == "courses"){
    var tmp = HtmlService.createTemplateFromFile('courses.html');
    return tmp.evaluate();
  }else  if((e.parameters.v == "calendar")){
    var tmp = HtmlService.createTemplateFromFile('calendar.html');
    return tmp.evaluate();
  }else if(e.parameters.v == "email") {
    var tmp = HtmlService.createTemplateFromFile('email.html');
    return tmp.evaluate();
  }else {
    return HtmlService.createHtmlOutput("<h1> Error </h1>");
  }
  
  
}

function userAddEntry(aname, duedate, milestones, email, apemail) {

  Logger.log ("Called addEntery with " + duedate + " " + aname + " " + milestones);
  var calendar = CalendarApp.getCalendarsByName("Avoid Procrastination")[0];
  
  Logger.log(calendar.getName());
  
  var event = calendar.createAllDayEvent(aname, new Date(duedate));
  Logger.log('Event ID '+ event.getId());
  event.addGuest(email);
  event.addGuest(apemail);
  event.setGuestsCanModify(true);
  
  for (index = 0; index < milestones.length; index += 2) {
    Logger.log(milestones[index]+" "+milestones[index+1]);
    event = calendar.createAllDayEvent(aname + ':' + milestones[index], new Date(milestones[index+1]));
    Logger.log('Event ID '+ event.getId());
    event.addGuest(email);
    event.addGuest(apemail);
    event.setGuestsCanModify(true);
  }
  
  return 1357;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getEmail() {
  return Session.getActiveUser().getEmail();
}

function getEmailString() {
  return JSON.stringify(Session.getActiveUser().getEmail());
}

function getProfilePic() {
  var profile = People.People.get('people/me', {
    personFields: 'photos'
  });
  
  Logger.log(profile["photos"][0]["url"]); 
  
  return profile["photos"][0]["url"]; 
}

function getValuesFromForm(form){
  var id = "1rOvnjC0Rwk2sC0BMaFMDTXWprUOYZ2NXQAzVjFs5BIg";
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Assignments");
  ws.appendRow([getEmail(), form["title"], form["course"], form["url"], form["duedate"], form["milestone1"], form["date1"],
                form["milestone2"], form["date2"], form["milestone3"], form["date3"]]);
}
function getColumnsFromSheet() {
  var id = "1rOvnjC0Rwk2sC0BMaFMDTXWprUOYZ2NXQAzVjFs5BIg";
  Logger.log(id);
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Assignments");
  
  var values = ws.getDataRange().getValues();
  Logger.log(values);
  return JSON.stringify(values);
}