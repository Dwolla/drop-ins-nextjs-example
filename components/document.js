import React, { useState, useEffect } from 'react';

export default function Document() {
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
      styles: '/styles/custom-styles.css',
      token: (req) => Promise.resolve(dwollaAPIToken(req, { blah: 'abcd' })),
      success: (res) => Promise.resolve(res),
      error: (err) => Promise.resolve(err),
    });
  }

  function dwollaAPIToken(req, additional) {
    const tokenUrl = '/api/tokenUrl';
    const data = {
      action: req.action,
    };
    if (req.links) {
      data._links = req.links;
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Dwolla-Drop-Ins-Library',
    };
    return fetch(`${tokenUrl}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  return (
    <div className='main'>
      <h2>Document Upload Drop-in</h2>

      {buttonClicked ? (
        <div>
          <div className='dropInContainer'>
            <dwolla-document-upload customerId='{{ customer.id }}'></dwolla-document-upload>
          </div>
        </div>
      ) : (
        <button onClick={handleClick}>Upload a Document</button>
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
