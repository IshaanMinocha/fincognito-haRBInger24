// const mongoose = require('../../.vices/mongoose');
// const User = require('../models/mongoose').User;

// async function addFollowersFollowingToExistingUsers() {
//   try {
//     // Find all users
//     const users = await User.find();

//     // Update each user document to include followers and following fields
//     for (let i = 0; i < users.length; i++) {
//       const user = users[i];
//       if (!user.followers) {
//         user.followers = [];
//       }
//       if (!user.following) {
//         user.following = [];
//       }
//       await user.save();
//     }

//     console.log('Successfully updated users.');
//   } catch (error) {
//     console.error('Error updating users:', error);
//   }
// }

// // Call the function to update existing users
// addFollowersFollowingToExistingUsers();
