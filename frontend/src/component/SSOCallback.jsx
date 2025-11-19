import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SSOCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('sign_in_force_redirect_url');
    
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
}

export default SSOCallback;
