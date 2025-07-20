import { Icon, Tooltip, TooltipProps } from '@blueprintjs/core';

export interface HoverInfoProps {
  tooltipContent: TooltipProps['content'];
}

/**
 * TODO: This does not support click interaction (for mobile)
 */
export function HoverInfo({ tooltipContent }: HoverInfoProps) {
  return (
    <Tooltip
      content={tooltipContent}
      className="hover-info"
      popoverClassName="popover-class"
      portalClassName="portal-class"
    >
      <Icon icon="info-sign" color="gray" />
    </Tooltip>
  );
}
