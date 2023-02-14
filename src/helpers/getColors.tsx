import ImageColors from 'react-native-image-colors';

export const getImgColors = async (uri: string) => {
  const colors = await ImageColors.getColors(uri, {});

  let primary;
  let secondary;

  switch (colors.platform) {
    case 'android':
      // android result properties
      primary = colors.dominant;
      secondary = colors.average;
      break;
    case 'ios':
      // iOS result properties
      primary = colors.background;
      secondary = colors.detail;
      break;
    default:
      throw new Error('Unexpected platform key');
  }

  return [primary, secondary];
};
