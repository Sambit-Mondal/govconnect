# Sangam Entity Relationship Diagram

## Overview
This document describes the entity relationships in the Sangam database system. The diagram below shows the relationships between all tables in the database.

## ER Diagram Description

```mermaid
erDiagram
    USERS ||--o{ APPLICATIONS : "submits"
    USERS ||--o{ DOCUMENTS : "uploads"
    USERS ||--o{ PAYMENTS : "makes"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ GRIEVANCES : "files"
    USERS ||--o{ LOGIN_ACTIVITIES : "has"
    USERS ||--o{ AUDIT_LOGS : "performs"
    
    DEPARTMENTS ||--o{ SERVICES : "offers"
    DEPARTMENTS ||--o{ GOVERNMENT_OFFICES : "operates"
    DEPARTMENTS ||--o{ SCHEMES : "manages"
    
    SERVICES ||--o{ APPLICATIONS : "receives"
    APPLICATIONS ||--o| PAYMENTS : "requires"
    
    USERS {
        SERIAL id PK
        VARCHAR name
        VARCHAR email UK
        VARCHAR password
        VARCHAR phone
        VARCHAR aadhar_number UK
        TEXT address
        DATE date_of_birth
        VARCHAR role
        BOOLEAN two_factor_enabled
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    DEPARTMENTS {
        SERIAL id PK
        VARCHAR name
        VARCHAR code UK
        TEXT description
        TEXT head_office_address
        VARCHAR contact_email
        VARCHAR contact_phone
        VARCHAR website
        BOOLEAN is_active
        TIMESTAMP created_at
    }
    
    SERVICES {
        SERIAL id PK
        VARCHAR name
        VARCHAR code UK
        VARCHAR category
        TEXT description
        INTEGER department_id FK
        INTEGER processing_time
        DECIMAL fee_amount
        TEXT[] required_documents
        TEXT eligibility_criteria
        BOOLEAN is_active
        TIMESTAMP created_at
    }
    
    APPLICATIONS {
        SERIAL id PK
        INTEGER user_id FK
        INTEGER service_id FK
        VARCHAR type
        JSONB data
        VARCHAR status
        TIMESTAMP submission_date
        TIMESTAMP approved_at
        TIMESTAMP rejected_at
        TEXT rejection_reason
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    DOCUMENTS {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR name
        VARCHAR type
        VARCHAR file_path
        BIGINT file_size
        VARCHAR mime_type
        TEXT description
        VARCHAR verification_status
        TIMESTAMP uploaded_at
    }
    
    PAYMENTS {
        SERIAL id PK
        INTEGER user_id FK
        INTEGER application_id FK
        DECIMAL amount
        TEXT description
        DATE due_date
        VARCHAR status
        VARCHAR payment_method
        VARCHAR transaction_id
        TIMESTAMP paid_at
        TIMESTAMP created_at
    }
    
    NOTIFICATIONS {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR type
        VARCHAR title
        TEXT message
        BOOLEAN is_read
        TIMESTAMP created_at
    }
    
    SCHEMES {
        SERIAL id PK
        VARCHAR name
        VARCHAR code UK
        VARCHAR category
        TEXT description
        INTEGER department_id FK
        INTEGER min_age
        DECIMAL max_income
        TEXT eligibility_criteria
        TEXT benefits
        TEXT application_process
        DATE start_date
        DATE end_date
        BOOLEAN is_active
        TIMESTAMP created_at
    }
    
    GRIEVANCES {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR title
        VARCHAR category
        TEXT description
        TEXT location
        VARCHAR status
        VARCHAR priority
        INTEGER assigned_to FK
        TEXT resolution
        TIMESTAMP resolved_at
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    GOVERNMENT_OFFICES {
        SERIAL id PK
        VARCHAR name
        VARCHAR type
        INTEGER department_id FK
        TEXT address
        VARCHAR city
        VARCHAR state
        VARCHAR pincode
        DECIMAL latitude
        DECIMAL longitude
        VARCHAR contact_phone
        VARCHAR contact_email
        TEXT working_hours
        TEXT[] services_offered
        BOOLEAN is_active
        TIMESTAMP created_at
    }
    
    LOGIN_ACTIVITIES {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR ip_address
        TEXT user_agent
        TIMESTAMP login_time
        TIMESTAMP logout_time
        VARCHAR status
    }
    
    AUDIT_LOGS {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR action
        VARCHAR entity_type
        INTEGER entity_id
        JSONB old_values
        JSONB new_values
        VARCHAR ip_address
        TEXT user_agent
        TIMESTAMP created_at
    }
```

## Key Relationships

1. **User to Applications**: One user can submit multiple applications
2. **User to Documents**: One user can upload multiple documents
3. **User to Payments**: One user can make multiple payments
4. **User to Notifications**: One user can receive multiple notifications
5. **User to Grievances**: One user can file multiple grievances
6. **Department to Services**: One department can offer multiple services
7. **Department to Schemes**: One department can manage multiple schemes
8. **Services to Applications**: One service can receive multiple applications
9. **Applications to Payments**: One application may require multiple payments

## Cardinality

- **One-to-Many**: Users to Applications, Documents, Payments, Notifications, Grievances
- **One-to-Many**: Departments to Services, Schemes, Government Offices
- **One-to-Many**: Services to Applications
- **One-to-One**: Application to Payment (optional)

## Notes

- All relationships are implemented using foreign keys
- Cascade rules are defined for referential integrity
- Indexes are created on foreign key columns for performance
- Some relationships are optional (e.g., Application to Payment)
