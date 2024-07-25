import React, { useState } from 'react'
import "./LessDetail.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'

const LessonDetail = (props) => {
    console.log("进入")
    console.log({ props })
    const [showPopup2, setShowPopup2] = useState(true);

    function getTime(starttime, endtime) {
        const startTimes = ["8:00", "8:55", "10:15", "11:10", "14:00", "14:55", "16:15", "17:10", "19:00", "19:55", "20:50", "21:45"];
        const endTimes = ["8:45", "9:40", "11:00", "11:55", "14:45", "15:40", "17:00", "17:55", "19:45", "20:40", "21:35", "22:30"];

        if (starttime >= 1 && starttime <= 12 && endtime >= 1 && endtime <= 12) {
            return `${startTimes[starttime - 1]}-${endTimes[endtime - 1]}`;
        } else {
            return "Invalid input";
        }
    }
    if (props.less && props.less.attributes) {

        console.log(props.less.attributes.name);
        const t = props.less.attributes.endtime - props.less.attributes.starttime
        return (showPopup2 &&
            (<div className="overlay" style={{ 'flex-direction': 'column', 'justify-content': 'flex-end' }} onClick={() => {
                setShowPopup2(false)
            }}>
                <div className='popUp'>
                    <h3>{props.less.attributes.name}</h3>
                    <div className='desc'>{props.less.attributes.place}
                        &nbsp;
                        <FontAwesomeIcon icon={faGreaterThan} />
                        &nbsp;&nbsp;&nbsp;
                        {props.less.attributes.teacher}</div>
                    <p><span>周期</span>
                        <span>{props.less.attributes.cycle}
                            &nbsp;
                            {`${t + 1}节连上`}
                        </span>
                    </p>
                    <p>
                        <span>时间</span>
                        <span>
                            {props.less.attributes.week}
                            &nbsp;
                            {getTime(props.less.attributes.starttime, props.less.attributes.endtime)}
                        </span>
                    </p>
                    <p>
                        <span>课程类型</span>
                        <span>
                            {props.less.attributes.desc}
                        </span>

                    </p>
                </div>
            </div>
            ))// 输出name属性
    }

}

export default React.memo(LessonDetail)
