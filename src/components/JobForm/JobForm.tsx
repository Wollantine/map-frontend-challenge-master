import * as React from 'react';
import {connect} from 'react-redux';
import {IState} from '../../redux/appState';
import { Dispatch } from 'redux';
import { TField, EFieldStatus } from './redux/field';
import { updateField, blurField } from './redux/jobFormActions';
import { JobFormView } from './JobFormView';

export interface IStateProps {
    pickupInput: TField<string>;
    dropoffInput: TField<string>;
}

interface IActionProps {
    onPickupChange: (value: string) => void;
    onDropoffChange: (value: string) => void;
    onPickupBlur: () => void;
    onDropoffBlur: () => void;
}

export const JobFormLogic: React.StatelessComponent<IStateProps & IActionProps> = (props) => {
    const {pickupInput, dropoffInput} = props;
    return (
        <JobFormView
            pickupInput={{
                ...pickupInput,
                onChange: props.onPickupChange,
                onBlur: props.onPickupBlur,
            }}
            dropoffInput={{
                ...dropoffInput,
                onChange: props.onDropoffChange,
                onBlur: props.onDropoffBlur,
            }}
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
    onPickupBlur: () => dispatch(blurField('pickup')),
    onDropoffBlur: () => dispatch(blurField('dropoff')),
});

export const JobForm = connect(mapStateToProps, mapDispatchToProps)(JobFormLogic);
