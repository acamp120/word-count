# Word & Character Counter

A simple, responsive Word & Character Counter web app built with Next.js and Tailwind CSS.  
Designed as a learning project to explore React hooks, Next.js App Router, API routes, and client-server interactions.

---

## Features

- Live updates for:
  - Word count  
  - Character count  
  - Longest word  
  - Average word length  

- Spell check integration using a local dictionary API powered by [dwyl's English Words](https://github.com/dwyl/english-words) dictionary.  
- Reset button to clear input and stats.  
- Disabled states on buttons based on input and processing status.  
- Responsive design using Tailwind CSS utility classes.

---

## Concepts Utilized

- React hooks (`useState`) for managing component state and reactivity.  
- Next.js App Router with file-based routing and layouts.  
- Client vs Server Components in Next.js to optimize rendering.  
- API routes handling asynchronous file reading and JSON responses.  
- Conditional rendering and UI state management (loading, error, success).  
- TypeScript for type safety and clear interfaces.  
- Basic text processing with regular expressions for input sanitization.  
- Tailwind CSS for utility-first styling and responsive layouts.

---

## Getting Started

1. Clone the repo  
2. Run `npm install`  
3. Run `npm run dev` to start the development server  
4. Navigate to `http://localhost:3000` to use the app

---

## Folder Structure

- `app/` - Next.js app directory including page components and API routes  
- `public/dictionaries/` - Contains the dictionary text file for spellcheck  
- `components/` - Reusable UI components (`TextInput`, `Stats`, etc.)  

---

## License

MIT License

---

Made by Aaron J. Campanella
