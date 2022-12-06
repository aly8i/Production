import styles from "../styles/adminNew.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { motion } from "framer-motion";
import { InputLabel } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
const EditUser = ({user,token}) => {
    const [file, setFile] = useState(null);
    const [files1, setFiles1] = useState([]);
    const [country, setCountry] = useState(user.address?.country);
    const [city, setCity] = useState(user.address?.city);
    const [lat, seLat] = useState(user.location?.lat);
    const [long, setLong] = useState(user.location?.long);
    const [url, setUrl] = useState(user.url);
    const [department, setDepartment] = useState(user.department);
    const [speciality, setSpeciality] = useState(user.speciality);
    const [yearsofexperience, setYearsofexperience] = useState(user.yearsofexperience);
    const [interests, setInterests] = useState(user.interests);
    const [interest, setInterest] = useState("");
    const [view, setView] = useState(user.view);
    const [linkedin, setLinkedin] = useState(user.links[0]?.link);
    const [imdb, setImdb] = useState(user.links[1]?.link);
    const [vimeo, setVimeo] = useState(user.links[2]?.link);
    const [educationlevel, setEducationlevel] = useState(user.education?.educationlevel);
    const [fieldofstudy,setFieldofstudy] = useState(user.education?.fieldofstudy);
    const [graduationyear,setGraduationyear] = useState(user.education?.graduationyear);
    const [showreel, setShowreel] = useState(user.showreel);
    const [about,setAbout] = useState(user.about)
    const [languages,setLanguages] = useState(user.languages);
    const [language,setLanguage] = useState("");
    const [fullname, setFullname] = useState(user.fullname);
    const [email, setEmail] = useState(user.email);
    const [phonenumber,setPhonenumber]= useState(user.phonenumber);
    const [username, setUsername] = useState(user.fullname);
    const [role,setRole]= useState(user.role);
    const [loading,setLoading] = useState (false);
    const router = useRouter();
    const handleFile1 = (val) => {
      setFiles1((prev) => [...prev, val]);
    };

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
        const res11 = await server.put(`api/users/${user._id}/`, pay);
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
    const handleClear = ()=>{
      setShowreel([]);
      setFiles1([]);
    }
    const addInterest = (e) => {
      setInterests((prev) => [...prev, interest]);
      setInterest("");
    }
    const addLanguage = (e) => {
      setLanguages((prev) => [...prev, language]);
      setLanguage("");
    }
    const handleInterest = (index) => {
      const removedInterest = interests.splice(index,1);
      setInterests(interests.filter((option) =>(option!==removedInterest[0])));
    };
    const handleLanguage = (index) => {
      const removedLanguage = languages.splice(index,1);
      setLanguages(languages.filter((option) =>(option!==removedLanguage[0])));
    };

    const handleSave = async()=>{
        setLoading(true);
        var img="";
        var rs = true;
        var slider = [];
        console.log("first")
        if(file!=null){
            img = await uploadFiles(file);
        }else{
            img = user.image;
        }
        const promise1 = new Promise(async(resolve, reject) => {
          if(files1.length!=0){
            console.log("sec")
            files1.map(async(file, i) => {
                const promise2 = new Promise(async(resolve, reject) => {
                  url = await uploadFiles(file);
                  resolve(url);
                });
                promise2.then((url)=>{
                  slider.push(url);
                }).then(()=>{
                  if(i+1==files1.length){
                    resolve('finished');
                  }
                })
          });
          }else{
            resolve('skipped');
            rs=false;
          }
        });
        promise1.then((res)=>{
          console.log("th")
          if(res=='finished'||res=='skipped'){
            if(rs==true){
              const payload = {username,fullname,image:img,phonenumber,address:{country,city},email,url,view,about,department,speciality,yearsofexperience,interests,links:[{provider:"linkedin",link:linkedin},{provider:"imdb",link:imdb},{provider:"vimeo",link:vimeo}],education:{educationlevel,fieldofstudy,graduationyear},languages,showreel:slider};
              try{
                postUser(payload);
                console.log(payload);
                setLoading(false);
                router.push("/");
              }catch(err){
                console.log(err);
              }  
            }else{
              console.log("fr")
              const payload = {username,fullname,image:img,phonenumber,address:{country,city},email,url,view,about,department,speciality,yearsofexperience,interests,links:[{provider:"linkedin",link:linkedin},{provider:"imdb",link:imdb},{provider:"vimeo",link:vimeo}],education:{educationlevel,fieldofstudy,graduationyear},languages,showreel};
              try{
                postUser(payload);
                console.log(payload)
                setLoading(false);
                router.push("/");
              }catch(err){
                console.log(err);
              }  
            }
          }
        })
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
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.image ? user.image
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
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
              <div className={styles.formInput}>  
              </div>
              <div className={styles.formInput}> 
                <TextField
                    id="outlined-name"
                    label="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Email"
                    value={email}
                    disabled
                />
              </div>
              
              <div className={styles.formInput}>
                <TextField
                    onChange={(e)=>setVimeo(e.target.value)}
                    id="outlined-name"
                    label="Vimeo"
                    value={vimeo}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    onChange={(e)=>setLinkedin(e.target.value)}
                    id="outlined-name"
                    label="Linkedin"
                    value={linkedin}
                />
              </div>
              <div className={styles.formInput}>  
                <TextField
                    onChange={(e)=>setImdb(e.target.value)}
                    id="outlined-name"
                    label="IMDB"
                    value={imdb}
                />
              </div>
              <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>Type</InputLabel>
                    <Select
                      id="outlined-name"
                      value={view}
                      label="Type"
                      onChange={(e) => setView(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'Employeer'}>Employeer</MenuItem>
                      <MenuItem value={'Talent'}>Talent</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setUrl(e.target.value)}
                  id="outlined-name"
                  label="URL"
                  value={url}
                />
              </div>
              <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>Years of Experience</InputLabel>
                    <Select
                      id="outlined-name"
                      value={yearsofexperience}
                      label="Years of Experience"
                      onChange={(e) => setYearsofexperience(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'1'}>1</MenuItem>
                      <MenuItem value={'2'}>2</MenuItem>
                      <MenuItem value={'3'}>3</MenuItem>
                      <MenuItem value={'4'}>4</MenuItem>
                      <MenuItem value={'5'}>5</MenuItem>
                      <MenuItem value={'6'}>6</MenuItem>
                      <MenuItem value={'7'}>7</MenuItem>
                      <MenuItem value={'7+'}>7+</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setGraduationyear(e.target.value)}
                  id="outlined-name"
                  label="Graduation Year"
                  value={graduationyear}
                />
              </div>

              <div className={styles.formInput}>  
                <TextField
                    onChange={(e)=>setFieldofstudy(e.target.value)}
                    id="outlined-name"
                    label="Field of Study"
                    value={fieldofstudy}
                />
              </div>
              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setEducationlevel(e.target.value)}
                  id="outlined-name"
                  label="Education Level"
                  value={educationlevel}
                />
              </div>
              <div className={styles.formInput}>  
                <TextField
                    onChange={(e)=>setAbout(e.target.value)}
                    id="outlined-name"
                    label="About"
                    value={about}
                    multiline
                    rows={4}
                />
              </div>
              {user.role=="admin"?(
                <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                    <Select
                      id="outlined-name"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      renderValue={(value) => `${value}`}
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ):(
                <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }}>
                    <Select
                      id="outlined-name"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      renderValue={(value) => `${value}`}
                      disabled
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
               <div className={styles.formInput}>  
               </div>
              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setInterest(e.target.value)}
                  id="outlined-name"
                  label="Interest"
                  value={interest}
                />
                <div className={styles.extraItems}>
                  <div className={styles.btn} onClick={()=>{addInterest()}}>
                    Add
                  </div>
                </div>
              </div>

              <div className={styles.formInput}>  
                <TextField
                  onChange={(e)=>setLanguage(e.target.value)}
                  id="outlined-name"
                  label="Language"
                  value={language}
                />
                <div className={styles.extraItems}>
                  <div className={styles.btn} onClick={()=>{addLanguage()}}>
                    Add
                  </div>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.extraItems}>
                { 
                  interests?.map((interest,i)=>(
                    <div key={i+interest} onClick={()=>handleInterest(i)} className={styles.btn}>{interest}</div>
                  ))
                }
                </div>
              </div>
              <div className={styles.formInput}>
                  <div className={styles.extraItems}>
                  { 
                    languages?.map((lan,i)=>(
                      <div key={i+lan} onClick={()=>handleLanguage(i)} className={styles.btn}>{lan}</div>
                    ))
                  }
                  </div>
                </div>
                <div className={styles.slider}>
              <div className={styles.text}>
                  <label htmlFor="file1">
                      Show Reel: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                      type="file"
                      id="file1"
                      onChange={(e) => handleFile1(e.target.files[0])}
                      style={{ display: "none" }}
                  />
              </div>
              <div className={styles.images}>
                {files1[0]?(
                  files1.map((file,i)=>(<motion.img  key={i} whileHover={{ scale: 1.2}} src={URL.createObjectURL(file)} alt=""/>))
                ):(
                  showreel?.map((slide,i)=>(<motion.img key={i} whileHover={{ scale: 1.2}} src={slide} alt=""/>))
                )}
              </div>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} className={styles.x} onClick={()=>handleClear()}>
                {files1[0]?(<CancelIcon className={styles.xIcon}/>):(showreel?(<CancelIcon className={styles.xIcon}/>):(<></>))}
              </motion.div>
            </div>
              <div className={styles.formInput}>
                <button onClick={handleSave}>Save</button>
              </div>
              <div className={styles.formInput}>
                {loading?(<Progress className={styles.progress}/>):null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;