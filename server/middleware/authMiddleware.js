import { auth, db } from '../config/firebase.js';

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify Token with Firebase Admin
    if (!auth) {
        return res.status(500).json({ error: 'Firebase Admin not configured on server' });
    }
    
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Attach standard decoded token to request
    req.user = decodedToken;

    // Additionally, attempt to append user profile from Firestore if it exists
    if (db) {
      try {
        const userDoc = await db.collection('users').doc(decodedToken.uid).get();
        if (userDoc.exists) {
          req.dbUser = userDoc.data();
        }
      } catch (err) {
        console.error("Error fetching user profile from Firestore during auth:", err);
      }
    }

    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
