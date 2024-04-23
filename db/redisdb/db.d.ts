interface User {
  name: string;
  image: string;
  id: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

interface Chat {
  id: string;
  messages: Message[];
}