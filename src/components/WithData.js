import React from 'react';
import { connect } from 'react-redux';

const withData = WrappedComponent => (props, otherProps) => {
  return props.authState.loading ? (
    <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
      {/* <div className="w-50 mx-auto">
            <LinearProgress />
          </div> */}
      loading....
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

const mapStateToProps = state => ({
  ...state
});
// const mapDispatchToProps = dispatch => ({
//   // registerAction: values => dispatch(registerAction(values)),
//   // clearErrors: () => dispatch(clearErrors())
// });
export default connect(mapStateToProps, null)(withData);
