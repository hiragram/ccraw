import React from 'react';
import JsonHighlight from '@/components/JsonHighlight';

export function formatJsonValue(value: any): React.ReactElement {
  return <JsonHighlight value={value} />;
}