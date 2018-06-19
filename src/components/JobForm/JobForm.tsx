import * as React from 'react';
import {connect} from 'react-redux';
import {IState} from '../../redux/appState';
import { Dispatch } from 'redux';
import { TField } from './redux/jobFormState';
import { updateField } from './redux/JobFormActions';

export interface IStateProps {
    pickupInput: TField<string>;
    dropoffInput: TField<string>;
}

interface IActionProps {
    onPickupChange: (value: string) => void;
    onDropoffChange: (value: string) => void;
}

export const JobFormLogic: React.StatelessComponent<IStateProps & IActionProps> = () => <p>Hi!</p>;

const mapStateToProps = (state: IState): IStateProps => ({
    pickupInput: state.jobForm.pickup,
    dropoffInput: state.jobForm.dropoff,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    onPickupChange: (value) => dispatch(updateField('pickup', value)),
    onDropoffChange: (value) => dispatch(updateField('dropoff', value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobFormLogic);
