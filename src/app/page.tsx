'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import JsonlViewer from '@/components/JsonlViewer';
import { parseJsonlFile } from '@/utils/jsonlParser';
import { JsonlFile } from '@/types/jsonl';
import styles from './page.module.css';

export default function Home() {
  const [jsonlFile, setJsonlFile] = useState<JsonlFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const content = await file.text();
      const parsedFile = parseJsonlFile(content, file.name);
      setJsonlFile(parsedFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ファイルの読み込みに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setJsonlFile(null);
    setError(null);
  };

  // ページ離脱時の警告設定
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (jsonlFile) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };

    if (jsonlFile) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [jsonlFile]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>ccraw</h1>
          <p>Claude conversation data viewer and analyzer</p>
        </header>

        {error && (
          <div className={styles.error}>
            <h3>エラーが発生しました</h3>
            <p>{error}</p>
            <button onClick={handleReset} className={styles.errorButton}>
              リセット
            </button>
          </div>
        )}

        {!jsonlFile && !error && (
          <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
        )}

        {jsonlFile && !error && (
          <JsonlViewer jsonlFile={jsonlFile} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}