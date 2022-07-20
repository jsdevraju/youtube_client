export const apiEndPoint = process.env.NEXT_PUBLIC_CLIENT_API_URL;

export interface VideoProps {
  createdAt: string;
  description: string;
  dislikes?: string[];
  imgUrl: string;
  likes?: string[] | string;
  tags?: string[] | string;
  title: string;
  updatedAt: string;
  userId: string;
  videoUrl: string;
  views: number;
  __v: number;
  _id: string;
}


export interface SingleVideoProps{
  createdAt: string
  description:string
  dislikes?: string[]
  imgUrl: string
  likes?:string[]
  tags?: string[]
  title: string
  updatedAt: string
  userId: string
  videoUrl: string
  views: number
  __v: number
  _id: string
}


export interface IUser{
  avatar: string
  createdAt: string
  email: string
  name: string
  role: string
  subscribedUsers: string[]
  subscribers: number
  updatedAt: string
  __v: number
  _id: string
}