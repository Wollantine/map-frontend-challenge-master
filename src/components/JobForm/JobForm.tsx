import * as React from 'react';
import {connect} from 'react-redux';
import {IState} from '../../redux/appState';
import { Dispatch } from 'redux';
import { TField, isFieldValid, isFieldInvalid } from './redux/field';
import { updateField } from './redux/JobFormActions';
import { JobFormView } from './JobFormView';

export interface IStateProps {
    pickupInput: TField<string>;
    dropoffInput: TField<string>;
    isCreating: boolean;
}

interface IActionProps {
    onPickupChange: (value: string) => void;
    onDropoffChange: (value: string) => void;
}

export const JobFormLogic: React.StatelessComponent<IStateProps & IActionProps> = (props) => {
    const {pickupInput, dropoffInput, onPickupChange, onDropoffChange, isCreating} = props;
    const isButtonDisabled = !(isFieldValid(pickupInput) && isFieldValid(dropoffInput));
    return (
        <JobFormView
            isButtonCreating={isCreating}
            isButtonDisabled={isButtonDisabled}
            pickupInput={{...pickupInput, onChange: onPickupChange}}
            dropoffInput={{...dropoffInput, onChange: onDropoffChange}}
        />
    );
};

const mapStateToProps = (state: IState): IStateProps => ({
    pickupInput: state.jobForm.pickup,
    dropoffInput: state.jobForm.dropoff,
    isCreating: state.jobForm.creating,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
    onPickupChange: (value) => dispatch(updateField('pickup', value)),
    onDropoffChange: (value) => dispatch(updateField('dropoff', value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobFormLogic);
