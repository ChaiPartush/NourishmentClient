import React from 'react'
import StepIndicator from 'react-native-step-indicator';
import { Icon } from 'react-native-elements'

export const StepIndicatorComponent = ({ currentPage }) => {
    const firstIndicatorStyles = {
        stepIndicatorSize: 30,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 5,
        currentStepStrokeWidth: 5,
        separatorFinishedColor: '#4aae4f',
        separatorUnFinishedColor: '#9CC094',
        stepIndicatorFinishedColor: '#4aae4f',
        stepIndicatorUnFinishedColor: '#EEEEEE',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 30,
        currentStepIndicatorLabelFontSize: 20,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 20,
        currentStepLabelColor: '#4aae4f',

    };
    const renderStepIndicator = (params) => (
        <Icon {...getStepIndicatorIconConfig(params)} />
    );
    const getStepIndicatorIconConfig = ({
        position,
        stepStatus,
    }) => {
        const iconConfig = {
            name: 'feed',
            type: 'font-awesome',
            color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
            size: 15,
        };
        switch (position) {
            case 0: {
                if (stepStatus === 'finished') {
                    iconConfig.name = 'check',
                        iconConfig.type = 'font-awesome',
                        iconConfig.color = '#ffffff'
                } else {
                    iconConfig.name = 'target',
                        iconConfig.type = 'foundation',
                        iconConfig.size = 30,
                        iconConfig.color = '#39A388'
                }
                break;
            }
            case 1: {
                if (stepStatus === 'finished') {
                    iconConfig.name = 'check',
                        iconConfig.type = 'font-awesome',
                        iconConfig.color = '#ffffff'
                } else {
                    iconConfig.name = 'user-alt',
                        iconConfig.type = 'font-awesome-5',
                        iconConfig.size = 20,
                        iconConfig.color = '#E1578A'
                }
                break;
            }
            case 2: {
                if (stepStatus === 'finished') {
                    iconConfig.name = 'check',
                        iconConfig.type = 'font-awesome',
                        iconConfig.color = '#ffffff'
                } else {
                    iconConfig.name = 'briefcase-medical',
                        iconConfig.type = 'font-awesome-5',
                        iconConfig.size = 20,
                        iconConfig.color = '#9D84B7'
                }
                break;
            }
            case 3: {
                if (stepStatus === 'finished') {
                    iconConfig.name = 'check',
                        iconConfig.type = 'font-awesome',
                        iconConfig.color = '#ffffff'
                } else {
                    iconConfig.name = 'hamburger',
                        iconConfig.type = 'font-awesome-5',
                        iconConfig.size = 20,
                        iconConfig.color = '#FF7777'

                }
                break;
            }
            default: {
                break;
            }
        }
        return iconConfig;
    };
    return (
        <StepIndicator
            customStyles={firstIndicatorStyles}
            stepCount={4}
            currentPosition={currentPage}
            renderStepIndicator={renderStepIndicator}
        />

    )

}