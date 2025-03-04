// Define the User interface matching your UserSchema.
// (Adjust the type for friends as needed; here we assume an array of User objects.)
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Usually you won't store the password on the frontend.
  picturePath: string;
  friends: User[]; // Alternatively, if your API returns only friend IDs, use: string[]
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  createdAt: string;
  updatedAt: string;
}