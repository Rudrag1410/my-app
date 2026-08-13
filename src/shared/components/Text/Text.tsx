import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { theme } from '@/shared/theme/theme';
import { textStyles } from './Text.styles';

export enum TextVariant {
  Display = 'display',
  Title = 'title',
  Body = 'body',
  BodyMedium = 'bodyMedium',
  Label = 'label',
  Caption = 'caption',
}

type ColorToken = keyof typeof theme.colors;

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  colorToken?: ColorToken;
}

export const Text = ({
  variant = TextVariant.Body,
  colorToken,
  style,
  children,
  ...rest
}: TextProps) => {
  return (
    <RNText
      style={[
        textStyles.base,
        textStyles[variant],
        colorToken ? { color: theme.colors[colorToken] } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
