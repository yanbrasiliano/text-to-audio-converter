
## Text to Audio Converter

This project is a simple text-to-audio converter built with TypeScript, vanilla JavaScript ES6, HTML, and CSS. It allows users to input text and convert it to audio output using the Web Speech API.

## Features

- Convert text to speech using Web Speech API
- Simple and intuitive user interface
- Supports multiple languages and voices (based on browser support)
- Speech rate and pitch adjustment.

## Getting Started

### Prerequisites

Ensure you have a modern web browser that supports the Web Speech API. Also, ensure you have Node.js and TypeScript installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yanbrasiliano/text-to-audio-converter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd text-to-audio-converter
   ```
3. Install TypeScript globally if you haven't already:
   ```bash
   npm install -g typescript
   ```
4. Compile the TypeScript files to JavaScript:
   ```bash
   tsc
   ```
5. Open `index.html` in your web browser.

### Development

For development, you can set up automatic TypeScript compilation:

1. Create a `tsconfig.json` file in the project root with the following content:
   ```json
   {
     "compilerOptions": {
       "target": "es5",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true
     },
     "include": ["src/**/*"]
   }
   ```
2. Move your `main.ts` file to a `src` directory.
3. Run the TypeScript compiler in watch mode:
   ```bash
   tsc --watch
   ```
4. Update the script reference in `index.html` to point to the compiled JavaScript file in the `dist` directory:
   ```html
   <script src="../dist/main.js" defer></script>
   ```

**Note:** The `dist/` directory is included in `.gitignore` and should not be committed to the repository. Contributors should compile the TypeScript files locally.

## Usage

1. Open the application in your web browser.
2. Enter the text you want to convert to audio in the text input field.
3. Select the language and voice (if applicable).
4. Click the "Convert" button to hear the audio output.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.