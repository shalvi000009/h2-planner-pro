# 🌍 Green Hydrogen Infrastructure & Optimization Platform

A professional, hackathon-ready web application for optimizing green hydrogen production, storage, and distribution networks with real-time insights and data-driven decision making.

## 🚀 Features

### 🎨 **Design & Styling**
- **Lightwind UI**: Glassmorphism aesthetic with blurred frosted cards and translucent panels
- **Color Scheme**: Hydrogen Green (#00d084), Sky Blue (#1da1f2), Slate Grey (#2f3e46), Warm Amber (#ffb703)
- **Typography**: Inter font family
- **Animations**: Framer Motion for smooth, professional animations
- **Video Background**: Dynamic hero section with fallback support

### 🔐 **Authentication & Security**
- **JWT-based Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin, User, and Developer roles
- **Password Hashing**: bcryptjs for secure password storage
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: Comprehensive security headers

### 📊 **User Panel Features**
- **Dashboard**: KPIs, decarbonization charts, smart alerts
- **Interactive Map Workspace**: Real-time scenario planning with instant scoring
- **Recommendations**: AI-driven site recommendations with scoring breakdown
- **Impact Dashboard**: CO₂ reduction tracking and net-zero progress
- **Collaboration**: Scenario sharing and team collaboration

### 🛠️ **Admin Panel Features**
- **System Dashboard**: Real-time system health and activity monitoring
- **User Management**: Complete user lifecycle management
- **Data Moderation**: Crowdsourced content approval workflow
- **System Metrics**: Performance monitoring and error tracking

### 🗺️ **Map Workspace (Core Feature)**
- **React Map GL**: High-performance mapping with Mapbox integration
- **Client-side Scoring**: Instant impact scoring algorithm
- **Plant Placement**: Interactive plant placement with real-time feedback
- **Scenario Saving**: Database persistence with comprehensive metadata
- **Layer Management**: Toggle renewable sites, demand centers, transport hubs

## 🏗️ **Architecture**

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Shadcn/ui** component library
- **Framer Motion** for animations
- **React Router DOM** for routing
- **Recharts** for data visualization

### **Backend**
- **Node.js** with Express
- **Prisma ORM** with SQLite database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Rate limiting** for API protection

### **Database Schema**
- **Users**: Authentication and role management
- **Scenarios**: User-created planning scenarios
- **KPIs**: Key performance indicators
- **Moderation Items**: Content approval workflow
- **User Activities**: Audit trail and analytics
- **Projects**: Infrastructure project management
- **Comments**: Collaboration and feedback system

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd h2-planner-pro
```

### **2. Install Dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
```

### **3. Environment Setup**
Create `.env.local` in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:4000
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

Create `.env` in the server directory:
```env
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### **4. Database Setup**
```bash
cd server
npm run db:generate
npm run db:migrate
npm run db:seed
```

### **5. Start the Application**
```bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend
cd ..
npm run dev
```

### **6. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Database Studio**: `cd server && npm run db:studio`

## 👥 **Default Users**

The seed script creates three default users:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `admin@h2planner.com` | `admin123` | Admin | Full system access |
| `user@h2planner.com` | `user123` | User | Standard user access |
| `dev@h2planner.com` | `dev123` | Developer | Enhanced development access |

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### **Scenarios**
- `GET /api/scenarios` - List scenarios (role-filtered)
- `POST /api/scenarios` - Create scenario
- `GET /api/scenarios/:id` - Get scenario details
- `PUT /api/scenarios/:id` - Update scenario
- `DELETE /api/scenarios/:id` - Delete scenario
- `PATCH /api/scenarios/:id/status` - Update status (admin only)

### **Admin Endpoints**
- `GET /api/auth/users` - List users (admin only)
- `PUT /api/auth/users/:id` - Update user (admin only)
- `GET /api/moderation` - List moderation items
- `POST /api/moderation` - Create moderation item
- `PATCH /api/moderation/:id` - Update moderation status

## 🗺️ **Map Workspace Scoring Algorithm**

The core scoring function evaluates hydrogen plant locations based on:

```javascript
function scoreSite(candidate, renewables, demand, transport) {
  // Calculate distances to nearest facilities
  const distToNearestRenewable = Math.min(...renewables.map(r => 
    Math.sqrt(Math.pow(candidate[0] - r.coordinates[0], 2) + Math.pow(candidate[1] - r.coordinates[1], 2))
  ));
  
  const distToNearestTransport = Math.min(...transport.map(t => 
    Math.sqrt(Math.pow(candidate[0] - t.coordinates[0], 2) + Math.pow(candidate[1] - t.coordinates[1], 2))
  ));
  
  const localDemand = demand.reduce((sum, d) => {
    const dist = Math.sqrt(Math.pow(candidate[0] - d.coordinates[0], 2) + Math.pow(candidate[1] - d.coordinates[1], 2));
    return sum + (d.demand || 0) / (1 + dist);
  }, 0);

  // Weighted scoring (0-100)
  const proxRenew = 1 / (1 + distToNearestRenewable * 10);        // 45%
  const demandScore = Math.min(1, localDemand / 1000);           // 35%
  const transportScore = 1 / (1 + distToNearestTransport * 10);   // 20%
  const regulationPenalty = Math.random() > 0.1 ? 1 : 0.2;       // 10% protected zone chance

  const raw = (0.45 * proxRenew) + (0.35 * demandScore) + (0.2 * transportScore);
  return Math.round(raw * 100 * regulationPenalty);
}
```

**Scoring Breakdown:**
- **Renewable Proximity (45%)**: Distance to nearest renewable energy source
- **Demand Density (35%)**: Local energy demand and consumption patterns
- **Transport Access (20%)**: Proximity to transportation infrastructure
- **Regulation Penalty**: Environmental protection zone considerations

## 🎯 **Key Features for Hackathon Demo**

### **1. Interactive Map Workspace**
- Real-time plant placement with instant scoring
- Animated impact badges and confetti effects
- Comprehensive scenario data persistence
- Professional glassmorphism UI

### **2. Role-Based Access Control**
- Secure authentication with JWT
- Different interfaces for Admin/User/Developer
- Protected routes and API endpoints
- User activity tracking

### **3. Database Integration**
- Full CRUD operations for scenarios
- User management and moderation
- Audit trails and analytics
- Scalable SQLite database

### **4. Professional UI/UX**
- Video background with fallback
- Smooth animations and transitions
- Responsive design
- Modern glassmorphism aesthetic

## 🔒 **Security Features**

- **JWT Authentication**: Secure token-based sessions
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Prisma ORM protection
- **XSS Protection**: Helmet security headers

## 📈 **Performance Optimizations**

- **Client-side Scoring**: Instant feedback without server calls
- **Lazy Loading**: Dynamic imports for better performance
- **Database Indexing**: Optimized queries with Prisma
- **Caching**: Efficient data caching strategies
- **Bundle Optimization**: Vite for fast builds

## 🛠️ **Development Commands**

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm run dev          # Start development server
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 📝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for sustainable energy infrastructure planning**
