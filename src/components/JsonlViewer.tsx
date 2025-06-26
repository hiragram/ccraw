'use client';

import { useState } from 'react';
import { JsonlFile } from '@/types/jsonl';
import { formatJsonValue } from '@/utils/formatJson';
import { extractMessageData } from '@/utils/extractMessage';
import StructuredMessage from './StructuredMessage';
import styles from './JsonlViewer.module.css';

interface JsonlViewerProps {
  jsonlFile: JsonlFile;
  onReset: () => void;
}

export default function JsonlViewer({ jsonlFile, onReset }: JsonlViewerProps) {
  const [showInvalidLines, setShowInvalidLines] = useState(true);
  const [showJson, setShowJson] = useState(true);
  const [individualJsonVisibility, setIndividualJsonVisibility] = useState<Record<number, boolean>>({});

  const filteredData = showInvalidLines 
    ? jsonlFile.data 
    : jsonlFile.data.filter(item => item.isValid);

  const toggleIndividualJson = (lineNumber: number) => {
    setIndividualJsonVisibility(prev => ({
      ...prev,
      [lineNumber]: !prev[lineNumber]
    }));
  };

  const isJsonVisible = (lineNumber: number) => {
    return individualJsonVisibility[lineNumber] ?? showJson;
  };

  const handleGlobalJsonToggle = (checked: boolean) => {
    setShowJson(checked);
    // 全ての行の個別設定を新しい値で上書き
    const newIndividualVisibility: Record<number, boolean> = {};
    filteredData.forEach(item => {
      if (item.isValid) {
        newIndividualVisibility[item.line] = checked;
      }
    });
    setIndividualJsonVisibility(newIndividualVisibility);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.fileInfo}>
          <h2>{jsonlFile.name}</h2>
          <div className={styles.stats}>
            <span className={styles.stat}>
              サイズ: {formatFileSize(jsonlFile.size)}
            </span>
            <span className={styles.stat}>
              総行数: {jsonlFile.totalLines}
            </span>
            <span className={styles.stat}>
              有効行: <span className={styles.valid}>{jsonlFile.validLines}</span>
            </span>
            {jsonlFile.invalidLines > 0 && (
              <span className={styles.stat}>
                無効行: <span className={styles.invalid}>{jsonlFile.invalidLines}</span>
              </span>
            )}
          </div>
        </div>
        
        <div className={styles.controls}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={showJson}
              onChange={(e) => handleGlobalJsonToggle(e.target.checked)}
            />
            生JSON表示
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={showInvalidLines}
              onChange={(e) => setShowInvalidLines(e.target.checked)}
            />
            無効行も表示
          </label>
          <button onClick={onReset} className={styles.resetButton}>
            新しいファイル
          </button>
        </div>
      </div>

      <div className={styles.dataContainer}>
        {filteredData.map((item) => {
          const messageData = item.isValid ? extractMessageData(item.content) : null;
          const itemId = messageData?.uuid ? `message-${messageData.uuid}` : `line-${item.line}`;
          
          return (
            <div
              key={item.line}
              id={itemId}
              className={`${styles.dataItem} ${!item.isValid ? styles.invalidItem : ''}`}
            >
            <div className={styles.lineNumber}>
              <div className={styles.leftSection}>
                <span>行 {item.line}</span>
                {messageData?.isSidechain && (
                  <span className={styles.sidechainBadge}>Sidechain</span>
                )}
                {messageData?.isMeta && (
                  <span className={styles.metaBadge}>Meta</span>
                )}
              </div>
              <div className={styles.rightSection}>
                {!item.isValid && <span className={styles.errorBadge}>エラー</span>}
                {item.isValid && (
                  <label className={styles.jsonToggle}>
                    <input
                      type="checkbox"
                      checked={isJsonVisible(item.line)}
                      onChange={() => toggleIndividualJson(item.line)}
                    />
                    JSON
                  </label>
                )}
              </div>
            </div>
            
            <div className={styles.content}>
              {item.isValid ? (
                <div>
                  <StructuredMessage message={messageData!} />
                  {isJsonVisible(item.line) && (
                    <div className={styles.jsonContent}>
                      {formatJsonValue(item.content)}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.errorContent}>
                  <div className={styles.rawContent}>{String(item.content)}</div>
                  <div className={styles.errorMessage}>
                    エラー: {item.error}
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}