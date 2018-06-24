import * as React from 'react';
import { Dispatch } from 'redux';
import { isFieldValid, TField } from '../redux/field';
import { CreateJobButtonView } from './CreateJobButtonView';
import { IState } from '../../../redux/appState';
import { startCreatingJob } from '../redux/JobFormActions';
import { connect } from 'react-redux';

export interface IStateProps {
    pickupInput: TField<string>;
    dropoffInput: TField<string>;
    isCreating: boolean;
}

interface IActionProps {
    onCreateJobClick: () => void;
}

export const CreateJobButtonLogic: React.StatelessComponent<IStateProps & IActionProps> = (props) => {
    const {pickupInput, dropoffInput, isCreating, onCreateJobClick} = props;
    const isButtonDisabled = !(isFieldValid(pickupInput) && isFieldValid(dropoffInput));
    const buttonText = isCreating ? 'Creating...' : 'Create Job';
    return (
        <CreateJobButtonView
            disabled={isButtonDisabled}
            text={buttonText}
            onClick={onCreateJobClick}
        />
    );
};

const mapStateToProps = (state: IState): IStateProps => ({
    pickupInput: state.jobForm.pickup,
    dropoffInput: state.jobForm.dropoff,
    isCreating: state.jobForm.creating,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onCreateJobClick: () => dispatch(startCreatingJob()),
});

export const CreateJobButton = connect(mapStateToProps, mapDispatchToProps)(CreateJobButtonLogic);
