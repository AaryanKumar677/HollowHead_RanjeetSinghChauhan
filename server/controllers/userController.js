import { db } from '../config/firebase.js';

export const syncUser = async (req, res) => {
  try {
    const { uid, email, name, role, university } = req.body;
    
    // Fallbacks to decoded token if values not provided in body
    const userUid = uid || req.user.uid;
    const userEmail = email || req.user.email;
    const userName = name || req.user.name || req.user.displayName;
    
    const userRef = db.collection('users').doc(userUid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      // Create new user using schema provided
      const newUser = {
        name: userName || 'Anonymous',
        email: userEmail,
        role: role || 'attendee', 
        university: university || null,
        createdAt: new Date(), 
      };
      
      await userRef.set(newUser);
      return res.status(201).json({ message: 'User created', user: newUser });
    } else {
      return res.status(200).json({ message: 'User exists', user: doc.data() });
    }
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (req.dbUser) {
        return res.status(200).json({ user: req.dbUser });
    }
    
    const doc = await db.collection('users').doc(req.user.uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};
