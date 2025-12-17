const fs = require('fs');
const path = require('path');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = {};
  }

  async read_file() {
    try {
      const content = await fs.promises.readFile(this.filePath, 'utf8');
      return content;
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  async parse_file() {
    const content = await this.read_file();
    const lines = content.split('\n');
    lines.forEach((line) => {
      const [key, value] = line.split('=');
      this.data[key.trim()] = value.trim();
    });
    return this.data;
  }

  async parse() {
    if (!this.filePath || typeof this.filePath !== 'string') {
      throw new Error('Invalid file path');
    }
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File not found: ${this.filePath}`);
    }
    return this.parse_file();
  }
}

module.exports = Parser;