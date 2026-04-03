import { commandsCtx } from '@milkdown/core';
import type { CmdKey } from '@milkdown/core';
import {
  insertImageCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInHeadingCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';
import { useInstance } from '@milkdown/react';
import {
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconImage,
  IconStroke,
  IconItallic,
} from '@maru/icon';
import type { ChangeEvent, ComponentType, SVGProps } from 'react';
import { useRef } from 'react';

interface ToolbarAction<T = unknown> {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  command: { key: CmdKey<T> };
  payload?: T;
}

interface CommandRunner {
  call: <T>(key: CmdKey<T>, payload?: T) => void;
}

interface CommandContext {
  get: (context: typeof commandsCtx) => CommandRunner;
}

const headingActions: ToolbarAction<number>[] = [
  { title: 'H1', icon: IconH1, command: wrapInHeadingCommand, payload: 1 },
  { title: 'H2', icon: IconH2, command: wrapInHeadingCommand, payload: 2 },
  { title: 'H3', icon: IconH3, command: wrapInHeadingCommand, payload: 3 },
  { title: 'H4', icon: IconH4, command: wrapInHeadingCommand, payload: 4 },
];

const textStyleActions: ToolbarAction[] = [
  { title: '굵게', icon: IconBold, command: toggleStrongCommand },
  { title: '기울임', icon: IconItallic, command: toggleEmphasisCommand },
  { title: '취소선', icon: IconStroke, command: toggleStrikethroughCommand },
];

const imageAction = {
  title: '이미지',
  icon: IconImage,
  command: insertImageCommand,
};

const getImagePayload = (file: File, src: string) => {
  const fileName = file.name.replace(/\.[^/.]+$/, '');

  return { src, alt: fileName, title: fileName };
};

const createImageLoadHandler =
  (onLoad: (result: string) => void) => (event: ProgressEvent<FileReader>) => {
    const result = event.target?.result;
    if (typeof result !== 'string') return;

    onLoad(result);
  };

export const useMarkdownEditorToolbar = () => {
  const [loading, get] = useInstance();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ImageIcon = imageAction.icon;

  const call = <T>(command: { key: CmdKey<T> }, payload?: T) => {
    if (loading) return;

    get()?.action((context) => {
      const commandContext = context as CommandContext;

      commandContext.get(commandsCtx).call(command.key, payload);
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = createImageLoadHandler((result) => {
      call(imageAction.command, getImagePayload(file, result));
    });
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    headingActions,
    textStyleActions,
    imageTitle: imageAction.title,
    ImageIcon,
    fileInputRef,
    call,
    handleImageClick,
    handleImageChange,
  };
};
