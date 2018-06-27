import * as React from 'react';
import { IState } from '../../redux/appState';
import { IToast, currentSelector } from './redux/ToastState';
import {Maybe} from 'tsmonad';
import { ToastView } from './ToastView';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { dismissToast } from './redux/ToastActions';

export interface IStateProps {
    maybeToast: Maybe<IToast>;
}

export interface IActionProps {
    onClick: () => void;
}

const mapStateToProps = (state: IState): IStateProps => ({
    maybeToast: currentSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    onClick: () => dispatch(dismissToast()),
})

export const Toast = connect(mapStateToProps, mapDispatchToProps)(ToastView) as React.ComponentClass<{}>;
