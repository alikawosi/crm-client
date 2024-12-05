/* #region  [- import -] */
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { useSelector, useDispatch } from 'react-redux'
/* #endregion */

const NewManualActivityType = (props) => {

    /* #region  [- storeFields -] */
    const checkTokenCounter = useSelector((state) => state.auth.checkTokenCounter)
    const domain = useSelector((state) => state.auth.domain)
    /* #endregion */

    /* #region  [- distpatchActions -] */
    const dispatch = useDispatch();
    /* #endregion */

    /* #region  [- componentFields -] */
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(false);
    /* #endregion */

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    //#region [- validateForm() -]
    const validateForm = async (event) => {
        var errors = {};

        switch (event.target.id) {

            //#region [- title -]
            case "title":
                if (event.target.value === "") {
                    setIsTitleInvalid(true)
                    setIsTitleValid(false)
                    errors["title"] = "عنوان اجباری است";
                }
                else {
                    setIsTitleInvalid(false)
                    setIsTitleValid(true)
                }
                break;
            //#endregion

            default:
                errors = {};
                break;
        }
        setErrors(errors)
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    const validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- title -]      
        if (title === "") {
            setIsTitleInvalid(true)
            setIsTitleValid(false)
            errors["title"] = "عنوان اجباری است";
        }
        else {
            setIsTitleInvalid(false)
            setIsTitleValid(true)
        }

        //#endregion
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    //#endregion

    /* #region [*** Handle Changes ***] */

    /* #region  [- handleChange(event) -] */
    const handleChange = (event) => {
        setTitle(event.target.value)
        validateForm(event);
    }
    /* #endregion */

    /* #endregion */

    //#region [*** api ***]

    //#endregion

    //#region [*** buttonTasks ***]

    /* #region  [- cancel() -] */
    const cancel = async () => {
        await dispatch(checkTokenExpiration(checkTokenCounter));
        props.onCloseNewManualActivityTypeDrawer();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    const submit = async () => {
        await dispatch(checkTokenExpiration(checkTokenCounter));
        if (validateFormOnButtonClick() === true) {
            let manualActivityTypePostData = {
                domainRef: domain,
                manualActivityTypeList: [
                    {
                        title: title,
                    }
                ]
            }
            await props.postTimelineManualActivityType(manualActivityTypePostData);
        }

    }
    /* #endregion */

    //#endregion

    /* #region  [- render() -] */
    return (

        <Container fluid className="reacstrap-container" style={{ padding: "0" }} >

            <Row name='row_01_Header' className='form-header-row' style={{ margin: "0" }}>
                <Col className="form-header-col">
                    <p className="form-header-title">نوع فعالیت جدید</p>
                </Col>
            </Row>

            <Form name='form' className="reactstrap-form">
                <Row name='title'>
                    <Col name='title' sm={12}>
                        <FormGroup name='title' className="reactstrap-formGroup">
                            <Label>عنوان<span className="form-mandatory-field-star">*</span></Label>
                            <Input
                                type='text'
                                name='title'
                                id='title'
                                placeholder='عنوان'
                                value={title}
                                onChange={handleChange}
                                invalid={isTitleInvalid}
                                valid={isTitleValid}
                            />
                            <FormFeedback>{errors.title}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>

            </Form>

            <Row name='row_02_ِButtons' className='form-button-row' style={{ margin: "0" }}>

                <Col sm='12' style={{ marginTop: "5px" }}>
                    <Button name='cancel' className='cancel-button-style mr-2' onClick={cancel}>لغو</Button>
                    <Button name='submit' className='submit-button-style mr-2' onClick={submit}>ثبت</Button>
                </Col>

            </Row>

        </Container>

    );

    /* #endregion */

    /* #endregion */
}


export default NewManualActivityType;


