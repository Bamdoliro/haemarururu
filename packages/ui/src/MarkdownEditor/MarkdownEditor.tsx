import { color, font } from '@maru/design-system';
import {
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconImage,
  IconIntallic,
  IconStroke,
} from '@maru/icon';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import React, { useRef } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type FormatType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'image';

const MarkdownEditor = ({
  value,
  onChange,
  placeholder = '내용을 작성해주세요.',
}: MarkdownEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (type: FormatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end);

    let newText = value;
    let newStart = start;
    let newEnd = end;

    switch (type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4': {
        const prefixes: Record<string, string> = {
          h1: '# ',
          h2: '## ',
          h3: '### ',
          h4: '#### ',
        };
        const prefix = prefixes[type];
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const lineContent = value.slice(lineStart);
        const headingMatch = lineContent.match(/^#{1,4} /);
        if (headingMatch) {
          const removed = headingMatch[0].length;
          newText = value.slice(0, lineStart) + prefix + lineContent.slice(removed);
          newStart = start - removed + prefix.length;
          newEnd = end - removed + prefix.length;
        } else {
          newText = value.slice(0, lineStart) + prefix + value.slice(lineStart);
          newStart = start + prefix.length;
          newEnd = end + prefix.length;
        }
        break;
      }
      case 'bold': {
        newText = value.slice(0, start) + `**${selectedText}**` + value.slice(end);
        newStart = start + 2;
        newEnd = end + 2;
        break;
      }
      case 'italic': {
        newText = value.slice(0, start) + `*${selectedText}*` + value.slice(end);
        newStart = start + 1;
        newEnd = end + 1;
        break;
      }
      case 'strikethrough': {
        newText = value.slice(0, start) + `~~${selectedText}~~` + value.slice(end);
        newStart = start + 2;
        newEnd = end + 2;
        break;
      }
      case 'image': {
        newText = value.slice(0, start) + `![${selectedText}]()` + value.slice(end);
        newStart = start + 2 + selectedText.length + 2;
        newEnd = newStart;
        break;
      }
    }

    onChange(newText);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    });
  };

  return (
    <StyledMarkdownEditor>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButton type="button" onClick={() => applyFormat('h1')} title="H1">
            <IconH1 width={24} height={24} />
          </ToolbarButton>
          <ToolbarButton type="button" onClick={() => applyFormat('h2')} title="H2">
            <IconH2 width={24} height={24} />
          </ToolbarButton>
          <ToolbarButton type="button" onClick={() => applyFormat('h3')} title="H3">
            <IconH3 width={24} height={24} />
          </ToolbarButton>
          <ToolbarButton type="button" onClick={() => applyFormat('h4')} title="H4">
            <IconH4 width={24} height={24} />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarDivider />
        <ToolbarGroup>
          <ToolbarButton type="button" onClick={() => applyFormat('bold')} title="굵게">
            <IconBold width={24} height={24} />
          </ToolbarButton>
          <ToolbarButton
            type="button"
            onClick={() => applyFormat('italic')}
            title="기울임"
          >
            <IconIntallic width={24} height={24} />
          </ToolbarButton>
          <ToolbarButton
            type="button"
            onClick={() => applyFormat('strikethrough')}
            title="취소선"
          >
            <IconStroke width={24} height={24} />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarDivider />
        <ToolbarButton type="button" onClick={() => applyFormat('image')} title="이미지">
          <IconImage width={24} height={24} />
        </ToolbarButton>
      </Toolbar>
      <EditorTextarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </StyledMarkdownEditor>
  );
};

export default MarkdownEditor;

const StyledMarkdownEditor = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
`;

const Toolbar = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 4px;
  padding: 0;
`;

const ToolbarGroup = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 2px;
`;

const ToolbarDivider = styled.div`
  width: 1px;
  height: 20px;
  background: ${color.gray300};
  margin: 0 4px;
`;

const ToolbarButton = styled.button`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: ${color.gray700};
  cursor: pointer;

  &:hover {
    background: ${color.gray100};
    color: ${color.gray900};
  }
`;

const EditorTextarea = styled.textarea`
  ${font.p2}
  color: ${color.gray900};
  width: 100%;
  min-height: 400px;
  padding-top: 32px;
  resize: none;

  &::placeholder {
    color: ${color.gray500};
  }
`;
