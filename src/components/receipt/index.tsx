/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from 'react';

export function PaymentConfirmation() {
  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event: { data: { action: string } }) => {
    if (event.data.action === 'receipt-loaded') {
      setIsLoading(false);
    }
  };

  const IframeRef = useRef<HTMLIFrameElement | null>(null);

  const printIframe = () => {
    if (IframeRef.current?.contentWindow) {
      IframeRef.current?.contentWindow;
      IframeRef.current?.focus();
      IframeRef.current?.contentWindow.print();

      return false;
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <iframe
        ref={IframeRef}
        id="receipt"
        className="receipt"
        src="/extract.html"
        style={{ height: 500, display: 'none' }}
        title="Receipt"
      />
      <button onClick={() => printIframe()}>
        {isLoading ? 'Loading...' : 'Print Receipt'}
      </button>
    </>
  );
}
