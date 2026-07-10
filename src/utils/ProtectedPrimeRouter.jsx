import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

const ProtectedPrimeRouter = ({ children, isAuthenticated, isPrime }) => {


    console.log("isprine", isPrime);
    console.log("isAuthenticated", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    if(!isPrime) {
        return <Navigate to={"/subscription"} />;
    }
    if (isPrime && isAuthenticated) {
        return children;
    }

};

ProtectedPrimeRouter.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isPrime: PropTypes.bool.isRequired,
};

export default ProtectedPrimeRouter;