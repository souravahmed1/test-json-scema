import { RJSFSchema, RegistryFieldsType, RegistryWidgetsType, UiSchema, } from '@rjsf/utils';
import Form from '@rjsf/bootstrap-4';
import validator from '@rjsf/validator-ajv8';
import { FileUploadField } from '../../components/extended-form/upload';

export function ProductCreatePage() {
    const schema: RJSFSchema = {
        title: 'Product Create',
        type: 'object',
        properties: {
            product_name: {
                title: 'Product Name',
                type: 'string',
            },
            description: {
                title: 'Product Description',
                type: 'string',
            },
            mrp_price: {
                title: 'Product Mrp Price',
                type: 'number',
            },
            selling_price: {
                title: 'Product Selling Price',
                type: 'number',
            },
            is_active: {
                title: 'Is Active',
                type: 'boolean',
            },
            product_meta: {
                type: 'object',
                title: 'Product Meta Information',
                properties: {
                    amazonUrl: {
                        type: 'string',
                        title: 'Amazon URL',
                    },
                    wiki_text: {
                        type: 'string',
                        title: 'Wiki Text',
                    },
                    html_view: {
                        type: 'string',
                        title: 'HTML View',
                    },
                },
            },
            feature_sets: {
                type: 'array',
                title: 'Product Features',
                description: 'Label and Value Example Label(Material) Value(Cotton)',
                items: {
                    properties: {
                        feature_name: {
                            type: 'string',
                            title: 'Product Feature Name'
                        },
                        feature_value: {
                            type: 'string',
                            title: 'Product feature Value'
                        }
                    }
                }
            },
            medias: {
                type: 'array',
                title: 'Product Media',
                items: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', title: 'URL', format: 'uri' },
                        mime: { type: 'string', title: 'MIME Type' },
                        size: { type: 'number', title: 'Size' },
                        original_file_name: { type: 'string', title: 'Original File Name' },
                    },
                },
            },
        },
        required: [
            "product_name",
            "mrp_price",
            "selling_price",
            "is_active"
        ]
    };

    const uiSchema: UiSchema = {
        product_meta: {
            html_view: {
                "ui:widget": "textarea"
            },
        },
        is_active: {
            "ui:widget": "radio"
        },
        description: {
            "ui:widget": "textarea",
        },
        feature_sets: {
            "ui:options": {
                "copyable": true
            }
        },
        medias: {
            'ui:field': 'FileUploadField', // Use the custom component
            'ui:options': {
                allowedTypes: ['image/jpeg', 'image/png'], // Specify the allowed file types
              },
        },
    }

    const fields = {
        FileUploadField
    }

    const onSubmit = (data: object) => {
        console.log("Data: ", data);
    }
    return <div className='container'>
        <Form schema={schema} validator={validator} onSubmit={onSubmit} uiSchema={uiSchema} fields={fields as any}/>
    </div>
}