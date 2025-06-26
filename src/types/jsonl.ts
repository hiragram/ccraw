export interface JsonlData {
  line: number;
  content: any;
  isValid: boolean;
  error?: string;
}

export interface JsonlFile {
  name: string;
  size: number;
  data: JsonlData[];
  totalLines: number;
  validLines: number;
  invalidLines: number;
}