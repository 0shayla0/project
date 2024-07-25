import React, { useCallback, useState } from 'react'
import "./addlist.css"

const Addlist = () => {
  const [isAdd,setIsAdd]=useState(false)
    const addData = async (data) => {
      try {
        const response = await fetch('http://localhost:1337/api/lessons', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({data}),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setIsAdd(true)
        console.log('Data added successfully:', result);
      } catch (error) {
        console.error('Error adding data:', error);
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        name: inputValue1,
        place: inputValue2,
        week: document.querySelector('select[name="week"]').value,
        starttime: document.querySelector('select[name="starttime"]').value,
        endtime: document.querySelector('select[name="endtime"]').value,
        desc: '事务',
        teacher: '自定义',
        cycle: '1-3周'
      };

      addData(data);
      window.location.reload(); 
      alert("已成功添加")
    };

  const [colors, setColors] = useState({
    week1: false,
    week2: false,
    week3: false,
  });

  const handleClick = (week) => {
    setColors({ ...colors, [week]: !colors[week] });
  };

  const [showPopup, setShowPopup] = useState(true);

  const handleCancel = () => { // 添加一个点击事件处理函数
    setShowPopup(false);
  };

  const [inputValue1, setInputValue1] = useState('例如：自习');
  const [inputValue2, setInputValue2] = useState('例如：红岩网校工作站');

  const handleChange = (event, setInputValue) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event, inputValue, submitData) => {
    if (event.key === 'Enter') {
      submitData(inputValue);
    }
  };

  return (
    (showPopup&& !isAdd) && (
    <div className="overlay">
      <div className="addpopup">
        <form onSubmit={handleSubmit}>
        <header className='title'>
          <h3>为你的行程添加一个标题</h3>
            <span className='delete' onClick={handleCancel}>取消</span>
        </header>
          <input
            type="text"
            value={inputValue1}
            onChange={(event) => handleChange(event, setInputValue1)}
            onKeyDown={(event) => handleKeyDown(event, inputValue1)}
          />
          <h3>具体内容</h3>
          <input
            type="text"
            value={inputValue2}
            onChange={(event) => handleChange(event, setInputValue2)}
            onKeyDown={(event) => handleKeyDown(event, inputValue2)}
            />
        <h3>选择周数</h3>
        <div>
          <button className={` ${colors.week1 ? 'changecolor' : 'weeks'}`} onClick={() => handleClick('week1')}>第一周</button>
          <button className={` ${colors.week2 ? 'changecolor' : 'weeks'}`} onClick={() => handleClick('week2')}>第二周</button>
          <button className={` ${colors.week3 ? 'changecolor' : 'weeks'}`} onClick={() => handleClick('week3')}>第三周</button>
        </div>
        <h3>确定时间</h3>
        <select name="week" >
          <option value="周一">周一</option>
          <option value="周二">周二</option>
          <option value="周三">周三</option>
          <option value="周四">周四</option>
          <option value="周五">周五</option>
          <option value="周六">周六</option>
          <option value="周日">周日</option>
        </select>
        <select name="starttime">
          <option value="1">第一节</option>
          <option value="2">第二节</option>
          <option value="3">第三节</option>
          <option value="4">第四节</option>
          <option value="5">第五节</option>
          <option value="6">第六节</option>
          <option value="7">第七节</option>
          <option value="8">第八节</option>
          <option value="9">第九节</option>
          <option value="10">第十节</option>
          <option value="11">第十一节</option>
          <option value="12">第十二节</option>
        </select>
        <select name="endtime">
          <option value="1">第一节</option>
          <option value="2">第二节</option>
          <option value="3">第三节</option>
          <option value="4">第四节</option>
          <option value="5">第五节</option>
          <option value="6">第六节</option>
          <option value="7">第七节</option>
          <option value="8">第八节</option>
          <option value="9">第九节</option>
          <option value="10">第十节</option>
          <option value="11">第十一节</option>
          <option value="12">第十二节</option>
        </select>
          <button type="submit" className='btm'>提交</button>
      </form>

      </div>
    </div>
  ))
}

export default Addlist




