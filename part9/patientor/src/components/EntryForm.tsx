import React, { ReactElement } from 'react';
import { Field, Formik, Form } from "formik";
import { TextField, NumberField } from '../AddPatientModal/FormField';
import { Button } from "semantic-ui-react";
import { HealthCheckEntry } from '../types';

export type HealthCheckForm = Omit<HealthCheckEntry, "id" >;

interface Props {
    onSubmit: (values: HealthCheckForm) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }): ReactElement => {
    const type = 'HealthCheck';
    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };

    return (
        <Formik
            initialValues={{
                type: type,
                specialist: "",
                date: "",
                healthCheckRating: 0,
                description: ""
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const formatError = "Check Format";
                const errors: { [field: string]: string } = {};
                if (!values.specialist) {
                errors.specialist = requiredError;
                }
                if (!values.date) {
                errors.date = requiredError;
                }
                if (!isDate(values.date)) {
                    errors.date = formatError;
                }
                if (!values.description) {
                errors.description = requiredError;
                }
                if (isNaN(values.healthCheckRating)) {
                errors.healthCheckRating = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid} >Add</Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;