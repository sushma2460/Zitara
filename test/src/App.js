import React, { useEffect,useState } from 'react'
import './App.css'

const App = () => {

  const [users,setUsers]=useState([]);
  const [store,setStore]=useState('');
  const [extra,setExtra]=useState([]);
  const [locat,setlocat]=useState('');
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=async()=>{
    const response=await fetch("http://localhost:5000/sushma");
    if(response.ok){
      const data=await response.json();
      console.log(data);
      setUsers(...users,data);
      setExtra(users);
    }
  }

  // for sort date and time 
  const sortByDate = () => {
    const sorted = [...users].sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
    setUsers(sorted);
  };

  // Sort by times in descending order
  const sortByTime = () => {
    const sorted = [...users].sort((a, b) => {
      const [, timeA] = a.createdat.split('T');
      const [, timeB] = b.createdat.split('T');
      return timeB.localeCompare(timeA);
    });
    setUsers(sorted);
  };

  // pagination
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerpage=20;
  const lastIndex=currentPage*recordsPerpage;
  const firstIndex=lastIndex-recordsPerpage;
  const records=users.slice(firstIndex,lastIndex);
  const npage=Math.ceil(users.length/recordsPerpage);
  const numbers=[...Array(npage+1).keys()].slice(1);

  function prePage(){
    if(currentPage!==1){
      setCurrentPage(currentPage-1)
    }

  }
  function nextPage(){
    if(currentPage!==npage){
      setCurrentPage(currentPage+1)
    }

  }
  function changeCPage(id){
    setCurrentPage(id);
  }



  
  return <>

  <h1 className="RecordsName">Records Of Data</h1>
    <div className="SearchButtons">
    <div className="search-container">
      <input
        type="text"
        
        onChange={(e)=>{
          setStore(e.target.value)
        }}
        placeholder='Search by name'
        
        className="search-input"
      />
      <span className="search-icon">&#128269;</span>
    </div>


    <div className="search-container">
      <input
        type="text"
        
        onChange={(e)=>{
          setlocat(e.target.value)
        }}
        placeholder='Search by Location'
        
        className="search-input"
      />
      <span className="search-icon">&#128269;</span>
    </div>
    <div class="dropdown">
    <button class="dropbtn">Click To Sort Records</button>
    <div class="dropdown-content">
    <button onClick={sortByDate}>Sort by Date</button>
    <button onClick={sortByTime}>Sort by Time</button>
    </div>
    </div>
    </div>
    
    <table >
      <tr>
        <th>sno</th>
        <th>customer_name</th>
        <th>age</th>
        <th>phone</th>
        <th>location</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
      
      {/* for search the content */}
      
        {records.filter((it)=>{
          return locat.toLowerCase()===''
          ? it
          :it.loc.toLowerCase().includes(locat);
        })
          .filter((item)=>{
          
          return store.toLowerCase()===''
          ? item
          
          :item.customername.toLowerCase().includes(store);
        })
          .map((each,index)=>{
          const [date, time]=each.createdat.split('T');
          const [time1,time2]=time.split('.');
          return <tr key={index} style={{}}>
             <td >{each.sno}</td>
            <td >{each.customer_name}</td>
            <td >{each.age}</td>
            <td >{each.phone}</td>
            <td >{each.location}</td>
            <td >{date}</td>
            <td >{time}</td>
            </tr>
        })
      }
    
    </table>

    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <a href='#' className='page-link'
          onClick={prePage}>Prev</a>
        </li>
        {
          numbers.map((n,i)=>{
            <li className={`page-item ${currentPage===n ?'active':''}`} key={i}>
            <a href='#' className='page-link'
            onClick={()=>changeCPage(n)}>{n}</a>
            </li>
          })
        }
        <li className='page-item'>
          <a href='#' className='page-link'
          onClick={nextPage}>Next</a>
        </li>
      </ul>
    </nav>
    
    
  </>
  
  
}


export default App;