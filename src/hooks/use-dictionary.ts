import { useLanguage } from '@/components/language-provider';

export function useDictionary() {
  const { dictionary } = useLanguage();
  return dictionary;
}
