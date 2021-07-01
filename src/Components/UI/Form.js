import React from 'react';

const Form = ({ formData, id, change }) => {

    const showTemplate = () => {
        let template = null;

        switch (formData.element) {
            case ('input'):
                template = (
                    <div>
                        {formData.showLabel ?
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            : null
                        }
                        <input {...formData.config} value={formData.value} required={formData.validation.required} onChange={(event) => change({ event, id })} />
                    </div>
                )
                break;
            case ('select'):
                template = (
                    <div>
                        {formData.showLabel ?
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            : null
                        }
                        <select value={formData.value} onChange={(event) => change({ event, id })}>
                            <option value="">Select one</option>
                            {
                                formData.config.options.map((item) => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))
                            }
                        </select>
                    </div>
                )
                break;

            default:
                template = null;
        }
        return template;
    }

    return (
        <div>
            {showTemplate()}
        </div>
    );
};

export default Form;