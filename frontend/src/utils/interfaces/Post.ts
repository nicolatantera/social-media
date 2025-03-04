// Define the Post interface matching your PostSchema.
export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  picturePath?: string;
  userPicturePath?: string;
  // likes is stored as a Map in Mongoose, so we use a record of booleans.
  likes: Record<string, boolean>;
  // comments is an array (of strings, for example).
  comments: string[];
  // Timestamps as strings (or use Date if you prefer).
  createdAt: string;
  updatedAt: string;
}