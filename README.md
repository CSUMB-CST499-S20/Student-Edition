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
| Property | Type | 
| ---------|:----:| 
| Email    | email      |   
| Title     | string      | 
| Courses      | sting      |  
| URL      | url      |  
| Due Date      | date      |   
| Milestone 1     | string      |  
| Milestone Duedate 1     | date      |   
| Milestone 2     | string      |  
| Milestone Duedate 2     | date      |  
| Milestone 3     | string      |  
| Milestone Duedate 3     | date      |  


#### Tasks
  
| Property | Type | 
| ---------|:----:| 
| Email    | email      |   
| Description     | string      | 
