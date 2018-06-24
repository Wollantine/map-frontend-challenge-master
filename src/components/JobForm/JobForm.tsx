import * as React from 'react';
import {connect} from 'react-redux';
import {IState} from '../../redux/appState';
import { Dispatch } from 'redux';
import { TField, isFieldValid, isFieldInvalid, EFieldStatus } from './redux/field';
import { updateField } from './redux/JobFormActions';
import { JobFormView } from './JobFormView';

export interface IStateProps {
    pickupInput: TField<string>;
    dropoffInput: TField<string>;
}

interface IActionProps {
    onPickupChange: (value: string) => void;
    onDropoffChange: (value: string) => void;
}

export const JobFormLogic: React.StatelessComponent<IStateProps & IActionProps> = (props) => {
    const {pickupInput, dropoffInput, onPickupChange, onDropoffChange} = props;
    return (
        <JobFormView
            pickupInput={{...pickupInput, onChange: onPickupChange}}
            dropoffInput={{...dropoffInput, onChange: onDropoffChange}}
        />
    );
};

const mapStateToProps = (state: IState): IStateProps => ({
    pickupInput: state.jobForm.pickup,
    dropoffInput: state.jobForm.dropoff,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    onPickupChange: (value) => dispatch(updateField('pickup', value, EFieldStatus.pristine)),
    onDropoffChange: (value) => dispatch(updateField('dropoff', value, EFieldStatus.pristine)),
});

export const JobForm = connect(mapStateToProps, mapDispatchToProps)(JobFormLogic);
