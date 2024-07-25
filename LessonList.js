import React, { useCallback, useEffect, useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import LessonDetail from '../../components/LessonDetail';
import Addlist from '../addlist/Addlist';
import "./Less.css"

const LessonList = () => {
  const [LessonData, setLessonData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [info, setInfo] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:1337/api/lessons');
      if (res.ok) {
        const data = await res.json();
        setLessonData(data.data);
        console.log(data)
      } else {
        throw new Error('数据加载失败');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);


  function addItemToLessons(lessons) {
    const weekMap = {
      '周一': 1,
      '周二': 2,
      '周三': 3,
      '周四': 4,
      '周五': 5,
      '周六': 6,
      '周日': 7
    };

    lessons.forEach(lesson => {
      lesson.attributes.length = lesson.attributes.endtime - lesson.attributes.starttime - 1;
      let itemArray = [];
      for (let i = lesson.attributes.starttime; i <= lesson.attributes.endtime; i++) {
        itemArray.push([i, weekMap[lesson.attributes.week]]);
      }
      lesson.attributes.item = itemArray;
    });
  }
  addItemToLessons(LessonData);


const arr = Array.from({ length: 12 }, () => Array(7).fill(0));
  
const oSliderPage = useRef(null);
  const oScrollWrapper = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [distanceX, setDistanceX] = useState(0);
  const [isMove, setIsMove] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
  
    const moveX = e.touches[0].clientX;
    const pageWidth = oSliderPage.current.offsetWidth;

    if ((startX < moveX && pageIndex === 0) || (startX > moveX && pageIndex === 2)) {
      return;
    }

    setDistanceX(moveX - startX);
    setIsMove(true);
    setTranslateX(-pageWidth * pageIndex + distanceX);
    
  };

  const handleTouchEnd = () => {
    if (isMove) {
      if (Math.abs(distanceX) >= oSliderPage.current.offsetWidth / 3) {
        if (distanceX > 0) {
          setPageIndex(pageIndex - 1);
        } else {
          setPageIndex(pageIndex + 1);
        }
      }
      setTranslateX(-pageIndex * oSliderPage.current.offsetWidth);
    }
    setStartX(0);
    setDistanceX(0);
    setIsMove(false);
  };

  const setTranslateX = (transX) => {
    oScrollWrapper.current.style.transition = 'all 0.1s';
    oScrollWrapper.current.style.transform = `translateX(${transX}px)`;
  };
  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
 <div id="app">
      <div ref={oSliderPage} className="slider-page"
        onTouchStart={handleTouchStart} 
        onTouchMove={handleTouchMove} 
        onTouchEnd={handleTouchEnd}>
        <div ref={oScrollWrapper} className="scroll-wrapper">
                <div className="slider-item">
            <div className="inner" ><div className="main"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}>
              <header>
                <div className="left">
                  <h2 className="title">第一周</h2>
                  <div className="icon">
                    <FontAwesomeIcon icon={faGreaterThan} />
                  </div>
                </div>
                <div className="right">
                  <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <button className="btn">回到本周</button>
                </div>
              </header>
              <nav className="container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                <table className='lesson-table'>
                  <thead>
                    <tr>
                      <td rowSpan="2">7月</td>
                      {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
                        <th key={index}>{day}</th>
                      ))}
                    </tr>
                    <tr className="data">
                      {new Array(7).fill().map((_, i) => (
                        <td key={i}>{22 + i}日</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="mid">
                    {arr.map((row, i) => {
                      row[0] = i + 1; // 将第一列的元素设置为对应的行索引加1
                      LessonData.forEach(lesson => {
                        if (lesson.attributes.item && lesson.attributes.item.some(item => item[0] === i + 1)) {
                          lesson.attributes.item.forEach(item => {
                            if (item[0] === i + 1) {
                              row[item[1]] = lesson.attributes.name;
                            }
                          });
                        }
                      });
                      return (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            cell === 0 ? <td key={j}
                              onClick={() => {
                                setAddPopup(!addPopup);
                              }}
                            ></td> : <td key={j}
                              onClick={() => {
                                setShowPopup(!showPopup);
                                setInfo(cell);
                              }}>{cell}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </nav>
              {showPopup && LessonData.map((lesson, index) => {
                if (lesson.attributes.name === info) {
                  return <LessonDetail key={index} less={lesson} />;
                }
                return null;
              })}
              {addPopup && <Addlist />}
            </div></div>
                </div>
                <div className="slider-item">
            <div className="inner"><div className="main"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}>
              <header>
                <div className="left">
                  <h2 className="title">第二周</h2>
                  <div className="icon">
                    <FontAwesomeIcon icon={faGreaterThan} />
                  </div>
                </div>
                <div className="right">
                  <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <button className="btn">回到本周</button>
                </div>
              </header>
              <nav className="container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                <table>
                  <thead>
                    <tr>
                      <td rowSpan="2">7月</td>
                      {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
                        <th key={index}>{day}</th>
                      ))}
                    </tr>
                    <tr className="data">
                      {new Array(7).fill().map((_, i) => (
                        <td key={i}>{22 + i}日</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="mid">
                    {arr.map((row, i) => {
                      row[0] = i + 1; // 将第一列的元素设置为对应的行索引加1
                      LessonData.forEach(lesson => {
                        if (lesson.attributes.item && lesson.attributes.item.some(item => item[0] === i + 1)) {
                          lesson.attributes.item.forEach(item => {
                            if (item[0] === i + 1) {
                              row[item[1]] = lesson.attributes.name;
                            }
                          });
                        }
                      });
                      return (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            cell === 0 ? <td key={j}
                              onClick={() => {
                                setAddPopup(!addPopup);
                              }}
                            ></td> : <td key={j}
                              onClick={() => {
                                setShowPopup(!showPopup);
                                setInfo(cell);
                              }}>{cell}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </nav>
              {showPopup && LessonData.map((lesson, index) => {
                if (lesson.attributes.name === info) {
                  return <LessonDetail key={index} less={lesson} />;
                }
                return null;
              })}
              {addPopup && <Addlist />}
            </div></div>
                </div>
                
            </div>
        </div>
    </div>

);
};
export default LessonList;


