import {
  useFonts,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
} from '@expo-google-fonts/mulish';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

export const useAppFonts = () => {
  return useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    PlayfairDisplay_700Bold,
  });
};
