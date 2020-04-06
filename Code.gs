function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet(e) {
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('dashboard').evaluate();
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
}

function userAddEntry(aname,course, duedate, milestones) {
  var userEmail = getEmail();
  var calendar = CalendarApp.getCalendarsByName(userEmail)[0];
  var event = calendar.createEvent(aname, new Date(duedate),new Date(duedate));
 
  for (index = 0; index < milestones.length; index += 2) {
    event = calendar.createEvent(aname + ':' + milestones[index], new Date(milestones[index+1]),new Date(milestones[index+1]));
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
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Assignments");
  
  var values = ws.getDataRange().getValues();
  return JSON.stringify(values);
}

function deleteAssignByRow(rowId) {
  var id = "1rOvnjC0Rwk2sC0BMaFMDTXWprUOYZ2NXQAzVjFs5BIg";
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Assignments");
  ws.deleteRow(rowId); 
  
  return 1; 
}

/**
 * Returns the ID and name of every task list in the user's account.
 * @return {Array.<Object>} The task list data.
 */
function getTaskLists() {
  var taskLists = Tasks.Tasklists.list().getItems();
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

function deleteTask(taskListId, taskId) {
  Logger.log(taskListId);
  Logger.log(taskId);
  Tasks.Tasks.remove(taskListId, taskId);
}

function getCalendarBusyDays(){
  var startDate= new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
 
  var userEmail = getEmail();
  var calendar = CalendarApp.getCalendarsByName(userEmail)[0];
  var events = calendar.getEvents(startDate, endDate);

  // we are checking if the timestamp is in the array, if not we add it to the array
  var days = events.map(function(e){return e.getStartTime().setHours(0,0,0,0); });
  
  var days1 = events.map(function(e){return e.getStartTime(); });
  var uniqueDays= [];
  
  days.forEach(function(d){
    if(uniqueDays.indexOf(d) === -1){
      uniqueDays.push(d);
    }
    
     
  }); 
  
  return uniqueDays;
}

function startHours(){
  var startDate= new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
  
  var userEmail = getEmail();
  Logger.log(userEmail);
  var calendar = CalendarApp.getCalendarsByName(userEmail)[0];
  var events = calendar.getEvents(startDate, endDate);

  // we are checking if the timestamp is in the array, if not we add it to the array
  var dates = events.map(function(e){return e.getStartTime().toString();});

  return dates;
}

