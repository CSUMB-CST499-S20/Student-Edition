function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet(e) {
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('dashboard').evaluate().setTitle('GAAME');
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setTitle('GAAME');
}

function userAddEntry(aname,course, duedate, milestones) {
  var userEmail = getEmail();
  var calendar = CalendarApp.getCalendarsByName(userEmail)[0];
  var event = calendar.createEvent(aname + ": is Due Today", new Date(duedate),new Date(duedate));
 
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
  var id = "1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0";
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Assignments");
  ws.appendRow([getEmail(), form["title"], form["course"], form["url"], form["duedate"], form["milestone1"], form["date1"],
                form["milestone2"], form["date2"], form["milestone3"], form["date3"]]);
}
function getColumnsFromSheet() {
  var id = "1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0";
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Assignments");
  
  var values = ws.getDataRange().getValues();
  return JSON.stringify(values);
}

function deleteAssignByRow(rowId) {
  var id = "1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0";
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
    //if(!uniqueDays){
      // $('.datepicker-day-button').addClass("disabled");
    //}
     
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





// FACULTY TEAM COURSE CODE BELOW 


//********************************************************************************************************
//                                  FUNCTION TO SET UP THE WEBPAGE                                       *
//********************************************************************************************************
//function doGet(e) {  
 //return HtmlService.createTemplateFromFile('courses').evaluate();
//}

//********************************************************************************************************
//                              FUNCTION TO INCLUDE CSS AND SCRIPT FILE                                  *
//********************************************************************************************************
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

//********************************************************************************************************
//                          FUNCTION TO GET ALL THE COURSES A STUDENT IS TAKING                          *
//********************************************************************************************************
function getCourses(){

  //GETTING STUDENTS EMAIL
  var studentEmail = Session.getActiveUser().getEmail();
  
  //ARRAY OF COURSES STUDENT IS TAKING
  var courseArray = [];
  
  //GETTING DATA BASE AND ITS INFORMATION
  var master = SpreadsheetApp.openById("1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0");
  var sheet = master.getSheetByName("Assingments");
  var numRows = sheet.getLastRow();
  var data = sheet.getRange(1,7, numRows).getValues();
  var len = data.length
  
  //CHECKING IF THE COURSESECTION IS FOUND IN DATABASE
  for(var i = len-1 ; i >0 ; i--){
    sheet = master.getSheetByName(data[i][0]);
    //CALLING 'checkStudent' FUNCTION
    if(checkStudent(sheet,studentEmail) == true){
      var len = courseArray.length
      var found = false
      //CHECKING IF COURSE IS NOT ALREADY IN ARRAY
      for(var x = 0; x < len; x++){
        if(courseArray[x] == data[i][0]){
          found = true;
        }
      }
      if(found == false){
        courseArray.push([data[i][0]]);
      }
    }
  }
  return courseArray;
}

//********************************************************************************************************
//                      FUNCTION THAT WILL CHECK IF THE STUDENT IS FOUND IN THAT COURSE                  *
//********************************************************************************************************
function checkStudent(sheet,studentEmail){
  
  var numRows = sheet.getLastRow();
  var numColumns = sheet.getLastColumn();
  var emaildata = sheet.getRange(1,1,numRows,numColumns).getValues();
  var emailLen = emaildata.length;
  
  
  //CHECK WHAT ROW THE STUDENT IS ON
  var studentRow = -1;
  for(var i = emailLen-1; i > 0 ; i--){  
    if(emaildata[i][2] == studentEmail){
      return true;
    }
  }
  return false;
}

//********************************************************************************************************
//                      FUNCTION TO GET THE ASSIGNMENTS THAT CORRELATE WITH THE COURSE                   *
//********************************************************************************************************
function getAssignments(courseSection){  
  var master = SpreadsheetApp.openById("1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0");
  var sheet = master.getSheetByName("Assingments");
  var numRows = sheet.getLastRow();
  var numColumns = sheet.getLastColumn();
  var data = sheet.getRange(1,1, numRows,numColumns).getValues();
  var len = data.length
  
  var date = Utilities.formatDate(new Date(), "GMT+1", "MM/dd/yyyy");
  var assignmentInfo = "";
  var AssignmentList = [];
    
  //*********** DATE CHECKER TO SEE IF ASSIGNMENT ALREADY PASSED ***********
  for(var i = len - 1 ; i > 0 ; i--){
    if(courseSection == data[i][6]){
      var dueDate = Utilities.formatDate(data[i][5], "GMT+1", "MM/dd/yyyy");
      assignmentInfo = data[i][2] + " - "+data[i][6]+ " - "+dueDate
      AssignmentList.push([assignmentInfo]);
    }
  }
  
  return AssignmentList
}

//********************************************************************************************************
//                      FUNCTION TO GET THE INSTRUCTOR LINK AND RETURN IT FOR DISPLAY                    *
//********************************************************************************************************
function getInstructorLink(AssignmentName,courseSection,dueDate){
  
  var master = SpreadsheetApp.openById("1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0");
  var sheet = master.getSheetByName("Assingments");
  var numRows = sheet.getLastRow();
  var numColumns = sheet.getLastColumn();
  var data = sheet.getRange(1,1, numRows,numColumns).getValues();
  var len = data.length
    
  var instructorLink = "";
  
  
  for(var i = len - 1 ; i > 0 ; i--){
    var sheetDate = Utilities.formatDate(data[i][5], "GMT+1", "MM/dd/yyyy");
    if(AssignmentName == data[i][2] && courseSection == data[i][6] && dueDate == sheetDate){
      instructorLink = data[i][3];
      return instructorLink;
    }
  }
  return instructorLink;
}

//********************************************************************************************************
//                              FUNCTION TO SET STUDENT AS VIEWED                                        *
//********************************************************************************************************
function storeStudentViewed(instructorLink,assignmentName,CourseSectionName, dueDate){
  var studentEmail = Session.getActiveUser().getEmail();
  
  var master = SpreadsheetApp.openById("1ZTBkSj5Mqpn8WMCZXeg3gHh8EehHXZ3m0NJURoOSqp0");
  var sheet = master.getSheetByName(CourseSectionName); 
  
  var numColumns = sheet.getLastColumn();
  var data = sheet.getRange(1,1,1,numColumns).getValues();
  var len = data[0].length;
  
  //CHECK WHAT COLUMN ASSIGNMENT IS ON
  var assingmentColumn = 0;
  for(var i = len-1; i >= 0 ; i--){  
    Logger.log(data[0][i]);
    if(assignmentName == data[0][i]){
      assingmentColumn = i+1;
      Logger.log("ASSIGNMENT COLUMN: "+assingmentColumn);
      break;
    }
  }
  
  var numRows = sheet.getLastRow();
  var emaildata = sheet.getRange(1,1,numRows,numColumns).getValues();
  var emailLen = emaildata.length;
  Logger.log("EMAIL LEN: "+ emailLen);
  
  //CHECK WHAT ROW THE STUDENT IS ON
  var studentRow = 0;
  for(var i = emailLen-1; i > 0 ; i--){  
    if(emaildata[i][2] == studentEmail){
      studentRow = i + 1;
      Logger.log("STUDENT ROW: "+studentRow)
    }
  }
  
  //UPDATING DATES WHEN STUDENT VIEW DOCUMENT
  
  var setViewed = sheet.getRange(studentRow,assingmentColumn).getValue();
  var date = Utilities.formatDate(new Date(), "GMT+1", "MM/dd/yyyy");
  if(setViewed == ""){
    setViewed = "VIEWED - "+ date;
    Logger.log(setViewed);
    sheet.getRange(studentRow,assingmentColumn).setValue(setViewed);
  }
  else{
    var lastDate = setViewed.slice(-10);
    Logger.log(lastDate);
    
    if(lastDate != date){
      var addDate = setViewed + ", "+date;
      sheet.getRange(studentRow,assingmentColumn).setValue(addDate);
    }
  }
  
}

function newTaskList(taskList) {
  var taskList = Tasks.newTaskList().setTitle(taskList);
  Tasks.Tasklists.insert(taskList);
}



