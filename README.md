# NexusMeds

**A Comprehensive Pharmaceutical E-Commerce Platform**

A full-stack web application designed for online pharmaceutical sales, research chemical procurement, and healthcare management. Built as a Level 2 - Term 1 Database Management Systems project, showcasing enterprise-level architecture and advanced database operations.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)](https://postgresql.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Storage-orange.svg)](https://firebase.google.com/)

## Project Overview

NexusMeds is a sophisticated pharmaceutical e-commerce platform that bridges the gap between customers, researchers, and pharmaceutical suppliers. The system supports multiple user roles with distinct functionalities, real-time inventory management, and comprehensive order processing workflows.

### Key Features
- **Multi-Role E-Commerce**: Separate interfaces for customers, researchers, and administrators
- **Advanced Search**: Fuzzy search with ranking algorithms for medicines and chemicals
- **Real-Time Inventory**: Live stock tracking with automated supply management
- **Secure Payments**: Integrated payment processing with order tracking
- **Analytics Dashboard**: Comprehensive statistics and business intelligence
- **JWT Authentication**: Secure user authentication with role-based access control
- **Responsive Design**: Mobile-friendly interface using Bootstrap and Reactstrap

## Architecture Overview

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  React Frontend │    │  Express Backend│    │  PostgreSQL DB  │
│                 │◄──►│                 │◄──►│                 │
│  - Components   │    │  - Controllers  │    │  - Tables       │
│  - Routing      │    │  - Middleware   │    │  - Triggers     │
│  - State Mgmt   │    │ - Authentication│    │  - Functions    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Firebase Storage│
                    │                 │
                    │  - Images       │
                    │  - Documents    │
                    │  - Prescriptions│
                    └─────────────────┘
```

## Technologies & Methodologies

### Frontend Technologies
- **React 18.2.0** - Modern UI library with hooks and functional components
- **React Router DOM 6.21.1** - Client-side routing with protected routes
- **Reactstrap 9.2.1** - Bootstrap components for React
- **Bootstrap 5.3.2** - Responsive CSS framework
- **Recharts 2.12.2** - Data visualization and charting library
- **React Toastify 10.0.4** - User notification system
- **React Slick 0.30.2** - Carousel and slider components
- **Moment.js & Date-fns** - Date manipulation and formatting

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **PostgreSQL** - Relational database management system
- **pg 8.11.3** - PostgreSQL client for Node.js
- **JWT (jsonwebtoken 9.0.2)** - Secure authentication tokens
- **bcrypt 5.1.1** - Password hashing and encryption
- **CORS 2.8.5** - Cross-origin resource sharing
- **Multer 1.4.4** - Multipart form data handling
- **dotenv 16.3.1** - Environment variable management

### Cloud & Storage
- **Firebase Storage** - Cloud file storage for images and documents
- **Firebase SDK 10.8.0** - Firebase integration

### Database Technologies
- **PostgreSQL Advanced Features**:
  - Stored Procedures and Functions
  - Complex Triggers
  - UUID Generation
  - JSON Data Types
  - Full-Text Search
  - Transaction Management
  - Referential Integrity

### Development Methodologies
- **MVC Architecture** - Model-View-Controller pattern
- **RESTful API Design** - Stateless communication protocol
- **Component-Based Development** - Reusable UI components
- **Database-First Approach** - Schema-driven development
- **Error-Driven Development** - Comprehensive error handling
- **Security-First Design** - Authentication and authorization at every layer

## Database Schema

### Core Entities
```sql
-- User Management
Customer (UUID, email, password, profile_data)
Researcher (UUID, email, password, profile_data, approval_status)
Admins (admin_id, email, password)

-- Product Catalog
Medicine (medicine_id, name, price, specifications, manufacturer_id)
Chemical (chemical_id, name, formula, molecular_weight, manufacturer_id)
Manufacturer (manufacturer_id, name, contact_info)

-- E-Commerce
Cart (cart_id, user_id, user_type, status)
CartMedicine (cart_id, medicine_id, quantity)
CartChemical (cart_id, chemical_id, quantity)
Orders (order_id, cart_id, billing_info, status, dates)
Payment (payment_id, cart_id, amount, payment_date)

-- Inventory Management
Inventory (inventory_id, product_id, stocked_amount, sold_amount)
SupplyRequestMedicine (request_id, medicine_id, quantity, date)
SupplyRequestChemical (request_id, chemical_id, quantity, date)

-- Audit & Logging
LoginLog (log_id, user_id, login_time, logout_time)
OrderHistory (history_id, order_data, user_id)
PendingApprovals (researcher_id, permit_document)
```

### Advanced Database Features
- **Triggers**: 15+ triggers for business rule enforcement
- **Functions**: Custom PL/pgSQL functions for complex operations
- **Procedures**: Stored procedures for transaction management
- **Views**: Optimized queries for reporting
- **Indexes**: Performance optimization for search operations

## Key Features & Functionality

### 1. Multi-Role Authentication System
```javascript
// JWT-based authentication with role detection
- Customer Registration/Login
- Researcher Registration with Approval Workflow
- Admin Authentication
- Session Management with Login/Logout Tracking
- Token Expiration Handling (1-hour tokens)
```

### 2. Advanced Search Engine
```sql
-- Fuzzy search with ranking algorithm
CREATE FUNCTION rank_searched_medicines(search_text TEXT)
RETURNS TABLE (medicine_id INT, med_name TEXT, rank DOUBLE PRECISION)
- Character-by-character matching
- Exact match prioritization
- Generic name search support
- Performance-optimized queries
```

### 3. Real-Time Inventory Management
```javascript
// Automatic stock validation and updates
- Real-time stock checking before cart operations
- Automated inventory updates via triggers
- Supply request workflow
- Low stock alerts and monitoring
- Admin inventory dashboard
```

### 4. Complex Cart System
```javascript
// Dynamic cart management
- Automatic cart creation per user
- Separate medicine/chemical carts for different user types
- Quantity management with validation
- Real-time price calculations
- Cart persistence across sessions
```

### 5. Order Processing Workflow
```javascript
// End-to-end order management
- Order creation with billing address
- Automatic payment record generation
- Prescription image upload support
- Order status tracking
- Shipment date calculation
- Order history maintenance
```

### 6. Firebase Integration
```javascript
// Cloud storage for multimedia content
- Profile picture uploads
- Product image management
- Prescription document storage
- Research permit document handling
- Secure file access with download URLs
```

### 7. Analytics & Reporting
```javascript
// Business intelligence dashboard
- Monthly/Weekly revenue tracking
- Order volume analytics
- User activity monitoring
- Top customers/researchers identification
- Inventory turnover analysis
- Interactive charts and graphs
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Firebase account with Storage enabled
- Git

### 1. Clone Repository
```bash
git clone https://github.com/NIHAJ-RARBA/NexusMeds.git
cd NexusMeds
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb nexusmeds

# Run database schema
psql -d nexusmeds -f server/SQL's/new_createDB.sql

# Run functions and procedures
psql -d nexusmeds -f server/SQL's/FUNCTIONS/functions.sql
psql -d nexusmeds -f server/SQL's/PROCEDURES/create_payment.sql

# Set up triggers
psql -d nexusmeds -f server/SQL's/TRIGGERS/INVENTORY/inventory_update_trigger_for_medicine.sql
# ... (run all trigger files)
```

### 3. Backend Setup
```bash
cd server

# Clean install (if you encounter permission issues)
# Delete node_modules folder and package-lock.json first
# rmdir /s node_modules (Windows) or rm -rf node_modules (Linux/Mac)
# del package-lock.json (Windows) or rm package-lock.json (Linux/Mac)

# Install dependencies
npm install

# If permission errors occur, try running as administrator or use:
# npm install --no-optional
# npm cache clean --force

# Create .env file
echo "jwtSecret=your_jwt_secret_here" > .env

# Update database credentials in DB.js
# Configure Firebase credentials in index.js

# Start the server
npm start
# Server runs on http://localhost:5000

# For development with auto-restart (optional)
# npm install -g nodemon
# npm run dev
```

### Troubleshooting Installation Issues
If you encounter permission errors during installation:

1. **Windows**: Run PowerShell/Command Prompt as Administrator
2. **Clear npm cache**: `npm cache clean --force`
3. **Delete node_modules**: Remove the `node_modules` folder and `package-lock.json`
4. **Reinstall**: Run `npm install` again
5. **Alternative**: Use `npm install --no-optional` to skip optional dependencies

**If you get "No matching version found" errors:**
- Check available versions: `npm view package-name versions --json`
- Example: `npm view multer versions --json`
- Update package.json with correct version numbers

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
# Application runs on http://localhost:3000
```

### 5. Firebase Configuration
```javascript
// Update Firebase config in server/index.js
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_project.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your_project.appspot.com",
    // ... other config
};
```

## Usage Guide

### For Customers
1. **Registration**: Sign up with email, phone, and profile information
2. **Browse Products**: Search medicines by name or browse categories
3. **Shopping Cart**: Add medicines to cart with quantity selection
4. **Checkout**: Provide billing address and upload prescription if required
5. **Order Tracking**: Monitor order status and delivery progress

### For Researchers
1. **Registration**: Sign up and upload research permit for approval
2. **Approval Process**: Wait for admin approval to access chemicals
3. **Chemical Procurement**: Browse and order research chemicals
4. **Order Management**: Track chemical orders and delivery status

### For Administrators
1. **User Management**: Approve researcher registrations
2. **Order Management**: Review and approve orders
3. **Inventory Control**: Monitor stock levels and manage supply requests
4. **Analytics**: View business statistics and user analytics
5. **Product Management**: Add new medicines and chemicals

## Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure stateless authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access**: Different permissions for user types
- **Token Expiration**: Automatic session timeout

### Data Protection
- **SQL Injection Prevention**: Parameterized queries throughout
- **Input Validation**: Frontend and backend validation
- **File Upload Security**: Firebase integration with access controls
- **CORS Configuration**: Controlled cross-origin access

### Business Logic Security
- **Inventory Validation**: Prevents overselling
- **User Type Verification**: Restricts access to appropriate products
- **Approval Workflows**: Researcher verification process
- **Audit Logging**: Complete user activity tracking

## Performance Optimizations

### Database Optimizations
- **Connection Pooling**: Efficient database connection management
- **Indexed Searches**: Optimized query performance
- **Stored Procedures**: Reduced network overhead
- **Trigger Optimization**: Efficient business rule enforcement

### Frontend Optimizations
- **Component Lazy Loading**: Reduced initial bundle size
- **State Management**: Efficient React state handling
- **Caching Strategies**: Reduced API calls
- **Image Optimization**: Firebase CDN integration

## Testing & Quality Assurance

### Error Handling System
```javascript
// Comprehensive error code system
12345: "Name validation error"
12346: "Phone validation error"
13422: "Medicine doesn't exist in cart"
13878: "Medicine out of stock"
13891: "Chemical out of stock"
12407: "Invalid manufacturer ID"
56789: "Admin order restriction"
```

### Data Integrity
- **Foreign Key Constraints**: Referential integrity maintenance
- **Trigger Validations**: Business rule enforcement
- **Transaction Management**: ACID compliance
- **Error Recovery**: Graceful failure handling

## Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Standards
- **ES6+ JavaScript**: Modern JavaScript features
- **React Functional Components**: Hooks-based development
- **REST API Design**: Consistent endpoint structure
- **SQL Best Practices**: Optimized query patterns



## Development Team

- **Database Design**: Advanced PostgreSQL schema with triggers and functions
- **Backend Development**: Node.js/Express API with JWT authentication
- **Frontend Development**: React SPA with responsive design
- **DevOps**: Firebase integration and deployment configuration

## Support

For support, email altairahad001@gmail.com or sahaamit20002@gmail.com

## Future Enhancements

- **Mobile Application**: React Native mobile app
- **Real-time Notifications**: WebSocket integration
- **AI Recommendations**: Machine learning product suggestions
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Enhanced business intelligence
- **API Rate Limiting**: Enhanced security measures

---

*Built by the NexusMeds Development Team*
