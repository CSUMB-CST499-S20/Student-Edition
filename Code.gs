function doGet() {  
  
  var tmp = HtmlService.createTemplateFromFile('dashboard');
  return tmp.evaluate();
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