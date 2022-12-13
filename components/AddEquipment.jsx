import styles from "../styles/EditEquipment.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../Firebase";
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import { useSelector } from 'react-redux';
import Image from "next/image";
import CancelIcon from '@mui/icons-material/Cancel';
const AddEquipment = () => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [forr,setForr] = useState("Sell or Rent");
    const [rentduration, setRentduration] = useState("");
    const [warranty, setWarranty] = useState("");
    const [loading,setLoading] = useState (false);
    const [loadingSR,setLoadingSR]= useState(false);
    const [tag, setTag] = useState("");
    const router = useRouter();
    
    const handleFile1 = async (val) => {
      setLoadingSR(true);
      const img = await uploadFiles(val);
      setImages((prev) => [...prev, img]);
      setLoadingSR(false);
    };

    const postData = async (pay) => {
      var res1 = {}
      try{
        const res11 = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/equipments/`, pay);
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
      setImages([]);
    }
    const addTag = (e) => {
      if(tag=="") return;
      setTags((prev) => [...prev, tag]);
      setTag("");
    }

    const handleTag = (index) => {
      const removedTag = tags.splice(index,1);
      setTags(tags.filter((option) =>(option!==removedTag[0])));
    };

    const handleSave = async()=>{
        setLoading(true);
        const payload = {userid:user.id,name,images,tags,category,price,forr,rentduration,warranty};
        try{
          postData(payload);
          setLoading(false);
          router.push("/");
        }catch(err){
          console.log(err);
        }  
            
    }

    const handleImage = (index) => {
      const removedSlide = images.splice(index,1);
      setImages(images.filter((option) =>(option!==removedSlide[0])));
    };

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
          <h1>Add your Equipment</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.imgCon}>
            {images.length>0?
              <Image
                src={images[0]}
                alt=""
                objectFit="cover"
                layout="fill"
              />:<></>
            }
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.form}>
            <div className={styles.formInput}> 
            </div>
            <div className={styles.formInput}> 
            </div>
              <div className={styles.formInput}> 
                <TextField
                    id="outlined-name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
              <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel>For</InputLabel>
                  <Select
                    id="outlined-name"
                    value={forr}
                    label="For"
                    onChange={(e) => setForr(e.target.value)}
                    renderValue={(value) => `${value}`}
                  >
                    <MenuItem value={'Rent'}>Rent</MenuItem>
                    <MenuItem value={'Sell'}>Sell</MenuItem>
                    <MenuItem value={'Rent or Sell'}>Rent or Sell</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Rent Duration"
                  value={rentduration}
                  disabled={forr=="Sell"?true:false}
                  onChange={(e) => setRentduration(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                />
              </div>
              <div className={styles.middle}>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                />
                <div className={styles.value} onClick={()=>{addTag()}}>
                   Add
                </div>
              </div>
              <div className={styles.inputs}>
              { 
                tags?.map((value,i)=>(
                  <div key={i+value} onClick={()=>handleTag(i)} className={styles.value}>{value}</div>
                ))
              }
              </div>
            </div>
              <div className={styles.slider}>
                <div className={styles.text}>
                  <label htmlFor="file1">
                      Images: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                    type="file"
                    id="file1"
                    onChange={(e) => handleFile1(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.images}>
                  {
                    images.length!=0?images.map((slide,i)=>(<img key={`${i}x`} onClick={()=>handleImage(i)} src={slide} alt=""/>)):<></>
                  }
                  {loadingSR?<div className={styles.loading}><Progress/></div>:<></>}
                </div>
                <div  className={styles.x} onClick={()=>handleClear()}>
                  {images.length!=0?(<CancelIcon className={styles.xIcon}/>):(images?(<CancelIcon className={styles.xIcon}/>):(<></>))}
                </div>
              </div>
              <div className={styles.saveSection}>
              {loading?(<Progress className={styles.progress}/>):<button className={styles.save} onClick={handleSave}>Save</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEquipment;