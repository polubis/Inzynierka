import React from 'react';
import Spinner from '../components/UI/spinner/spinner';
import ErrorHoc from './errorHoc';

const handleLoadingWithErrors = WrappedComponent => ({isLoading, errors, children, ...rest}) => (
    <WrappedComponent>
        {isLoading ? <Spinner /> : 
            <ErrorHoc {...rest} error={errors[0]}>
                {children}
            </ErrorHoc>
        }
    </WrappedComponent>
);

const LoadingHoc = handleLoadingWithErrors(({children}) => <React.Fragment>{children}</React.Fragment>);

export default LoadingHoc;