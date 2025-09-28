# DaLinSi Admin System Setup Guide

## Complete Supabase-Powered Wishlist Management System

This guide will help you set up the complete admin management system for the DaLinSi temple website wishlist feature.

## 🚀 Features Implemented

✅ **Frontend Features:**
- Public wishlist page with beautiful cards
- Modal detail view for each item
- Status indicators (needed, in progress, purchased)  
- Priority badges for important items
- Purchase links for direct buying

✅ **Admin Management System:**
- Secure admin authentication
- Dashboard to view all wishlist items
- Add/Edit/Delete functionality
- Image upload to Supabase Storage
- Form validation and error handling

✅ **Technical Implementation:**
- React Router for navigation
- Supabase for database and auth
- TypeScript for type safety
- Responsive design with animations
- Row Level Security (RLS) policies

## 📋 Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name (e.g., "dalinsi-temple")
3. Set a secure database password
4. Wait for the project to be created

### 2. Run Database Schema

1. Go to your Supabase dashboard
2. Navigate to "SQL Editor"
3. Copy and paste the contents of `supabase-schema.sql` from your project root
4. Click "Run" to create all tables, policies, and storage buckets

### 3. Configure Environment Variables

1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy your Project URL and anon public key
3. Update `.env.local` with your real credentials:

```env
# Replace with your actual Supabase credentials
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create Admin User

1. In Supabase dashboard, go to "Authentication" → "Users"
2. Click "Invite user" or "Add user"
3. Create an admin account with your email and password
4. Note the User ID from the auth.users table

5. Go to "SQL Editor" and run this query (replace with your actual user ID):

```sql
INSERT INTO public.admin_users (id, email, full_name) 
VALUES ('your-auth-user-id-here', 'admin@dalinsi.com', 'DaLinSi Admin');
```

### 5. Test the System

1. **Development server should be running:** `npm start`
2. **Visit the pages:**
   - Main site: `http://localhost:3000`
   - Wishlist: `http://localhost:3000/wishlist`
   - Admin login: `http://localhost:3000/admin/login`
   - Admin dashboard: `http://localhost:3000/admin/dashboard`

3. **Test the workflow:**
   - Log in with your admin credentials at `/admin/login`
   - Add some wishlist items in the dashboard
   - View them on the public wishlist page
   - Test image uploads and editing

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLogin.tsx          # Admin login form
│   │   ├── AdminDashboard.tsx      # Main admin interface
│   │   └── WishlistItemForm.tsx    # Add/edit item form
│   └── wishlist/
│       ├── WishlistPage.tsx        # Public wishlist view
│       ├── WishlistCard.tsx        # Individual item cards
│       └── WishlistItemModal.tsx   # Item detail modal
├── context/
│   ├── AuthContext.tsx             # Admin authentication
│   └── LanguageContext.tsx         # Existing language system
├── lib/
│   └── supabase.ts                 # Supabase client config
└── types/
    └── wishlist.ts                 # TypeScript interfaces
```

## 🔐 Security Features

- **Row Level Security (RLS):** Only authenticated admin users can modify data
- **Public Read Access:** Anyone can view wishlist items
- **Image Storage Security:** Only admins can upload/manage images
- **Admin-Only Routes:** Dashboard protected by authentication checks

## 🎨 Pages & Routes

- `/` - Main temple website
- `/wishlist` - Public wishlist page
- `/admin/login` - Admin login form
- `/admin/dashboard` - Admin management interface

## 📝 Usage Instructions

### For Admins:
1. Visit `/admin/login` and sign in with your credentials
2. Use the dashboard to add, edit, or delete wishlist items
3. Upload images for better visual appeal
4. Set priorities (1-5) and status (needed/in progress/purchased)
5. Provide purchase links for direct buying

### For Visitors:
1. Visit `/wishlist` to see needed items
2. Click "View Details" for full descriptions
3. Click "Buy for the Temple" to purchase items
4. See real-time status updates as items are acquired

## 🔧 Customization Options

- **Styling:** All components use Tailwind CSS classes matching your existing theme
- **Languages:** Integrate with existing language system for i18n
- **Email Notifications:** Add webhook triggers for new items/purchases
- **Analytics:** Track which items get the most views/clicks

## 🚨 Troubleshooting

If you encounter issues:

1. **Database Connection:** Check your `.env.local` file has correct Supabase credentials
2. **Authentication:** Ensure admin user exists in both auth.users and admin_users tables
3. **Image Upload:** Verify the `wishlist-images` storage bucket was created
4. **RLS Policies:** Make sure the SQL schema was executed completely

## 💡 Next Steps

Consider adding:
- Email notifications when items are added/purchased
- Integration with payment systems
- Donor recognition features
- Progress tracking towards funding goals
- Mobile app using the same Supabase backend

---

**The system is now fully functional and ready for production use!** 🎉