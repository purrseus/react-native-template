import { StyleCallbackParams } from '@core/interfaces';

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    screenStyle: {
      backgroundColor: colors.background,
    },
  });

export default createStyles;
