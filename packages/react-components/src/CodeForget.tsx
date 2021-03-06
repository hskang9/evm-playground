// Copyright 2017-2020 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Code } from "@canvas-ui/apps/types";
import { VoidFn } from "@canvas-ui/react-util/types";
import { BareProps } from "./types";

import React, { useCallback } from "react";
import styled from "styled-components";
import { useNotification, useToggle } from "@canvas-ui/react-hooks";
import { truncate } from "@canvas-ui/react-util";

import Button from "./Button";
import CodeInfo from "./CodeInfo";
import Modal from "./Modal";
import { useTranslation } from "./translate";

interface Props extends BareProps {
  code: Code;
  onForget: VoidFn;
}

function CodeForget({ className, code, onForget }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const showNotification = useNotification();
  const [isOpen, toggleIsOpen] = useToggle();

  const _onForget = useCallback((): void => {
    onForget();
    toggleIsOpen();

    showNotification({
      action: truncate(code.codeHash),
      message: t<string>("code bundle removed"),
      status: "success"
    });
  }, [code.codeHash, onForget, showNotification, t, toggleIsOpen]);

  return (
    <>
      <Button isNegative label={t<string>("Forget")} onClick={toggleIsOpen} />
      <Modal className={className} isOpen={isOpen} onClose={toggleIsOpen}>
        <Modal.Header>{t<string>("Forget code bundle?")}</Modal.Header>
        <Modal.Content>
          <p>{t<string>("You will delete the abi bundle that is stored locally.")}</p>
          <CodeInfo className="forget-code" code={code} />
        </Modal.Content>
        <Modal.Actions onCancel={toggleIsOpen}>
          <Button isPrimary label={t<string>("Forget")} onClick={_onForget} />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default styled(React.memo(CodeForget))`
  .forget-code {
    border-top: 1px solid var(--grey30);
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
`;
