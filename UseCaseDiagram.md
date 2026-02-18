# Use Case Diagram

```mermaid
usecaseDiagram
    actor "Security Guard" as Warning
    actor "Resident" as Resident
    actor "Society Admin" as Admin
    actor "System" as System

    package mygat_Application {
        
        usecase "Log Visitor Entry" as UC1
        usecase "Record Visitor Exit" as UC2
        usecase "Login via OTP" as UC3
        usecase "Verify Phone Number" as UC4
        
        usecase "Receive Visit Notification" as UC5
        usecase "Approve/Deny Visitor" as UC6
        usecase "Register Account" as UC7
        
        usecase "Verify Resident Registration" as UC8
        usecase "Deactivate/Ban User" as UC9
    }

    Warning --> UC3
    Warning --> UC1
    Warning --> UC2
    
    Resident --> UC3
    Resident --> UC7
    Resident --> UC5
    Resident --> UC6

    Admin --> UC3
    Admin --> UC8
    Admin --> UC9

    UC3 ..> UC4 : <<include>>
    UC1 --> UC5 : <<triggers>>
    UC6 --> Warning : <<notifies>>

    note right of UC1
        Guard enters: Name, Phone,
        Flat #, Purpose, Photo
    end note

    note right of UC6
        Resident decides:
        Allow or Deny
    end note
```
