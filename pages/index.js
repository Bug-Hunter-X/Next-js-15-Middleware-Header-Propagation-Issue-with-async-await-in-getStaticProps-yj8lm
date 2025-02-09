// pages/api/data.js

export default async function handler(req, res) {
  const token = req.headers.authorization || req.cookies.token; // Check cookies as well
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // ... your logic
}

// pages/index.js

export async function getStaticProps(context) {
  // Access cookies from context
  const token = context.req.cookies.token;
  const res = await fetch('http://localhost:3000/api/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return { props: { data } };
}

//middleware.js

export default function middleware(req, res) {
  if (req.url === '/') {
    // Set cookie instead of header
    res.setHeader('Set-Cookie', 'token=validToken; HttpOnly');
  }
  return NextResponse.next();
}

//pages/index.js
import {unstable_getServerSession} from 'next-auth/next' 

// Add next-auth to handle auth
// middleware.js  modify to use next-auth

//This solution requires a NextAuth setup (install next-auth and configure it)  The example shows cookies and a different approach to handle authentication

