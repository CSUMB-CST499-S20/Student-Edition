
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
  }else  if(e.parameters.v == "calendar"){
    var tmp = HtmlService.createTemplateFromFile('calendar.html');
    return tmp.evaluate();
  }else if(e.parameters.v == "email") {
    var tmp = HtmlService.createTemplateFromFile('email.html');
    return tmp.evaluate();
  }else if(e.parameters.v == "ilearn"){
    var tmp = HtmlService.createTemplateFromFile('ilearn.html');
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


/**
 * Returns the ID and name of every task list in the user's account.
 * @return {Array.<Object>} The task list data.
 */
function getTaskLists() {
  var taskLists = Tasks.Tasklists.list().getItems();
  Logger.log(taskLists);
  if (!taskLists) {
    return [];
  }
  return taskLists.map(function(taskList) {
    return {
      id: taskList.getId(),
      name: taskList.getTitle()
    };
  });
}

/**
 * Returns information about the tasks within a given task list.
 * @param {String} taskListId The ID of the task list.
 * @return {Array.<Object>} The task data.
 */
function getTasks(taskListId) {
  var tasks = Tasks.Tasks.list(taskListId).getItems(); 
  if (!tasks) {
    return [];
  }
  return tasks.map(function(task) {
    return {
      id: task.getId(),
      title: task.getTitle(),
      notes: task.getNotes(),
      completed: Boolean(task.getCompleted())
    };
  }).filter(function(task) { 
    return task.title
  });
}

/**
 * Sets the completed status of a given task.
 * @param {String} taskListId The ID of the task list.
 * @param {String} taskId The ID of the task.
 * @param {Boolean} completed True if the task should be marked as complete, false otherwise.
 */
function setCompleted(taskListId, taskId, completed) {
  var task = Tasks.newTask();
  if (completed) {
    task.setStatus('completed');
  } else {
    task.setStatus('needsAction');
    task.setCompleted(null);
  }
  Tasks.Tasks.patch(task, taskListId, taskId);
}

/**
 * Adds a new task to the task list.
 * @param {String} taskListId The ID of the task list.
 * @param {String} title The title of the new task.
 */
function addTask(taskListId, title) {
  var task = Tasks.newTask().setTitle(title);
  Tasks.Tasks.insert(task, taskListId);
}


function sendEmail(recipient, subject, message) {
  MailApp.sendEmail(recipient, subject, message);

  return 1;   
}

