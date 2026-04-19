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