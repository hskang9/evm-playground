// Copyright 2017-2020 @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BareProps } from './types';

import React from 'react';
import ReactMd from 'react-markdown';
import styled from 'styled-components';
import { useToggle } from '@canvas-ui/react-hooks';

import Icon from './Icon';

interface Props extends BareProps {
  md: string;
}

function HelpOverlay ({ className = '', md }: Props): React.ReactElement<Props> {
  const [isVisible, toggleVisible] = useToggle();

  return (
    <div className={className}>
      <div className='help-button'>
        <Icon
          name='help circle'
          onClick={toggleVisible}
        />
      </div>
      <div className={`help-slideout ${isVisible ? 'open' : 'closed'}`}>
        <div className='help-button'>
          <Icon
            name='close'
            onClick={toggleVisible}
          />
        </div>
        <ReactMd
          className='help-content'
          escapeHtml={false}
          source={md}
        />
      </div>
    </div>
  );
}

export default React.memo(styled(HelpOverlay)`
  .help-button {
    cursor: pointer;
    font-size: 2rem;
    padding: 1.25rem 1.5rem 0 0;
  }

  > .help-button {
    position: absolute;
    right: 0rem;
    top: 0rem;
  }

  .help-slideout {
    background: #eee;
    border-left: 0.25rem solid #ddd;
    bottom: 0;
    max-width: 50rem;
    overflow-y: scroll;
    position: fixed;
    right: -50rem;
    top: 0;
    transition-duration: .5s;
    transition-property: all;
    z-index: 10;

    .help-button {
      text-align: right;
    }

    .help-content {
      padding: 1rem 1.5rem 5rem;
    }

    &.open {
      right: 0;
    }
  }
`);
