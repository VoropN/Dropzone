import * as React from 'react';

interface ICustodian {
  custodian: string;
  setCustodian: (custodian: string) => void;
}

export const Custodian = React.memo(
  ({ custodian, setCustodian }: ICustodian) => {
    const updateCustodian = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustodian(event.target.value);
    };

    return (
      <>
        <h4>Custodian: </h4>
        <input type="text" value={custodian} onChange={updateCustodian} />
      </>
    );
  }
);
