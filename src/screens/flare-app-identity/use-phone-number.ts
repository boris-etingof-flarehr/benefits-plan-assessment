import { useMemo, useState } from 'preact/hooks';

const AuNumberPattern = /^04\d{1,14}/;
const IntlNumberPattern = /^\+[1-9]\d{1,14}/;
const COUNTRY_CODE_AU = '61';
const mask = '#### ### ### ### ### ### ###';
const isIntlFormat = (str: string): boolean => IntlNumberPattern.test(str);
const isAuFormat = (str: string): boolean => AuNumberPattern.test(str);
const trim = (str: string): string => str.replace(/ /g, '');
const maskString = (str: string): string => {
  let i = 0;
  return mask.replace(/#/g, () => str[i++] ?? '').trim();
};

const usePhoneNumber = (): {
  phoneNumber: {
    valid: boolean;
    formatted: string;
    masked: string;
  };
  // eslint-disable-next-line no-unused-vars
  setPhoneNumber: (phoneNumber: string) => void;
} => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const trimmed = useMemo(() => trim(phoneNumber), [phoneNumber]);

  const valid = useMemo((): boolean => isIntlFormat(trimmed) || isAuFormat(trimmed), [trimmed]);

  const formatted = useMemo(
    () => (isIntlFormat(trimmed) ? trimmed : `+${COUNTRY_CODE_AU}${trimmed}`),
    [trimmed]
  );

  const masked = useMemo(() => maskString(trimmed), [trimmed]);

  return {
    setPhoneNumber,
    phoneNumber: {
      valid,
      formatted,
      masked
    }
  };
};

export default usePhoneNumber;
