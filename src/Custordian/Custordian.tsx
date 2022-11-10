import * as React from 'react';

interface ICustordian {
  custodian: string;
  setCustodian: (custodian: string) => void;
}

export const Custordian = React.memo(
  ({ custodian, setCustodian }: ICustordian) => {
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
