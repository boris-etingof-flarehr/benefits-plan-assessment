import { useContext, useMemo, useState } from 'preact/hooks';

import { AppContext } from '../../context/app-context';

const mask = '#### ### ### ### ### ### ###';
const trim = (str: string): string => str.replace(/ /g, '');
const maskString = (str: string): string => {
  let i = 0;
  return mask.replace(/#/g, () => str[i++] ?? '').trim();
};

const usePhoneNumber = (
  initialPhoneNumber?: string
): {
  phoneNumber: {
    valid: boolean;
    original: string;
    formatted: string;
    masked: string;
    isVerified: boolean;
  };
  setPhoneNumber: (_phoneNumber: string) => void;
} => {
  const { identity } = useContext(AppContext);

  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber ?? '');

  const trimmed = useMemo(() => trim(phoneNumber), [phoneNumber]);

  const valid = useMemo(
    (): boolean =>
      (trimmed.startsWith('04') && trimmed.length === 10) ||
      (trimmed.startsWith('614') && trimmed.length === 11) ||
      (trimmed.startsWith('+614') && trimmed.length === 12) ||
      /^\+642\d{7,9}$/.test(trimmed),
    [trimmed]
  );

  const formatted = useMemo(() => {
    if (trimmed.startsWith('04')) {
      return `+61${trimmed.replace(/^0+/, '')}`;
    }
    if (trimmed.startsWith('614')) {
      return `+${trimmed}`;
    }
    return trimmed;
  }, [trimmed]);

  const masked = useMemo(() => maskString(trimmed), [trimmed]);

  const isVerified = useMemo(
    () => formatted === identity.verifiedPhoneNumber,
    [formatted, identity.verifiedPhoneNumber]
  );

  return {
    setPhoneNumber,
    phoneNumber: {
      valid,
      original: phoneNumber,
      formatted,
      masked,
      isVerified
    }
  };
};

export default usePhoneNumber;
