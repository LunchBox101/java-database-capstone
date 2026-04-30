# Smart Clinic Management System – Schema Design

---

## MySQL Database Design

MySQL handles the structured, relational, and transactional core of the clinic system. These entities have clear relationships, need referential integrity, and benefit from ACID guarantees.

---

### Table: patients

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique patient identifier |
| first_name | VARCHAR(100) | NOT NULL | |
| last_name | VARCHAR(100) | NOT NULL | |
| date_of_birth | DATE | NOT NULL | Used to calculate age |
| gender | ENUM('M','F','Other') | NOT NULL | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login / contact |
| phone | VARCHAR(20) | NOT NULL | |
| address | TEXT | NULL | Optional mailing address |
| emergency_contact_name | VARCHAR(150) | NULL | |
| emergency_contact_phone | VARCHAR(20) | NULL | |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | |
| is_active | TINYINT(1) | NOT NULL, DEFAULT 1 | Soft delete flag |

**Design notes:**
- `is_active = 0` soft-deletes a patient rather than hard-deleting, preserving appointment and prescription history.
- Email is UNIQUE so it can serve as a login credential.

---

### Table: doctors

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | |
| first_name | VARCHAR(100) | NOT NULL | |
| last_name | VARCHAR(100) | NOT NULL | |
| specialization | VARCHAR(150) | NOT NULL | e.g., "Cardiology", "General Practice" |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login / contact |
| phone | VARCHAR(20) | NOT NULL | |
| license_number | VARCHAR(100) | UNIQUE, NOT NULL | Regulatory compliance |
| years_of_experience | INT | NULL | |
| bio | TEXT | NULL | Optional public-facing bio |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | |
| is_active | TINYINT(1) | NOT NULL, DEFAULT 1 | Soft delete flag |

**Design notes:**
- `license_number` must be UNIQUE — two doctors cannot share a medical license.
- Soft deletes keep appointment history intact when a doctor leaves the clinic.

---

### Table: admin

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | |
| username | VARCHAR(100) | UNIQUE, NOT NULL | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| password_hash | VARCHAR(255) | NOT NULL | Store bcrypt hash, never plaintext |
| role | ENUM('superadmin','staff') | NOT NULL, DEFAULT 'staff' | Permission tiers |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | |
| last_login | DATETIME | NULL | Audit tracking |

**Design notes:**
- Kept separate from `patients` and `doctors` to isolate auth concerns and avoid role confusion.
- `role` ENUM allows future expansion (e.g., billing, receptionist) without schema changes.

---

### Table: appointments

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | |
| patient_id | INT | NOT NULL, FOREIGN KEY → patients(id) ON DELETE RESTRICT | |
| doctor_id | INT | NOT NULL, FOREIGN KEY → doctors(id) ON DELETE RESTRICT | |
| appointment_time | DATETIME | NOT NULL | |
| duration_minutes | INT | NOT NULL, DEFAULT 30 | Enables overlap detection |
| status | TINYINT | NOT NULL, DEFAULT 0 | 0=Scheduled, 1=Completed, 2=Cancelled, 3=No-Show |
| reason_for_visit | VARCHAR(500) | NULL | Patient-entered reason |
| notes | TEXT | NULL | Post-visit doctor notes (short form) |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | |

**Design notes:**
- `ON DELETE RESTRICT` prevents deleting a patient or doctor who has appointment records — history must be preserved.
- Overlapping appointments for the same doctor can be caught at the application layer using `appointment_time` + `duration_minutes`.
- Longer or richer post-visit notes belong in MongoDB (see prescriptions/logs collections below).

---

### Table: doctor_availability

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | |
| doctor_id | INT | NOT NULL, FOREIGN KEY → doctors(id) ON DELETE CASCADE | |
| day_of_week | TINYINT | NOT NULL | 0=Sunday … 6=Saturday |
| start_time | TIME | NOT NULL | e.g., 09:00:00 |
| end_time | TIME | NOT NULL | e.g., 17:00:00 |
| is_available | TINYINT(1) | NOT NULL, DEFAULT 1 | Toggle without deleting the row |

**Design notes:**
- Separating availability from the doctor record keeps the `doctors` table clean and allows multiple time slots per day.
- `ON DELETE CASCADE` — if a doctor is fully removed, their availability slots go with them.

---

### Table: payments

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | |
| appointment_id | INT | NOT NULL, FOREIGN KEY → appointments(id) ON DELETE RESTRICT | |
| amount | DECIMAL(10,2) | NOT NULL | |
| currency | CHAR(3) | NOT NULL, DEFAULT 'USD' | ISO 4217 code |
| payment_method | ENUM('cash','card','insurance','online') | NOT NULL | |
| status | ENUM('pending','paid','refunded','failed') | NOT NULL, DEFAULT 'pending' | |
| paid_at | DATETIME | NULL | Null until payment is confirmed |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | |

**Design notes:**
- 1-to-1 with appointments in the simple case, but kept separate because payment state evolves independently (e.g., refunds after appointment is completed).
- `DECIMAL(10,2)` avoids floating-point rounding errors for currency.

