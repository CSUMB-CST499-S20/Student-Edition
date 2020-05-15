# GAAME: Student-Edition 

## Table of Content
1. [Overview](#Overview)
2. [Web App Demo](#Web-App-Demo)
3. [Product Spec](#Product-Spec)
4. [Schema](#Schema)

## Overview
### Description
GAAME Student Edition helps students manage their professional and personal schedules to prevent procrastination. The app implemented an automated way for students to create milestones, so students can divide assignments to reduce the stress procrastination that can have on their lives. The app utilizes Google apps to create an all-in-one easy to use web application.

### Members of the team
- Rosario Araujo
- Pernille Dahl
- Yazmin Carrillo
- Ana Santos 

## Web App Demo
#### <a href="https://www.youtube.com/watch?v=4Xoq40Dio5o&feature=youtu.be"> Walkthrough of the Web Application  </a>

## Product Spec
* Login 
  - Must be logged into a CSUMB account 

* Student Dashboard 
  - Student dashboard to keep track of upcoming assignments, important tasks.
  - View graphs and staticits on the student progress. 

* Assignments 
  - Create and view important assignment. 
  - Create new tasks (Integreated with Google Task) 

* Courses 
  - See all assignment based on all of the enrolled courses
  - Integreated with Faculty Edition to retrived assignments from the database 

* Calendar 
  - View google calendar in our web app to prevent leaving the platform 

* Email 
  - Send emails to profesor and students straight from this platform. 

## Schema 
### Models (Google Sheets) 

#### Assignments 
| __Email__| __Title__   | __Course__ | __URL__| __DueDate__| __Milestone1__|__Date1__| __Milestone2__| __Date2__ |
|-------------|------------|----------------|-------------|------------|----------------|------------|----------------|
|ObjectId    | String | Unique id for the users| ObjectId   | String | Unique id for the users|
|username     | String | Name the user chooses for their account| 
|password     |  String|Password for user to access account|
|email        | String|  Email to access Account|
|display_name | String|  Displayed name on profile|
|image        | File |  User profile image|
|description  | String |  Description of the user|


