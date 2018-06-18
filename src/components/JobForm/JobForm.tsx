import * as React from 'react';
import {connect} from 'react-redux';
import {IState} from '../../redux/appState';
import { Dispatch } from 'redux';

const JobForm = () => <p>Hi!</p>;

const mapStateToProps = (state: IState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(JobForm);
