'use client';

import { useRef } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export default function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={styles.uploadArea}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".jsonl,.json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={isLoading}
      />
      
      <div className={styles.uploadContent}>
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Analyzing file...</p>
          </div>
        ) : (
          <>
            <div className={styles.uploadIcon}>📁</div>
            <h3>Upload JSONL File</h3>
            <p>Drag & drop your file here, or click to select</p>
            <p className={styles.hint}>Claude Code chat archives are located in <code>~/.claude/projects</code></p>
          </>
        )}
      </div>
    </div>
  );
}