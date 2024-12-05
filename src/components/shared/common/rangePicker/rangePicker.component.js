/* #region  [- import -] */
import React, { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import moment from 'moment-jalaali';
import { SyncOutlined } from "@ant-design/icons";
/* #endregion */

const RangePickerComponent = (props) => {
    //const date = moment().format('jYYYY/jM/jD')
    const defaultValue = {
        year: moment(props.date === '' || props.date===null ? '' : props.date, 'jYYYY/jM/jD').jYear(),
        month: moment(props.date === '' || props.date===null ? '' : props.date, 'jYYYY/jM/jD').jMonth(),
        day: moment(props.date === '' || props.date===null ? '' : props.date, 'jYYYY/jM/jD').jDate(),
    };
    const [selectedDay, setSelectedDay] = useState(props.date === '' || props.date===null ? null : defaultValue);

    /* #region  [- renderCustomInput -] */
    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            value={selectedDay ? selectedDay.year+'/' +selectedDay.month+ '/'+ selectedDay.day : ''}
            style={{height: '33.5px',  borderRadius: '3px', border: '1px solid #d9d9d9',  outline: 'none'}}
            className="my-custom-input-class responsive-calendar"
        />
    )
    /* #endregion */

    useEffect(() => {
        props.handleChangeDatePicker(selectedDay === null ? '' : selectedDay.year+'/' +selectedDay.month+ '/'+ selectedDay.day )
    });
    /* #region  [- return -] */
    return (
        <DatePicker
        
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder='تاریخ را انتخاب کنید'
            shouldHighlightWeekends
            renderInput={renderCustomInput}
            renderFooter={() => (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                    <SyncOutlined
                        style={{fontSize: "30px",color: "#0168b8", cursor: 'pointer',}}
                        onClick={() => {setSelectedDay(null)}}
                    />
                </div>
            )}
            inputClassName="my-custom-input"
            locale="fa"
            calendarPopperPosition='bottom'
        />

    );
    /* #endregion */

};

export default RangePickerComponent;