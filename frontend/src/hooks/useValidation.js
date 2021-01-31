import React from "react";

const useValidation = (fields) => {
    const fieldsEnumeration = (value) => {
        return (
            fields.reduce((acc, field) => {
                acc[field] = value;
                return acc
            }, {})
        )
    };

    const [isValid, setIsValid] = React.useState(fieldsEnumeration(false));
    const [inputValue, setInputValue] = React.useState(fieldsEnumeration(''));
    const [validationMessage, setValidationMessage] = React.useState(fieldsEnumeration(''));

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });

        setIsValid({
            ...isValid,
            [name]: event.target.validity.valid
        });

        setValidationMessage({
            ...validationMessage,
            [name]: event.target.validationMessage
        });
    };

    return {
        isValid, setIsValid,
        inputValue, setInputValue,
        validationMessage, setValidationMessage,
        handleInputChange, fieldsEnumeration
    }
}

export default useValidation;