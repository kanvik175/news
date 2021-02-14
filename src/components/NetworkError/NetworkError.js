import React from 'react';

import './NetworkError.css';

function NetworkError() {
  return (
    <div className="network-error">
      <div className="side-padding">
        <div className="network-error__inner">
          <h3 className="network-error__message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </h3>
        </div>
      </div>
    </div>
  );
}

export default NetworkError;
