// Copyright 2017-2020 @canvas-ui/app-execute authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BareProps } from "@canvas-ui/react-components/types";
import { FileState } from "@canvas-ui/react-hooks/types";
import { Abi } from "@polkadot/api-contract";
import React from "react";
import styled from "styled-components";
import InputFile from "./InputFile";
import Messages from "./Messages";
import { useTranslation } from "./translate";

interface Props extends BareProps {
  abi?: Abi | null;
  errorText?: string | null;
  file: FileState | null;
  isContract?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  isSupplied?: boolean;
  label?: React.ReactNode;
  onRemove?: () => void;
  onRemoved?: () => void;
  onSelect?: () => void;
  onSelectConstructor?: (constructorIndex?: number) => void;
  setFile: React.Dispatch<FileState | null>;
  withLabel?: boolean;
}

function renderMessages({ abi, isDisabled, onRemove, onSelectConstructor, withLabel }: Props): React.ReactNode {
  return (
    <Messages
      abi={abi}
      isLabelled={withLabel}
      isRemovable={!isDisabled}
      onRemove={onRemove}
      onSelectConstructor={onSelectConstructor}
      withConstructors
    />
  );
}

function InputABI(props: Props): React.ReactElement<Props> {
  const {
    abi,
    className,
    errorText,
    file,
    isContract = false,
    isDisabled,
    isError,
    isRequired = false,
    isValid,
    setFile,
    withLabel
  } = props;
  const { t } = useTranslation();

  return (
    <InputFile
      className={className}
      errorText={t<string>("Invalid ABI file — {{errorText}}", { replace: { errorText } })}
      help={"Waffle Contract abi bundle"}
      isDisabled={isDisabled}
      isError={isError}
      label="Upload Contract abi bundle"
      onChange={setFile}
      value={file}
      withLabel={withLabel}
    >
      {abi && isValid ? renderMessages(props) : null}
    </InputFile>
  );
}

export default React.memo(
  styled(InputABI)`
    min-height: 4rem;
  `
);
