# MongoDB Question-Answer System Documentation

## 1. Overview

This question-answer system consists of three main data entities:

- **Users**: Stores basic user information.
- **Questions**: Stores user-submitted questions.
- **Responses**: Stores administrator responses to questions.

By establishing relationships between these collections, the system enables users to ask questions and administrators to
provide responses.

---

## 2. Data Structure Design

### 2.1 Users Collection

**Purpose**: Stores basic user information, including names, contact details, and roles.

#### Schema Design

| Field Name | Type     | Description                      | Required |
|------------|----------|----------------------------------|----------|
| _id        | ObjectId | Unique user ID                   | Yes      |
| name       | String   | User name                        | Yes      |
| email      | String   | User email                       | Yes      |
| password   | String   | Encrypted password               | No       |
| google_id  | String   | Google Auth ID                   | No       |
| created_at | Date     | Registration time                | Yes      |
| last_login | Date     | Last login time                  | No       |
| role       | String   | User role (user/admin)           | Yes      |
| status     | String   | Account status (active/inactive) | Yes      |

---

### 2.2 Questions Collection

**Purpose**: Stores user-submitted questions, including titles, content, and metadata.

#### Schema Design

| Field Name | Type     | Description                         | Required |
|------------|----------|-------------------------------------|----------|
| _id        | ObjectId | Unique question ID                  | Yes      |
| user_id    | ObjectId | ID of the user who submitted        | Yes      |
| title      | String   | Question title                      | Yes      |
| content    | String   | Detailed question content           | Yes      |
| tags       | Array    | Related tags for the question       | No       |
| created_at | Date     | Submission time                     | Yes      |
| updated_at | Date     | Last update time                    | No       |
| status     | String   | Question status (pending/answered)  | Yes      |
| priority   | String   | Question priority (low/medium/high) | No       |
| view_count | Number   | Number of views                     | No       |

---

### 2.3 Responses Collection

**Purpose**: Stores administrator responses to user questions.

#### Schema Design

| Field Name  | Type     | Description                       | Required |
|-------------|----------|-----------------------------------|----------|
| _id         | ObjectId | Unique response ID                | Yes      |
| question_id | ObjectId | Associated question ID            | Yes      |
| admin_id    | ObjectId | ID of the responding admin        | Yes      |
| response    | String   | Response content                  | Yes      |
| created_at  | Date     | Response time                     | Yes      |
| updated_at  | Date     | Last update time                  | No       |
| attachments | Array    | Additional reference files        | No       |
| status      | String   | Response status (draft/published) | Yes      |

---

## 3. Data Relationships

### 3.1 Users and Questions Relationship

- **Field**: Questions.user_id corresponds to Users._id
- **Type**: One-to-Many (A user can submit multiple questions)

### 3.2 Questions and Responses Relationship

- **Field**: Responses.question_id corresponds to Questions._id
- **Type**: One-to-Many (A question can have multiple responses)