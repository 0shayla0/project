import { useEffect, useState } from 'react';
import './App.css';
import LessonList from './pages/lessonlist/LessonList';
import Addlist from './pages/addlist/Addlist';

const App = ()=>{


  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const toggleLessonList = () => {
    setShowLessonList(!showLessonList);
  };
  const [showLessonList, setShowLessonList] = useState(false);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const previousScrollY = window.scrollY - 1;
    if (currentScrollY > previousScrollY) {
      setIsScrollingUp(true);
      console.log('向上');
    } else {
      setIsScrollingUp(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="App">
      {(!showLessonList && !isScrollingUp) &&
        <button className='bottom'
          onClick={toggleLessonList}>显示/隐藏课程列表</button>}
      {(showLessonList || isScrollingUp) && <LessonList />}
    </div>
  );


};
export default App;

