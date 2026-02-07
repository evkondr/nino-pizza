import React from 'react';

interface Props {
  code: string;
}

const VerificationUserTemplate = ({ code }:Props) => {
  return (
    <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>
  );
};

export default VerificationUserTemplate;