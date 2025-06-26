export interface ContentItem {
  type: string;
  text?: string;
  thinking?: string;
  name?: string;
  input?: any;
  content?: any;
  tool_use_id?: string;
  [key: string]: any;
}

export interface ExtractedMessage {
  role?: string;
  content?: string;
  contentItems?: ContentItem[];
  toolUseResult?: any;
  isSidechain?: boolean;
  isMeta?: boolean;
  uuid?: string;
  parentUuid?: string;
  hasMessage: boolean;
  isContentArray: boolean;
  hasToolResult: boolean;
}

export function extractMessageData(data: any): ExtractedMessage {
  if (!data || typeof data !== 'object') {
    return { hasMessage: false, isContentArray: false, hasToolResult: false };
  }

  const message = data.message;
  const toolUseResult = data.toolUseResult;
  const isSidechain = typeof data.isSidechain === 'boolean' ? data.isSidechain : undefined;
  const isMeta = typeof data.isMeta === 'boolean' ? data.isMeta : undefined;
  const uuid = typeof data.uuid === 'string' ? data.uuid : undefined;
  const parentUuid = typeof data.parentUuid === 'string' ? data.parentUuid : undefined;
  
  if (!message || typeof message !== 'object') {
    return { hasMessage: false, isContentArray: false, hasToolResult: false };
  }

  const role = typeof message.role === 'string' ? message.role : undefined;
  
  // content が文字列の場合
  if (typeof message.content === 'string') {
    return {
      role,
      content: message.content,
      toolUseResult,
      isSidechain,
      isMeta,
      uuid,
      parentUuid,
      hasMessage: true,
      isContentArray: false,
      hasToolResult: !!toolUseResult,
    };
  }
  
  // content が配列の場合
  if (Array.isArray(message.content)) {
    return {
      role,
      contentItems: message.content,
      toolUseResult,
      isSidechain,
      isMeta,
      uuid,
      parentUuid,
      hasMessage: true,
      isContentArray: true,
      hasToolResult: !!toolUseResult,
    };
  }

  return {
    role,
    toolUseResult,
    isSidechain,
    isMeta,
    uuid,
    parentUuid,
    hasMessage: true,
    isContentArray: false,
    hasToolResult: !!toolUseResult,
  };
}