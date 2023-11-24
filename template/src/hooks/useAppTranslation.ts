import { DEFAULT_NAMESPACE } from '@/core/constants';
import { FlatNamespace, KeyPrefix } from 'i18next';
import { FallbackNs, useTranslation } from 'react-i18next';
import { $Tuple } from 'react-i18next/helpers';

const useAppTranslation = <
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  keyPrefix?: KPrefix,
) =>
  useTranslation<Ns, KPrefix>(DEFAULT_NAMESPACE as Ns, {
    keyPrefix,
  });

export default useAppTranslation;
