import React from 'react';
import ErrorMessage from '../components/UI/errorMessage/errorMessage';

const withErrorHandling = WrappedComponent => ({errors, children, ...rest}) => (
    <WrappedComponent>
        {errors.length > 0 ? <ErrorMessage {...rest} error={errors[0]}/> : children}
    </WrappedComponent>
);

const ErrorHoc = withErrorHandling(({children}) => <React.Fragment>{children}</React.Fragment>);

export default ErrorHoc;