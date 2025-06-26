# ccraw

[![npm downloads](https://img.shields.io/npm/dm/ccraw.svg)](https://www.npmjs.com/package/ccraw)
[![npm version](https://img.shields.io/npm/v/ccraw.svg)](https://www.npmjs.com/package/ccraw)

A web-based Claude Code raw chat archive viewer built with Next.js and React.

## Overview

ccraw (Claude Code Raw) is a specialized tool for viewing Claude Code raw chat archives stored in JSONL (JSON Lines) format. It provides a structured view of conversation messages with support for various content types including text, thinking blocks, tool usage, and tool results.

## Features

- **JSONL File Upload**: Drag and drop or select JSONL files containing Claude Code conversation data
- **Structured Message Display**: Renders conversation messages with proper formatting for different content types:
  - Text content
  - Thinking blocks
  - Tool usage and results
  - Message metadata (role, UUID, parent relationships)
- **Toggle Views**: Switch between structured view and raw JSON view
- **Error Handling**: Displays invalid lines with error messages
- **File Statistics**: Shows file size, total lines, valid/invalid line counts
- **Navigation**: Click on parent message links to navigate through conversation chains
- **Responsive Design**: Clean, modern interface that works across different screen sizes

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ccraw.git
cd ccraw
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Open the application in your browser
2. Upload a JSONL file containing Claude Code chat archives by:
   - Dragging and dropping the file onto the upload area
   - Clicking the upload area to select a file
3. View the structured chat data with:
   - Message roles and content
   - Tool usage and results
   - Navigation between related messages
4. Use the toggle controls to:
   - Show/hide raw JSON view
   - Show/hide invalid lines
5. Click "New File" to upload a different file

## Data Format

The application expects JSONL files where each line contains a JSON object with the following structure:

```json
{
  "message": {
    "role": "user|assistant",
    "content": "string or array of content items"
  },
  "uuid": "message-uuid",
  "parentUuid": "parent-message-uuid",
  "isSidechain": false,
  "isMeta": false,
  "toolUseResult": {}
}
```

## Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Shiki** - Syntax highlighting for JSON
- **CSS Modules** - Styling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FileUpload.tsx
│   ├── JsonlViewer.tsx
│   ├── StructuredMessage.tsx
│   └── JsonHighlight.tsx
├── types/
│   └── jsonl.ts
└── utils/
    ├── extractMessage.ts
    ├── formatJson.tsx
    └── jsonlParser.ts
```

## License

ISC