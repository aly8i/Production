import styles from "../styles/adminNew.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import Image from "next/image";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import { useSelector } from "react-redux";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import img from "../public/Camera.jpg"
const AddJob = ({crews,talents,providers,token}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [description, setDescription] = useState("");
    const [speciality,setSpeciality]= useState("");
    const [department,setDepartment]= useState("");
    const [workHours, setWorkHours] = useState([]);
    const [workDays,setWorkDays]= useState([]);
    const [salaryDurationUnit,setSalaryDurationUnit]= useState("");
    const [salaryDurationValue,setSalaryDurationValue]= useState("");
    const [salary,setSalary]= useState("");
    const [loading,setLoading] = useState (false);
    const days = ["mon","tue","wed","thu","fri","sat","sun"];
    const hours = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
    const router = useRouter();
    const user = useSelector((state) => state.user);

    const server = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      headers: {'Content-Type':'application/json'},
      withCredentials: true
    });
    server.interceptors.request.use(
      async function (config) {
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
    const renderCategory = (dep) => {
      if(dep=="Talent")
      {
        return(
        <FormControl sx={{ minWidth: 210 }}>
          <InputLabel>Category</InputLabel>
          <Select
            id="outlined-name"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            renderValue={(value) => `${value}`}
          >
            {
              talents.map((value,index)=>(
                <MenuItem key={`${index} ${value}`} value={value}>{value}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        )
      }else if(dep=="Service Provider"){
        return(
        <FormControl sx={{ minWidth: 210 }}>
          <InputLabel>Category</InputLabel>
          <Select
            id="outlined-name"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            renderValue={(value) => `${value}`}
          > 
            {
              providers.map((value,index)=>(
                <MenuItem key={`${index} ${value}`} value={value}>{value}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        )
      }else{
        return(
        <FormControl sx={{ minWidth: 210 }}>
          <InputLabel>Category</InputLabel>
          <Select
            id="outlined-name"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            renderValue={(value) => `${value}`}
          >
            {
              crews?.map((value,index)=>(
                <MenuItem key={`${index} ${value}`} value={value}>{value}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        )
      }
    }
    const toggleDay = (day) => {
      var temp = [...workDays]
      if(temp.includes(day)){
        temp = temp.filter(arrayItem => arrayItem !== day);
      }else{
        temp.push(day);
      }
      setWorkDays(temp);
    }
    const toggleHour = (hour) => {
      var temp = [...workHours]
      if(temp.includes(hour)){
        temp = temp.filter(arrayItem => arrayItem !== hour);
      }else{
        temp.push(hour);
      }
      setWorkHours(temp);
    }
    const postUser = async (pay) => {
      var res1 = {}
      const server = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        headers: {'Content-Type':'application/json'},
        withCredentials: true
      });
      server.interceptors.request.use(
        async function (config) {
          const accessToken =  token;
          if (accessToken) {
            config.headers.authorization = accessToken;
          }
          return config;
        },
        async function (error) {
          return Promise.reject(error);
        },
      );
      try{
        const res11 = await server.post("api/jobs", pay);
        res1=res11;
    }catch(err){
      if(err&&err.response?.status>=300){
        return {
          redirect: {
            permanent: false,
            destination: "/"
          },
        };
      }
    }
        return res1;
    }
    const handleSave = async()=>{
        setLoading(true);
        var img="";
        if(file!=null){
            img = await uploadFiles(file);
        }
        const payload = {userId: user.id,title,department,speciality,category,description,employmenttype:employmentType,salary,salaryduration:{unit:salaryDurationUnit,value:salaryDurationValue},workdays:workDays,workhours:workHours,image:img};
        try{
        postUser(payload);
        console.log(payload);
        setLoading(false);
        // router.push("/jobs");
        }catch(err){
        console.log(err);
        }  
    }
      function uploadFiles (file){
        if(!file) return;
        return new Promise(resolve =>{
          const storageRef = ref(storage, `/pizzas/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on("state_changed",(snapshot) =>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
          }, (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(urlz => {
              resolve(urlz);
            }
            )
          }
          );
        })
      };
  return (
    <div className={styles.new}>
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Edit Your Profile</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}> 
            <div className={styles.imgCon}>
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : img
                }
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.form}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}></div>
              <div className={styles.formInput}>    
                <TextField
                  id="outlined-name"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    id="outlined-name"
                    value={department}
                    label="Department"
                    onChange={(e) => setDepartment(e.target.value)}
                    renderValue={(value) => `${value}`}
                  >
                    <MenuItem value={'Crew'}>Crew</MenuItem>
                    <MenuItem value={'Talent'}>Talent</MenuItem>
                    <MenuItem value={'Service Provider'}>Service Provider</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Salary Duration"
                  value={salaryDurationValue}
                  onChange={(e) => setSalaryDurationValue(e.target.value)}
                />
                <FormControl sx={{ minWidth: 210 }}>
                <InputLabel>Unit</InputLabel>
                  <Select
                    id="outlined-name"
                    value={salaryDurationUnit}
                    label="Unit"
                    onChange={(e) => setSalaryDurationUnit(e.target.value)}
                    renderValue={(value) => `${value}`}
                  > 
                    <MenuItem value={'days'}>Day</MenuItem>
                    <MenuItem value={'weeks'}>Week</MenuItem>
                    <MenuItem value={'months'}>Month</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                  {
                    renderCategory(department)
                  }
              </div>

              <div className={styles.formInput}>
                <FormControl sx={{ minWidth: 210 }}>
                <InputLabel>Employment Type</InputLabel>
                  <Select
                    id="outlined-name"
                    value={employmentType}
                    label="Employment Type"
                    onChange={(e) => setEmploymentType(e.target.value)}
                    renderValue={(value) => `${value}`}
                  >
                    <MenuItem value={'Full Time'}>Full Time</MenuItem>
                    <MenuItem value={'Part Time'}>Part Time</MenuItem>
                    <MenuItem value={'Contract'}>Contract</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.formInput}>
                <div className={styles.scroll}>
                {
                  days.map((day,index)=>(
                    <div key={`${index} ${day}`} onClick={()=>{toggleDay(day)}} className={workDays.includes(day)?`${styles.day} ${styles.selected}`:`${styles.day}`}>{day}</div>
                  ))
                }
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.scroll}>
                {
                  hours.map((hour,index)=>(
                    <div key={`${index} ${hour}`} onClick={()=>{toggleHour(hour)}} className={workHours.includes(hour)?`${styles.day} ${styles.selected}`:`${styles.hour}`}>{hour}</div>
                  ))
                } 
                </div>
              </div>
              <div className={styles.formInput}>
                <button onClick={handleSave}>Save</button>
                {loading?(<Progress className={styles.progress}/>):null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddJob;