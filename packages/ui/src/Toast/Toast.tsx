import { flex } from '@maru/utils';
import type { CSSProperties } from 'react';
import styled from '@emotion/styled';
import Text from '../Text/Text';
import { color } from '@maru/design-system';
import { IconCancelCircle, IconCheckCircle } from '@maru/icon';

type ToastType = 'ERROR' | 'SUCCESS';
type DeviceType = 'MOBILE' | 'COMPUTER';

interface ToastProps {
  message: string;
  width?: CSSProperties['width'];
  type: ToastType;
  device?: DeviceType;
  progress: number;
  onRemove?: () => void;
}

const Toast = ({ message, width, type, device = 'COMPUTER', progress, onRemove }: ToastProps) => {
  return (
    <StyledToast style={{ width }} device={device} onClick={onRemove}>
      <ContentRow>
        {type === 'ERROR' ? (
          <IconCancelCircle width={32} height={32} />
        ) : (
          <IconCheckCircle width={32} height={32} />
        )}
        <Text fontType="p2" color={color.gray900}>
          {message}
        </Text>
      </ContentRow>
      <ProgressBar>
        <ProgressFill progress={progress} type={type} />
      </ProgressBar>
    </StyledToast>
  );
};

export default Toast;

const StyledToast = styled.div<{ device: DeviceType }>`
  ${flex({
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  })}
  background-color: #fff;
  width: ${({ device }) => (device === 'MOBILE' ? '100%' : 'auto')};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  animation: ${({ device }) => (device === 'MOBILE' ? 'slideInTop' : 'slideInRight')} 0.3s
    ease forwards;

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(80px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInTop {
    from {
      opacity: 0;
      transform: translateY(-40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ContentRow = styled.div`
  ${flex({
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  })}
  gap: 8px;
  padding: 20px 16px 16px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${color.gray200};
`;

const ProgressFill = styled.div<{ progress: number; type: ToastType }>`
  height: 100%;
  width: ${({ progress }) => `${(1 - progress) * 100}%`};
  background-color: ${({ type }) => (type === 'ERROR' ? '#F45452' : '#47B872')};
  transition: width 0.1s linear;
`;
