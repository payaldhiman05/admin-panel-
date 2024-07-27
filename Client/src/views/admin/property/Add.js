import { CloseIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useState } from 'react';
import { postApi } from 'services/api';
import { generateValidationSchema } from 'utils';
import CustomForm from 'utils/customForm';
import * as yup from 'yup';

const Add = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const initialFieldValues = {
        propertyName: '',
        propertyType: '',
        location: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        },
        description: '',
        price: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        images: [],
        amenities: {
            parking: false,
            swimmingPool: false
        },
        status: ''
    };

    const formik = useFormik({
        initialValues: initialFieldValues,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            propertyName: yup.string().required('Property Name is required'),
            propertyType: yup.string().required('Property Type is required'),
            location: yup.object().shape({
                address: yup.string().required('Address is required'),
                city: yup.string().required('City is required'),
                state: yup.string().required('State is required'),
                zipCode: yup.string().required('ZIP Code is required'),
                country: yup.string().required('Country is required')
            }),
            description: yup.string().required('Description is required'),
            price: yup.number().required('Price is required'),
            size: yup.number().required('Size is required'),
            bedrooms: yup.number().required('Number of Bedrooms is required'),
            bathrooms: yup.number().required('Number of Bathrooms is required'),
            status: yup.string().required('Status is required')
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const response = await postApi('api/form/add', { ...values, moduleId: props?.propertyData?._id });
                if (response.status === 200) {
                    props.onClose();
                    resetForm();
                    props.setAction((prev) => !prev);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    });

    const { errors, touched, values, handleChange, handleSubmit, handleBlur } = formik;

    return (
        <Drawer isOpen={props.isOpen} size={props.size}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader alignItems="center" justifyContent="space-between" display="flex">
                    Add Property
                    <IconButton onClick={props.onClose} icon={<CloseIcon />} />
                </DrawerHeader>
                <form onSubmit={handleSubmit}>
                    <DrawerBody>
                        {/* Input fields for property details */}
                        <label for="propertyName">Property Name</label><br/>
                        <input
                            type="text"
                            name="propertyName"
                            placeholder="Property Name"
                            value={values.propertyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="propertytype">Property Type</label><br/>
                        <input
                            type="text"
                            name="propertyType"
                            placeholder="Property Type"
                            value={values.propertyType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                         <label for="Address">Address</label><br/>
                        <input
                            type="text"
                            name="location.address"
                            placeholder="Address"
                            value={values.location.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="City">City</label><br/>
                        <input
                            type="text"
                            name="location.city"
                            placeholder="City"
                            value={values.location.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="text"
                            name="location.state"
                            placeholder="State"
                            value={values.location.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="text"
                            name="location.zipCode"
                            placeholder="ZIP Code"
                            value={values.location.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="text"
                            name="location.country"
                            placeholder="Country"
                            value={values.location.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="number"
                            name="size"
                            placeholder="Size (sqft)"
                            value={values.size}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="number"
                            name="bedrooms"
                            placeholder="Number of Bedrooms"
                            value={values.bedrooms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="State">State</label><br/>
                        <input
                            type="number"
                            name="bathrooms"
                            placeholder="Number of Bathrooms"
                            value={values.bathrooms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                             
                        
                        />
                        {/* Add more input fields for other property details as needed */}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button size="sm" sx={{ textTransform: "capitalize" }} disabled={isLoading} variant="brand" type="submit">
                            {isLoading ? <Spinner /> : 'Save'}
                        </Button>
                        <Button size="sm" variant="outline" colorScheme="red" sx={{ marginLeft: 2, textTransform: "capitalize" }} onClick={props.onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}

export default Add;
