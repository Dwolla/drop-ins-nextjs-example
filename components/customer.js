import React, { useState, useEffect } from 'react';

export default function Customer() {
  const [buttonClicked, setButtonClicked] = useState();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//cdn.dwolla.com/v2.1.8/dwolla-web.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleClick() {
    setButtonClicked(true);

    window.dwolla.configure({
      environment: 'sandbox',
      styles: '/styles/business-vcr.css',
      tokenUrl: '/api/tokenUrl',
      success: (res) => Promise.resolve(res),
      error: (err) => Promise.resolve(err),
    });
  }

  return (
    <div className='main'>
      <h2>Business Verified Customer Drop-in</h2>

      {buttonClicked ? (
        <div>
          <div className='dropInContainer'>
            <dwolla-business-vcr
              terms='www.yourterms.com'
              privacy='www.yourprivacy.com'
            ></dwolla-business-vcr>
          </div>
        </div>
      ) : (
        <button onClick={handleClick}>Create a Customer</button>
      )}

      <style jsx>{`
        .main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .dropInContainer {
          width: 600px;
          padding: 20px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
