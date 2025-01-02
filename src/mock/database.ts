// src/mock/database.ts
export interface User {
    email: string;
    password: string;
  }
  
  // Check if the global object already has a users array, otherwise initialize it
  (global as any).users = (global as any).users || [];
  
  export const users: User[] = (global as any).users;
      