---

### Entity-Relationship Summary

```
patients ──< appointments >── doctors
                 │
              payments

doctors ──< doctor_availability

admin (standalone auth table)
```

---

## MongoDB Collection Design

MongoDB handles data that is flexible, evolving, or deeply nested — things that would require many JOIN tables or unpredictable columns in SQL.

---

### Collection: prescriptions

Each prescription is tied to an appointment but carries rich, variable clinical data that doesn't fit neatly into fixed columns.

```json
{
  "_id": "ObjectId('64abc123def456')",
  "appointmentId": 102,
  "patientId": 45,
  "patientName": "Maria Gonzalez",
  "doctorId": 7,
  "doctorName": "Dr. Priya Patel",
  "issuedAt": "2025-04-10T14:30:00Z",
  "expiresAt": "2025-07-10T00:00:00Z",
  "diagnosis": "Acute sinusitis",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Every 8 hours",
      "durationDays": 7,
      "instructions": "Take with food. Complete the full course.",
      "refillsAllowed": 0
    },
    {
      "name": "Pseudoephedrine",
      "dosage": "60mg",
      "frequency": "Every 12 hours",
      "durationDays": 5,
      "instructions": "Take in the morning and afternoon. Avoid at night.",
      "refillsAllowed": 1
    }
  ],
  "allergiesNoted": ["Penicillin"],
  "doctorNotes": "Patient reports symptoms for 10 days. No fever. Follow up if no improvement in 5 days.",
  "pharmacy": {
    "name": "CVS Pharmacy",
    "address": "1200 Main St, Tampa, FL",
    "phone": "813-555-0192"
  },
  "tags": ["antibiotic", "sinusitis", "follow-up-required"],
  "attachments": [
    {
      "fileName": "xray_sinuses.pdf",
      "fileUrl": "https://storage.clinic.io/scans/xray_sinuses.pdf",
      "uploadedAt": "2025-04-10T14:25:00Z"
    }
  ],
  "status": "active",
  "metadata": {
    "createdBy": "doctor",
    "lastUpdated": "2025-04-10T14:30:00Z",
    "version": 1
  }
}
```

**Design notes:**
- `medications` is an **array of embedded documents** — a single prescription often covers multiple drugs, and each drug has its own rules.
- `patientName` / `doctorName` are denormalized here intentionally — prescriptions are legal documents and must remain accurate even if a name is later corrected in MySQL.
- `appointmentId` and `patientId` reference MySQL rows for cross-database joins at the application layer.
- `tags` array enables fast full-text filtering (e.g., find all prescriptions tagged "follow-up-required").
- `attachments` supports optional uploaded files (lab results, X-rays) without requiring a separate table.
- `metadata.version` supports schema evolution — future fields can be added without breaking existing documents.

---

### Collection: patient_feedback

Flexible, optional, and unstructured — a perfect MongoDB use case.

```json
{
  "_id": "ObjectId('72xyz789abc')",
  "appointmentId": 102,
  "patientId": 45,
  "doctorId": 7,
  "submittedAt": "2025-04-11T09:00:00Z",
  "rating": 5,
  "categories": {
    "waitTime": 4,
    "staffFriendliness": 5,
    "doctorCommunication": 5,
    "facilityClean": 5
  },
  "comment": "Dr. Patel was incredibly thorough and kind. The wait was short and the office was spotless.",
  "wouldRecommend": true,
  "tags": ["positive", "short-wait"],
  "isPublic": true
}
```

**Design notes:**
- Category ratings are embedded as a nested object — easy to add new categories (e.g., "telehealth quality") without altering a schema.
- `isPublic` flag controls whether the review appears on a doctor's public profile.

---

### Collection: audit_logs

Tracks system events for compliance and debugging. Volume is high, structure is variable — ideal for MongoDB.

```json
{
  "_id": "ObjectId('99log000111')",
  "timestamp": "2025-04-10T14:31:05Z",
  "actorType": "admin",
  "actorId": 3,
  "action": "APPOINTMENT_STATUS_CHANGED",
  "targetEntity": "appointments",
  "targetId": 102,
  "changes": {
    "before": { "status": 0 },
    "after": { "status": 1 }
  },
  "ipAddress": "192.168.1.45",
  "userAgent": "Mozilla/5.0"
}
```

**Design notes:**
- The `changes` object is intentionally flexible — different actions produce different shapes, which MongoDB handles gracefully without nullable columns.
- Logs are append-only; no updates needed. MongoDB's write performance makes it well-suited for this.

---

## Design Decision Summary

| Data Type | Storage | Reason |
|---|---|---|
| Patients, Doctors, Admins | MySQL | Structured, validated, relationships matter |
| Appointments, Payments | MySQL | Transactional integrity, no double-booking |
| Doctor availability slots | MySQL | Relational to doctors, queried frequently |
| Prescriptions | MongoDB | Multi-medication arrays, file attachments, evolving fields |
| Patient feedback | MongoDB | Optional, unstructured, variable categories |
| Audit logs | MongoDB | High volume, append-only, variable shape per event |