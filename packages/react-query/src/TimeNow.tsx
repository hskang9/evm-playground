// Copyright 2017-2020 @canvas-ui/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Moment } from '@polkadot/types/interfaces';
import { BareProps } from '@canvas-ui/react-api/types';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { useApi, useCall } from '@canvas-ui/react-hooks';

import Elapsed from './Elapsed';

interface Props extends BareProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
}

function TimeNow ({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { api, isSubstrateV2 } = useApi();
  const timestamp = useCall<Moment>(api.query.timestamp.now, []);
  const [now, setNow] = useState<BN | undefined>();

  useEffect((): void => {
    setNow(
      isSubstrateV2 || !timestamp
        ? timestamp
        : timestamp.muln(1000)
    );
  }, [timestamp, isSubstrateV2]);

  return (
    <div className={className}>
      {label || ''}
      <Elapsed value={now} />
      {children}
    </div>
  );
}

export default React.memo(TimeNow);
