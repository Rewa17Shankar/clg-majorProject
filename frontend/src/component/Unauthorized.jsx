import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Access Denied</h1>
      <p>You don't have permission to access this page.</p>
      <Link to="/role-select">Go to Role - Select</Link>
    </div>
  );
};

export default Unauthorized;
