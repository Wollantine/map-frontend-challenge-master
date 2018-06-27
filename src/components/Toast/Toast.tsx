import * as React from 'react';
import { IState } from '../../redux/appState';
import { IToast, queueSelector } from './redux/ToastState';
import {Maybe} from 'tsmonad';
import * as R from 'ramda';
import { ToastView } from './ToastView';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { skipToast } from './redux/ToastActions';

export interface IStateProps {
    toastQueue: IToast[];
}

export interface IActionProps {
    clickToast: () => void;
}

export const ToastLogic: React.StatelessComponent<IStateProps & IActionProps> = (props) => {
    const {toastQueue, clickToast} = props;
    const maybeToast = Maybe.maybe(R.head(toastQueue));
    return (
        <ToastView maybeToast={maybeToast} onClick={clickToast}/>
    );
}

const mapStateToProps = (state: IState): IStateProps => ({
    toastQueue: queueSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    clickToast: () => dispatch(skipToast()),
})

export const Toast = connect(mapStateToProps, mapDispatchToProps)(ToastLogic);
