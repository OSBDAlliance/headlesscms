
// Function to find a user by ID
import { RowDataPacket,FieldPacket } from 'mysql2/promise';
import db from '../../config/database'; // Adjust this import to match your database setup

interface User {
  userId: string;
  pass: string;
  userType: string;
  name: string;
}



export const findUserById = async (userId: string): Promise<User | null> => {
    try {
        console.log('RUserId:', userId);
      // Correct the query's return type to handle both rows and fields
      const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await db.query<RowDataPacket[]>(
        'SELECT * FROM dbo_Users WHERE userId = ?',
        [userId]
      );
  
      // Cast the rows to the User type
      const users: User[] = rows as User[];
  
      // Return the first user or null if not found
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // Rethrow the error for handling elsewhere
    }
  };



// Function to create a new user
export const createUser = async (user: User): Promise<User> => {
  try {
    const [result]: any = await db.query('INSERT INTO dbo_Users (userId, pass, userType, name) VALUES (?, ?, ?, ?)', [user.userId, user.pass, user.userType, user.name]);
    return { ...user }; // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error for handling elsewhere
  }
};

// Function to update an existing user
export const updateUser = async (userId: string, updatedData: Partial<User>): Promise<User | null> => {
  try {
    const [result]: any = await db.query('UPDATE dbo_Users SET ? WHERE userId = ?', [updatedData, userId]);
    if (result.affectedRows === 0) {
      return null; // No user found to update
    }
    return await findUserById(userId); // Return the updated user
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Rethrow the error for handling elsewhere
  }
};

// Function to delete a user by ID
export const deleteUserById = async (userId: string): Promise<boolean> => {
  try {
    const [result]: any = await db.query('DELETE FROM dbo_Users WHERE userId = ?', [userId]);
    return result.affectedRows > 0; // Return true if a user was deleted
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // Rethrow the error for handling elsewhere
  }
};
