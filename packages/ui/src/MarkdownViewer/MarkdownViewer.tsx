'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { color, font } from '@maru/design-system';
import styled from '@emotion/styled';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => (
  <StyledViewer>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </StyledViewer>
);

export default MarkdownViewer;

const StyledViewer = styled.div`
  ${font.p2}
  color: ${color.gray900};
  word-break: break-word;

  h1 {
    ${font.H1}
    margin: 16px 0 8px;
  }
  h2 {
    ${font.H2}
    margin: 14px 0 6px;
  }
  h3 {
    ${font.H3}
    margin: 12px 0 4px;
  }
  h4 {
    ${font.H4}
    margin: 10px 0 4px;
  }
  p {
    margin: 6px 0;
  }
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
  del {
    text-decoration: line-through;
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
  }
  pre {
    background: ${color.gray100};
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }
  ul,
  ol {
    padding-left: 24px;
    margin: 6px 0;
  }
  blockquote {
    border-left: 4px solid ${color.gray300};
    margin: 8px 0;
    padding: 4px 16px;
    color: ${color.gray600};
  }
  img {
    max-width: 100%;
  }
`;
