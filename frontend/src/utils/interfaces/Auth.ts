import { Post } from "@/utils/interfaces/Post";
import { User } from "@/utils/interfaces/User";

// Define your slice state.
export interface AuthState {
  mode: "light" | "dark";
  user: User | null;
  token: string | null;
  posts: Post[];
}
