# Bank Account Management Platform

A simple Bank Account Management Platform built using **Node.js and Express.js** with a frontend developed using HTML, CSS and JavaScript.

The application allows users to create bank accounts, view existing accounts, deposit money, withdraw money and delete accounts.

## 1. Technologies Used

- Node.js
- Express.js
- HTML
- CSS
- JavaScript

## 2. Installation and Setup

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start the server

```bash
node server.js
```

The server runs at:

```text
http://localhost:3000
```

## 3. API Base URL

All account-related API endpoints use the following base URL:

```text
http://localhost:3000/api/accounts
```

The application uses JSON for sending and receiving data.

## 4. API Endpoints

### 4.1 Get All Accounts

**Method:** GET

**Endpoint:**
```text
/api/accounts
```

**Description:**

Retrieves all existing bank accounts.

**Successful Response:**

```json
[
    {
        "id": 1,
        "name": "John",
        "balance": 5000
    },
    {
        "id": 2,
        "name": "Alice",
        "balance": 3000
    }
]
```

If no accounts exist, the API returns:

```text
No accounts currently
```

### 4.2 Create an Account

**Method:** POST

**Endpoint:**
```text
/api/accounts
```

**Description:**

Creates a new bank account using the account holder's name and starting deposit.

**Request Body:**

```json
{
    "name": "John",
    "deposit": 5000
}
```

**Successful Response — 201 Created**

```json
{
    "id": 1,
    "name": "John",
    "balance": 5000
}
```

**Validation:**

- Account name must be a non-empty string.
- Negative starting deposits are rejected.
- If the deposit is not provided, the starting balance defaults to zero.

### 4.3 Delete an Account

**Method:** DELETE

**Endpoint:**
```text
/api/accounts/:id
```

**Description:**

Deletes an account using its unique account ID.

**Example:**
```text
/api/accounts/1
```

**Successful Response:**

```json
[
    {
        "id": 1,
        "name": "John",
        "balance": 5000
    }
]
```

If the account does not exist, the API returns:

```text
Account not found
```

### 4.4 Deposit Money

**Method:** PATCH

**Endpoint:**
```text
/api/accounts/deposit/:id
```

**Description:**

Adds money to an existing bank account.

**Example:**
```text
/api/accounts/deposit/1
```

**Request Body:**

```json
{
    "deposit": 1000
}
```

**Successful Response:**

```json
{
    "id": 1,
    "name": "John",
    "balance": 6000
}
```

**Validation:**

- Negative deposit amounts are rejected.

### 4.5 Withdraw Money

**Method:** PATCH

**Endpoint:**
```text
/api/accounts/withdraw/:id
```

**Description:**

Withdraws money from an existing bank account.

**Example:**
```text
/api/accounts/withdraw/1
```

**Request Body:**

```json
{
    "withdraw": 500
}
```

**Successful Response:**

```json
{
    "id": 1,
    "name": "John",
    "balance": 5500
}
```

**Validation:**

- Withdrawal is rejected if the requested amount exceeds the available balance.

## 5. Middleware

The application uses middleware to handle request validation and errors.

### Account Name Validation

`validateAccountName.js`

Checks whether the account holder's name is a valid, non-empty string before allowing account creation.

### Error Handling

`errorHandler.js`

Handles server-side errors and sends an appropriate JSON error response.

## 6. Project Architecture

The project follows the Model-View-Controller (MVC) architecture.

- **Model:** Manages account data and operations such as creating, deleting, depositing and withdrawing money.
- **View:** Provides the user interface using HTML, CSS and JavaScript.
- **Controller:** Handles incoming requests and sends responses.
- **Routes:** Defines the API endpoints and connects them to the appropriate controller functions.
- **Middleware:** Validates account names and handles errors.

## 7. Data Storage

The application currently uses an in-memory JavaScript array to store account information.

Account details are maintained while the server is running. The data resets when the server restarts.

## 8. API Testing

The API endpoints can be tested using Thunder Client.

The following operations can be tested:

- Creating a new account.
- Retrieving all accounts.
- Deleting an account.
- Depositing money.
- Withdrawing money.
- Testing account name validation.
- Testing negative deposit amounts.
- Testing withdrawals exceeding the available balance.

---

**Project Name:** Bank Account Management Platform

**Backend:** Node.js and Express.js

**API Architecture:** REST API

**Frontend:** HTML, CSS and JavaScript