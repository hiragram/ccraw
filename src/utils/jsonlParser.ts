import { JsonlData, JsonlFile } from '@/types/jsonl';

export function parseJsonlFile(content: string, fileName: string): JsonlFile {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const data: JsonlData[] = [];
  let validLines = 0;
  let invalidLines = 0;

  lines.forEach((line, index) => {
    try {
      const parsed = JSON.parse(line);
      data.push({
        line: index + 1,
        content: parsed,
        isValid: true,
      });
      validLines++;
    } catch (error) {
      data.push({
        line: index + 1,
        content: line,
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      invalidLines++;
    }
  });

  return {
    name: fileName,
    size: content.length,
    data,
    totalLines: lines.length,
    validLines,
    invalidLines,
  };
}