'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface JsonHighlightProps {
  value: any;
}

export default function JsonHighlight({ value }: JsonHighlightProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlightJson = async () => {
      try {
        setIsLoading(true);
        const jsonString = JSON.stringify(value, null, 4);
        
        const html = await codeToHtml(jsonString, {
          lang: 'json',
          theme: 'andromeeda'
        });
        
        setHighlightedCode(html);
      } catch (error) {
        console.error('Failed to highlight JSON:', error);
        // フォールバック: プレーンテキスト
        setHighlightedCode(`<pre><code>${JSON.stringify(value, null, 4)}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightJson();
  }, [value]);

  if (isLoading) {
    return (
      <pre style={{ color: '#666', fontStyle: 'italic' }}>
        シンタックスハイライトを適用中...
      </pre>
    );
  }

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      style={{ 
        fontSize: '0.9rem', 
        lineHeight: '1.6',
        maxWidth: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}
    />
  );
}