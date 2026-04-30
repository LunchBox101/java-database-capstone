# User Story Template

**Title:**
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]

## Admin User Stories
**Story 1: Admin Login**
As a admin, i want to login user my username and password, so that I can manage the platform securely_

**Acceptance Criteria:**
1. Admin most provide a correct username and password
2. if user give bad either username or password there should be a failer message and can try again
3. if successful password user should be able to land on the Admin Dashboard.

**Priority:** High
**Story Points:** 5
**Notes:**
- Protect against SQL injection
- Protect against brute force attacks (limit login attempts)

**story 2: Admin Logout**
As an admin, I want to be able to logout from the portal once done, so that I can protect system access

**Acceptance Criteria:**
1. Frontend must provide a logout button so a admin can logout
2. Backend should design a endpoint to logout the user
3. Upon logout, the JWT token should be invalidated and the user redirected to the login page

**Priority:** High
**Story Points:** 3
**Notes:**
- if users token is already invalid or blacklist to not call backend

**story 3:Add user/Doctor**
As an admin, I want to be able to add a Doctor, so a Doctor can access the portal

**Acceptance Criteria:**
1. Frontend must provide a form with fields for doctor's name, username, password, email, and specialty
2. Backend must create an endpoint that will handle the logic to add a doctor to mysql
3. this endpoint should be protected so only admins can call it

**Priority:** Medium
**Story Points:** 5
**Notes:**
- we shouldn't allow the same Doctor to be added twice

**Story 4:Remove Doctor**
As a admin, I want to be able to remove a Doctor, so that given Doctor can no longer access the portal

**Acceptance Criteria:**
1. Frontend must display a list of doctors where admin can select one and confirm deletion via a confirmation dialog
2. Backend create a secure admin only endpoint from remove a given doctor for mysql
3. if a doctor doesn't exist the admin should receive a message

**Priority:** Medium
**Story Points:** 3
**Notes:**
- when successful the user name should be remove from the UI

**Story 5: stored procedure get number appointments/usage statistic**
As a admin, I want to press a button, so that I can get the number of appointment and track usage statistics
**Acceptance Criteria:**
1. Frontend create a button that will call a endpoint that will return a page to desplay data
2. backand create endpoint to call a stored procedure that returns data that we hand the data to Thymeleaf which returns to user
3. Database work to create stored procedure that gets the month of appointments and track the usage statistics

**Priority:** High
**Story Points:** 8
**Notes:**
- if appointments are none. appointments should return 0;
## Patient User Stories
**Story 6: lists of Doctors**
As a patient, I want to get a list of Doctors and there specialtys without logging in or register, so that i can explore my options

**Acceptance Criteria:**
1. Frontend design a page allowing a patient to view the doctors and there specialtys
2. Backend Get endpoint that return only the Doctors name and there specialtys
3. this shouldn't be restrictive to a user role since no registration is required

**Priority:** High
**Story Points:** 2
**Notes:**
- No unneed information should be returned to the this endpoint

**Story 7: Patient register**
As a patient, I want to register in with my email and a password, so i can login
**Acceptance Criteria:**
1. Frontend create UI where a patient can sign up using a email and password.
2. Beckend needs to be about to register the patient bu there email and password
5. email and password needs to be stored in the database

**Priority:** High
**Story Points:** 3
**Notes:**
- should check if given email already exists
- don't create a new account if user already exist

**Story 8: Patient manage appointments**
As a patient, I want to login in to the portal, to manage my appointment
**Acceptance Criteria:**
1. Frontend create UI where a patient can sign in using a email and password.
2. Frontend will login in to portal where Frontend will display there appointments
2. Beckend needs to be check login creds and provide the needed apointments

**Priority:** High
**Story Points:** 5
**Notes:**
- should only be providing avaliable appointments for the giving doctor they want.
- successful login shoudl take then to the appointments page

**Story 9: book appointments**
as a patient, i want to be able to see avaiable appointments. so that i can pick one

**Acceptance Criteria:**
1. the appointments page should provide avaliable appointments
2. patient should be able to schdule one hour appointments by selecting a date and time and confirming.
3. backend should handle updating the appointment in the database as unavaliable
3. backend should also make sure that the appointment is still avaliable before make is unavaliable

**Priority:** High
**Story Points:** 5
**Notes:**
- page should update making that appointment as unavaliable and they confirm 

## Doctor User Stories
**Story 10: view my apppointments**
As a patient, I want to see my upcoming appointments, so i can prepare according.

**Acceptance Criteria:**
1. Backend well create a Get endpoint that will return the users/patients appointments
2. Frontend will display appointments from the sonnest to the ferthist
3. backend will retrive appointments from Mongdb

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Most only provide the given patients appointments not other patients

**Story 11: Doctor login**
_As a [user role], I want [feature/goal], so that [reason]._
as a Doctor, I want to login in user my email and password, so i can get on to the secure portal 

**Acceptance Criteria:**
1. backend loging identify between patient and doctor by email and password
2. Frontend should have rules on what a user can see and do determined by patient or doctor
3. verify the email and password

**Priority:** High
**Story Points:** 3
**Notes:**
- same notes to admin login ticket

**Story 12: Doctor logout**
As a Doctor, I want to be able to logout, so that I can protext my data

**Acceptance Criteria:**
1. Frontend will provide a button that a Doctor can press to logout
2. backend logout function form admin should work with the logout

**Priority:** High
**Story Points:** 2
**Notes:**
- see notes for ticket admin logout

**Story 13: see appointment**
As a Doctor, I want to be able to view my appointments, so that I can stay organized

**Acceptance Criteria:**
1. Front create a calender that allows a doctor to view all patient appointments assigned to that given doctor
2. backend create endpoint that returns all appointments to the frontend
3. backend most be appointment to login Docter

**Priority:** Medium
**Story Points:** 3
**Notes:**
- should only provide the patients appointments are assign to that given doctor 

**Story 14: mark unavailability**
_As a [user role], I want [feature/goal], so that [reason]._
As a doctor, I want to be able to mark the calendar as unavaliable, so patients can't make appointments I can't do

**Acceptance Criteria:**
1. calendar should be editable that avaliable spots a doctor can mark as unavailable
2. backend should handle updating the appointment list to paitent won't select a appointment where the doctor is unavaliable

**Priority:** Medium
**Story Points:** 3
**Notes:**
- handled almost like create a appointment but more an unavaliable

**Story 15:view patient detail**
As a Doctor, I want to view patient detail for upcomming appointments so that I can prepare.

**Acceptance Criteria:**
1. Frontend should allow the doctor to select a upcoming appointment which would give the patients details
2. backend should provide a endpoint that would get a appointment or patient id and return the detail of that given patient
3. Patient details with be in the db

**Priority:** Medium
**Story Points:** 5
**Notes:**
- should return only that patients details