export interface Creator {
  id: string;
  name: string;
  age: number;
  bio: string;
  profilePicture: string;
  tags: string[];
  content: {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail: string;
  }[];
  subscribers: number;
  posts: number;
}

export interface Message {
  id: string;
  senderId: string; // '0' for user, creator.id for creator
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // [userId, creatorId]
  messages: Message[];
}

export const creators: Creator[] = [
  {
    id: '1',
    name: 'Jessica',
    age: 24,
    bio: 'Fitness enthusiast & lifestyle blogger.',
    profilePicture: 'https://picsum.photos/600/900?random=1',
    tags: ['Fitness', 'Lifestyle', 'Travel'],
    content: [
      { id: 'c1', type: 'image', url: 'https://picsum.photos/800/600?random=11', thumbnail: 'https://picsum.photos/400/300?random=11' },
      { id: 'c2', type: 'image', url: 'https://picsum.photos/800/600?random=12', thumbnail: 'https://picsum.photos/400/300?random=12' },
      { id: 'c3', type: 'image', url: 'https://picsum.photos/800/600?random=13', thumbnail: 'https://picsum.photos/400/300?random=13' },
      { id: 'c4', type: 'image', url: 'https://picsum.photos/800/600?random=14', thumbnail: 'https://picsum.photos/400/300?random=14' },
      { id: 'c5', type: 'image', url: 'https://picsum.photos/800/600?random=15', thumbnail: 'https://picsum.photos/400/300?random=15' },
      { id: 'c6', type: 'image', url: 'https://picsum.photos/800/600?random=16', thumbnail: 'https://picsum.photos/400/300?random=16' },
    ],
    subscribers: 125000,
    posts: 342,
  },
  {
    id: '2',
    name: 'Amber',
    age: 22,
    bio: 'Artist exploring digital and traditional media.',
    profilePicture: 'https://picsum.photos/600/900?random=2',
    tags: ['Art', 'Digital Painting', 'Creative'],
    content: [
      { id: 'c7', type: 'image', url: 'https://picsum.photos/800/600?random=21', thumbnail: 'https://picsum.photos/400/300?random=21' },
      { id: 'c8', type: 'image', url: 'https://picsum.photos/800/600?random=22', thumbnail: 'https://picsum.photos/400/300?random=22' },
      { id: 'c9', type: 'image', url: 'https://picsum.photos/800/600?random=23', thumbnail: 'https://picsum.photos/400/300?random=23' },
    ],
    subscribers: 78000,
    posts: 150,
  },
  {
    id: '3',
    name: 'Sofia',
    age: 27,
    bio: 'Globetrotting and sharing stories from around the world.',
    profilePicture: 'https://picsum.photos/600/900?random=3',
    tags: ['Travel', 'Photography', 'Adventure'],
    content: [
      { id: 'c10', type: 'image', url: 'https://picsum.photos/800/600?random=31', thumbnail: 'https://picsum.photos/400/300?random=31' },
      { id: 'c11', type: 'image', url: 'https://picsum.photos/800/600?random=32', thumbnail: 'https://picsum.photos/400/300?random=32' },
      { id: 'c12', type: 'image', url: 'https://picsum.photos/800/600?random=33', thumbnail: 'https://picsum.photos/400/300?random=33' },
      { id: 'c13', type: 'image', url: 'https://picsum.photos/800/600?random=34', thumbnail: 'https://picsum.photos/400/300?random=34' },
    ],
    subscribers: 230000,
    posts: 512,
  },
   {
    id: '4',
    name: 'Chloe',
    age: 25,
    bio: 'Gamer, streamer, and esports competitor.',
    profilePicture: 'https://picsum.photos/600/900?random=4',
    tags: ['Gaming', 'Streaming', 'eSports'],
    content: [
      { id: 'c14', type: 'image', url: 'https://picsum.photos/800/600?random=41', thumbnail: 'https://picsum.photos/400/300?random=41' },
      { id: 'c15', type: 'image', url: 'https://picsum.photos/800/600?random=42', thumbnail: 'https://picsum.photos/400/300?random=42' },
    ],
    subscribers: 550000,
    posts: 890,
  },
  {
    id: '5',
    name: 'Mia',
    age: 29,
    bio: 'Chef crafting delicious and beautiful dishes.',
    profilePicture: 'https://picsum.photos/600/900?random=5',
    tags: ['Food', 'Cooking', 'Chef'],
    content: [
      { id: 'c16', type: 'image', url: 'https://picsum.photos/800/600?random=51', thumbnail: 'https://picsum.photos/400/300?random=51' },
      { id: 'c17', type: 'image', url: 'https://picsum.photos/800/600?random=52', thumbnail: 'https://picsum.photos/400/300?random=52' },
      { id: 'c18', type: 'image', url: 'https://picsum.photos/800/600?random=53', thumbnail: 'https://picsum.photos/400/300?random=53' },
      { id: 'c19', type: 'image', url: 'https://picsum.photos/800/600?random=54', thumbnail: 'https://picsum.photos/400/300?random=54' },
    ],
    subscribers: 95000,
    posts: 220,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['0', '1'], // User and Jessica
    messages: [
      { id: 'm1', senderId: '1', text: 'Hey! Thanks for subscribing!', timestamp: '2024-05-20T10:00:00Z' },
      { id: 'm2', senderId: '0', text: 'Of course! Love your content.', timestamp: '2024-05-20T10:01:00Z' },
      { id: 'm3', senderId: '1', text: 'That means a lot! Let me know if you have any questions about my workout plans.', timestamp: '2024-05-20T10:02:00Z' },
    ],
  },
  {
    id: 'conv2',
    participants: ['0', '3'], // User and Sofia
    messages: [
      { id: 'm4', senderId: '0', text: 'Your travel photos are amazing!', timestamp: '2024-05-21T14:30:00Z' },
      { id: 'm5', senderId: '3', text: 'Thank you so much! I just got back from Bali.', timestamp: '2024-05-21T14:31:00Z' },
    ],
  },
];
