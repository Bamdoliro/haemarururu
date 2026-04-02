'use client';
import { commandsCtx, Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import type { CmdKey } from '@milkdown/core';
import {
  commonmark,
  toggleStrongCommand,
  toggleEmphasisCommand,
  wrapInHeadingCommand,
  insertImageCommand,
} from '@milkdown/preset-commonmark';
import { gfm, toggleStrikethroughCommand } from '@milkdown/preset-gfm';
import { Milkdown, MilkdownProvider, useEditor, useInstance } from '@milkdown/react';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
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
import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useRef } from 'react';

interface MarkdownEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const EditorToolbar = () => {
  const [loading, get] = useInstance();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const call = <T,>(command: { key: CmdKey<T> }, payload?: T) => {
    if (loading) return;
    get()?.action((ctx) => {
      ctx.get(commandsCtx).call(command.key, payload);
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      call(insertImageCommand, { src: base64, alt: fileName, title: fileName });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton
          type="button"
          title="H1"
          onClick={() => call(wrapInHeadingCommand, 1)}
        >
          <IconH1 width={24} height={24} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          title="H2"
          onClick={() => call(wrapInHeadingCommand, 2)}
        >
          <IconH2 width={24} height={24} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          title="H3"
          onClick={() => call(wrapInHeadingCommand, 3)}
        >
          <IconH3 width={24} height={24} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          title="H4"
          onClick={() => call(wrapInHeadingCommand, 4)}
        >
          <IconH4 width={24} height={24} />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarDivider />
      <ToolbarGroup>
        <ToolbarButton
          type="button"
          title="굵게"
          onClick={() => call(toggleStrongCommand)}
        >
          <IconBold width={24} height={24} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          title="기울임"
          onClick={() => call(toggleEmphasisCommand)}
        >
          <IconIntallic width={24} height={24} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          title="취소선"
          onClick={() => call(toggleStrikethroughCommand)}
        >
          <IconStroke width={24} height={24} />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarDivider />
      <ToolbarButton type="button" title="이미지" onClick={handleImageClick}>
        <IconImage width={24} height={24} />
      </ToolbarButton>
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </Toolbar>
  );
};

const EditorInner = ({ defaultValue = '', onChange }: MarkdownEditorProps) => {
  useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, defaultValue);
        if (onChange) {
          ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
            onChange(markdown);
          });
        }
      })
      .use(commonmark)
      .use(gfm)
      .use(listener)
  );

  return <Milkdown />;
};

const MarkdownEditor = ({ defaultValue, onChange }: MarkdownEditorProps) => (
  <StyledEditor>
    <MilkdownProvider>
      <EditorToolbar />
      <EditorInner defaultValue={defaultValue} onChange={onChange} />
    </MilkdownProvider>
  </StyledEditor>
);

export default MarkdownEditor;

const StyledEditor = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  .milkdown {
    font-family: inherit;
    line-height: 1.5;
  }

  .ProseMirror {
    outline: none;
    color: ${color.gray900} !important;
    min-height: 350px;
    padding: 16px;
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;

    & > * {
      ${font.p2}
      margin: 6px 0;
    }

    p {
      ${font.p2}
      margin: 6px 0;
      color: ${color.gray900};
    }

    h1 {
      ${font.H1}
      margin: 16px 0 8px;
      color: ${color.gray900};
    }

    h2 {
      ${font.H2}
      margin: 14px 0 6px;
      color: ${color.gray900};
    }

    h3 {
      ${font.H3}
      margin: 12px 0 4px;
      color: ${color.gray900};
    }

    h4 {
      ${font.H4}
      margin: 10px 0 4px;
      color: ${color.gray900};
    }

    strong {
      font-weight: 700;
      color: ${color.gray900};
    }

    em {
      font-style: italic;
      color: ${color.gray900};
    }

    del {
      text-decoration: line-through;
      color: ${color.gray900};
    }

    a {
      color: ${color.haeMaruDefault};
      text-decoration: underline;
    }

    code {
      background: ${color.gray100};
      border-radius: 4px;
      padding: 2px 6px;
      font-family: monospace;
      color: ${color.gray900};
    }

    pre {
      background: ${color.gray100};
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      color: ${color.gray900};

      code {
        background: none;
        padding: 0;
      }
    }

    ul,
    ol {
      padding-left: 24px;
      margin: 6px 0;
      color: ${color.gray900};
    }

    li {
      color: ${color.gray900};
    }

    blockquote {
      border-left: 4px solid ${color.gray300};
      margin: 8px 0;
      padding: 4px 16px;
      color: ${color.gray600};
    }

    img {
      max-width: 100%;
      border-radius: 4px;
      display: block;
      margin: 8px 0;
    }
  }

  .ProseMirror-focused {
    outline: none;
  }
`;

const Toolbar = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 4px;
  padding: 12px 16px;
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
  border: none;
  background-color: ${color.white};
  color: ${color.gray700};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${color.gray100};
    color: ${color.gray900};
  }

  &:active {
    background: ${color.gray200};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
