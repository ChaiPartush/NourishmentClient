import React,{useRef} from 'react'
import StepIndicator from 'react-native-step-indicator';
import { Icon } from 'react-native-elements'
import { View, Text } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, FontAwesomeIcon } from '@expo/vector-icons';
import { Colors } from '../../../colors';
import { height } from '../../../constants/ScreenDimentionConst';


export const StepIndicatorComponent = ({ currentPage, changePage }) => {
   
    const firstIndicatorStyles = {
        stepIndicatorSize: 30,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 5,
        stepStrokeCurrentColor: '#5a8693',
        currentStepStrokeWidth: 4,
        separatorFinishedColor: '#5a8693',
        separatorUnFinishedColor: '#d6ced8',
        stepIndicatorFinishedColor: '#5a8693',
        stepIndicatorUnFinishedColor: '#EEEEEE',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 20,
        currentStepIndicatorLabelFontSize: height * 0.02,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 20,
        labelFontFamily: "Fredoka-Regular",
        currentStepLabelColor: '#4aae4f',

    };
    const renderStepIndicator = (params) => (
        <MaterialCommunityIcons  {...getStepIndicatorIconConfig(params)} />
    );
    const getStepIndicatorIconConfig = ({
        position,
        stepStatus,
    }) => {
        const iconConfig = {
            name: 'feed',
            // // type: 'font-awesome',
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

                    iconConfig.name = 'numeric-1',
                        iconConfig.type = 'FontAwesomeIcon',
                        iconConfig.size = 30,
                        iconConfig.color = '#39A388'
                }
                break;
            }
            // case 1: {
            //     if (stepStatus === 'finished') {
            //         iconConfig.name = 'check',
            //             iconConfig.type = 'font-awesome',
            //             iconConfig.color = '#ffffff'
            //     } else {
            //         iconConfig.name = 'user-alt',
            //             iconConfig.type = 'font-awesome-5',
            //             iconConfig.size = 20,
            //             iconConfig.color = '#E1578A'
            //     }
            //     break;
            // }
            // case 2: {
            //     if (stepStatus === 'finished') {
            //         iconConfig.name = 'check',
            //             iconConfig.type = 'font-awesome',
            //             iconConfig.color = '#ffffff'
            //     } else {
            //         iconConfig.name = 'briefcase-medical',
            //             iconConfig.type = 'font-awesome-5',
            //             iconConfig.size = 20,
            //             iconConfig.color = '#9D84B7'
            //     }
            //     break;
            // }
            // case 3: {
            //     if (stepStatus === 'finished') {
            //         iconConfig.name = 'check',
            //             iconConfig.type = 'font-awesome',
            //             iconConfig.color = '#ffffff'
            //     } else {
            //         iconConfig.name = '',

            //             iconConfig.type = 'font-awesome-5',
            //             iconConfig.size = 20,
            //             iconConfig.color = '#FF7777'

            //     }
            //     break;
            // }
            default: {
                break;
            }
        }
        return iconConfig;
    };

    const NumberText = ({ num }) => {
        return (
            <Text style={{
                fontFamily: "Fredoka-Regular",
                fontWeight: 'bold',
                fontSize: height * 0.025,
                textAlign: 'center',
                color: '#224854',
            }}>{num}</Text>
        )
    }

    const NumberTextUnselected = ({ num }) => {
        return (
            <Text style={{
                fontFamily: "Fredoka-Regular",
                fontWeight: 'bold',
                fontSize: height * 0.019,
                textAlign: 'center',
                color: '#B2B1B9',
            }}>{num}</Text>
        )
    }

    const CheckIcon = () => {
        return (
            <MaterialCommunityIcons name="check-bold" size={24} color={Colors.lightBlue} />
        )
    }
    
    return (
        <StepIndicator
            
            customStyles={firstIndicatorStyles}
            stepCount={4}
            onPress={(value) => { changePage(value) }}
            
            direction="horizontal"
            currentPosition={currentPage}
            renderStepIndicator={(value) => {
                const numbers = [0, 1, 2, 3]
                switch (value.position) {
                    case 0: {
                        if (value.stepStatus === "current") {
                            return (
                                <NumberText num={1} />
                            )

                        } else if (value.stepStatus == 'finished') {
                            return (
                                <CheckIcon />
                            )
                        } else if (value.stepStatus == 'unfinished') {
                            return (
                                <NumberTextUnselected num={1} />
                            )
                        }
                        break
                    }

                    case 1: {
                        if (value.stepStatus === "current") {
                            return (
                                <NumberText num={2} />
                            )

                        } else if (value.stepStatus == 'finished') {
                            return (
                                <CheckIcon />
                            )
                        } else if (value.stepStatus == 'unfinished') {
                            return (
                                <NumberTextUnselected num={2} />
                            )
                        }
                        break
                    }

                    case 2: {
                        if (value.stepStatus === "current") {
                            return (
                                <NumberText num={3} />
                            )

                        } else if (value.stepStatus == 'finished') {
                            return (
                                <CheckIcon />
                            )
                        } else if (value.stepStatus == 'unfinished') {
                            return (
                                <NumberTextUnselected num={3} />
                            )
                        }
                        break
                    }

                    case 3: {
                        if (value.stepStatus === "current") {
                            return (
                                <NumberText num={4} />
                            )

                        } else if (value.stepStatus == 'finished') {
                            return (
                                <CheckIcon />
                            )
                        } else if (value.stepStatus == 'unfinished') {
                            return (
                                <NumberTextUnselected num={4} />
                            )
                        }
                        break
                    }
                }


            }}
        />

    )

}