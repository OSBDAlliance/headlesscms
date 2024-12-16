import pool from '../../config/database'; 

export const createSession = async (userId: string, sessionInfo: string): Promise<void> => {
  await pool.query('INSERT INTO dbo_userSessions (userid, sessionInfo) VALUES (?, ?)', [userId, sessionInfo]);
};

export const deleteSession = async (userId: string): Promise<void> => {
  await pool.query('DELETE FROM dbo_userSessions WHERE userid = ?', [userId]);
};
