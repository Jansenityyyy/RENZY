const STUDENTS = [
  { name: 'Jansen Silao', program: 'BS in Computer Science', yearLevel: '3rd Year' },
  { name: 'Jose Mari Chan', program: 'BS in Information Technology', yearLevel: '2nd Year' },
  { name: 'Dray Pasion', program: 'BS in Information Systems', yearLevel: '1st Year' },
  { name: 'Ana Villanueva', program: 'BS in Computer Science', yearLevel: '4th Year' },
  { name: 'Carlo Mendoza', program: 'BS in Computer Engineering', yearLevel: '2nd Year' },
];

const USERS = [
  { id: 1, name: 'Renz San Diego', email: 'renz@example.com', password: 'password123' },
  { id: 2, name: 'Guest User', email: 'guest@example.com', password: 'guest123' },
];

const BLOGS = [
  {
    id: 1,
    title: 'Getting Started with React',
    author: 'Renz San Diego',
    date: '2026-10-01',
    category: 'React',
    description: 'A beginner-friendly look at components and JSX.',
    content:
      'React lets you build interfaces out of small, reusable components. In this blog we go through setting up a Vite project, writing your first component, and using JSX to describe the UI.',
    likes: 42,
    comments: 8,
    views: 310,
  },
  {
    id: 2,
    title: 'Understanding useState',
    author: 'Guest User',
    date: '2026-10-03',
    category: 'React',
    description: 'How a component remembers values between renders.',
    content:
      'useState lets a component remember values between renders. Calling the setter function triggers a re-render so the screen always matches the latest state.',
    likes: 65,
    comments: 14,
    views: 520,
  },
  {
    id: 3,
    title: 'Routing with React Router',
    author: 'Renz San Diego',
    date: '2026-10-05',
    category: 'Web Development',
    description: 'Creating multiple pages in a single-page app.',
    content:
      'React Router lets you create multiple pages in a single-page app. We cover BrowserRouter, Routes, Route, and Link, and how URLs map to components.',
    likes: 30,
    comments: 5,
    views: 245,
  },
  {
    id: 4,
    title: 'Props vs State',
    author: 'Guest User',
    date: '2026-10-07',
    category: 'JavaScript',
    description: 'The difference between data passed in and data owned.',
    content:
      'Props are passed down to a component and are read-only, while state is owned by the component and can change over time. Knowing which to use keeps your app predictable.',
    likes: 51,
    comments: 11,
    views: 402,
  },
  {
    id: 5,
    title: 'Styling with CSS Flexbox',
    author: 'Renz San Diego',
    date: '2026-10-08',
    category: 'Web Development',
    description: 'Laying out pages the easy way with Flexbox.',
    content:
      'Flexbox makes it easy to align and distribute space between items in a container. We look at flex direction, justify-content, align-items, and gap.',
    likes: 24,
    comments: 3,
    views: 188,
  },
  
];


const COMMENTS = [
  { id: 2, blogId: 1, author: 'Guest User', text: 'Very helpful intro, thanks!', date: '2026-10-02' },
  { id: 2, blogId: 1, author: 'Maria Santos', text: 'Finally understood components.', date: '2026-10-03' },
  { id: 1, blogId: 2, author: 'Carlo Mendoza', text: 'The re-render explanation is clear.', date: '2026-10-04' },
  { id: 1, blogId: 2, author: 'Ana Villanueva', text: 'Can you cover useEffect next?', date: '2026-10-05' },
  { id: 1, blogId: 3, author: 'Dray Pasion', text: 'Routing finally makes sense.', date: '2026-10-06' },
  { id: 6, blogId: 4, author: 'Jose Mari Chan', text: 'Props vs state in one post, nice.', date: '2026-10-08' },
  { id: 7, blogId: 5, author: 'Maria Santos', text: 'Flexbox saved my layout!', date: '2026-10-09' },
];

const PROFILE = {
  name: 'Renz San Diego',
  email: 'renz@example.com',
  contact: '0900 000 0000',
  program: 'BS in Computer Science',
  yearLevel: '3rd Year',
  bio: 'Author of this blog site. Loves building things with React.',
};
// Sample Request/Response functions (walang backend, kunwari API)
const loginRequest = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find((u) => u.email === email && u.password === password);
      if (user) {
        resolve({
          status: 200,
          message: 'Login successful',
          user: { id: user.id, name: user.name, email: user.email },
        });
      } else {
        reject({ status: 401, message: 'Invalid email or password' });
      }
    }, 500);
  });

const getBlogsRequest = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ status: 200, data: BLOGS }), 300);
  });

export { STUDENTS, USERS, BLOGS, COMMENTS, PROFILE, loginRequest, getBlogsRequest };