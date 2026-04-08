import { db } from '../config/firebase.js';

export const getCategories = async (req, res) => {
  try {
    const snapshot = await db.collection('categories').orderBy('name', 'asc').get();
    const categories = [];
    
    snapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch event categories" });
  }
};

// Admin route strictly for safely initializing the default categories 
export const seedCategories = async (req, res) => {
  try {
    // Including the requested categories
    const defaultCategories = [
      { name: "Hackathon", description: "Coding marathons and technical challenges" },
      { name: "Business", description: "Entrepreneurship, pitches, and mixers" },
      { name: "Tech", description: "General technology workshops and panel discussions" },
      { name: "Music", description: "Concerts, DJ nights, and live bands" },
      { name: "Workshop", description: "Hands-on skill building sessions" },
      { name: "Networking", description: "Meetups specifically for connecting with others" },
      { name: "Other", description: "Miscellaneous events" }
    ];

    const batch = db.batch();
    const categoryCollection = db.collection('categories');

    for (const cat of defaultCategories) {
      // We use the lowercase name directly as the Document ID so it cleanly avoids duplicates
      const docRef = categoryCollection.doc(cat.name.toLowerCase());
      batch.set(docRef, cat, { merge: true }); // merge means it won't overwrite existing changes if run twice
    }

    await batch.commit();

    res.status(201).json({ message: "Successfully seeded categories into Firestore!" });
  } catch (error) {
    console.error("Error seeding categories:", error);
    res.status(500).json({ error: "Failed to seed categories to database" });
  }
};
