import { ExtractedMessage, ContentItem } from '@/utils/extractMessage';
import styles from './StructuredMessage.module.css';

interface StructuredMessageProps {
  message: ExtractedMessage;
}

function renderContentItem(item: ContentItem, index: number) {
  if (item.type === 'text' && item.text) {
    return (
      <div key={index} className={styles.textContent}>
        {item.text}
      </div>
    );
  }
  
  if (item.type === 'thinking' && item.thinking) {
    return (
      <div key={index} className={styles.thinkingContent}>
        <div className={styles.thinkingLabel}>💭 Thinking:</div>
        <div className={styles.thinkingText}>
          {item.thinking}
        </div>
      </div>
    );
  }
  
  if (item.type === 'tool_use' && item.name && item.input) {
    return (
      <div key={index} className={styles.toolUseContent}>
        <div className={styles.toolUseHeader}>
          <span className={styles.toolUseLabel}>🔧 Tool Use:</span>
          <span className={styles.toolName}>{item.name}</span>
        </div>
        <div className={styles.toolInput}>
          <div className={styles.inputLabel}>Input:</div>
          <pre className={styles.inputData}>
            {JSON.stringify(item.input, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
  
  if (item.type === 'tool_result' && item.content) {
    return (
      <div key={index} className={styles.toolResultContent}>
        <div className={styles.toolResultHeader}>
          <span className={styles.toolResultLabel}>✅ Tool Result:</span>
          {item.tool_use_id && (
            <span className={styles.toolUseId}>{item.tool_use_id}</span>
          )}
        </div>
        <div className={styles.toolResultOutput}>
          <div className={styles.outputLabel}>Output:</div>
          <div className={styles.outputContent}>
            {typeof item.content === 'string' ? item.content : JSON.stringify(item.content, null, 2)}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div key={index} className={styles.unknownContent}>
      <div className={styles.contentType}>Type: {item.type}</div>
      <pre className={styles.contentData}>
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  );
}

export default function StructuredMessage({ message }: StructuredMessageProps) {
  if (!message.hasMessage) {
    return <div className={styles.noMessage}>No message data</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.metadata}>
        {message.role && (
          <div className={styles.roleSection}>
            <span className={styles.label}>Role:</span>
            <span className={`${styles.roleValue} ${styles[`role-${message.role}`]}`}>
              {message.role}
            </span>
          </div>
        )}
      </div>
      
      {/* 文字列のcontent */}
      {message.content && (
        <div className={styles.contentSection}>
          <div className={styles.label}>Content:</div>
          <div className={styles.content}>
            {message.content}
          </div>
        </div>
      )}
      
      {/* 配列のcontent */}
      {message.isContentArray && message.contentItems && (
        <div className={styles.contentSection}>
          <div className={styles.label}>Content:</div>
          <div className={styles.contentArray}>
            {message.contentItems.map((item, index) => renderContentItem(item, index))}
          </div>
        </div>
      )}
      
      {/* 親メッセージリンク */}
      {message.parentUuid && (
        <div className={styles.parentSection}>
          <span className={styles.label}>Parent:</span>
          <a 
            href={`#message-${message.parentUuid}`}
            className={styles.parentLink}
            title="Go to parent message"
          >
            {message.parentUuid.substring(0, 8)}...
          </a>
        </div>
      )}
      
      {/* toolUseResult */}
      {message.hasToolResult && message.toolUseResult && (
        <div className={styles.toolUseResultSection}>
          <div className={styles.label}>Tool Use Result:</div>
          <div className={styles.toolUseResultContent}>
            <pre className={styles.toolUseResultData}>
              {JSON.stringify(message.toolUseResult, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}