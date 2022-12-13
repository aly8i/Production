import styles from "../styles/EditEquipment.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import { useSelector } from 'react-redux';
import Image from "next/image";
import CancelIcon from '@mui/icons-material/Cancel';
import Error from "./Error";
const EditEquipment = ({equipment,token}) => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState(equipment.name||"");
    const [images, setImages] = useState(equipment.images || []);
    const [tags, setTags] = useState(equipment.tags||[]);
    const [category, setCategory] = useState(equipment.category||"");
    const [price, setPrice] = useState(equipment.price||"");
    const [forr,setForr] = useState(equipment.forr||"sell or rent");
    const [rentduration, setRentduration] = useState(equipment.rentduration||"");
    const [warranty, setWarranty] = useState(equipment.warranty||"");
    const [loading,setLoading] = useState (false);
    const [loadingSR,setLoadingSR]= useState(false);
    const [tag, setTag] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");
    
    const handleFile1 = async (val) => {
      setLoadingSR(true);
      const img = await uploadFiles(val);
      setImages((prev) => [...prev, img]);
      setLoadingSR(false);
    };

    const postData = async (pay) => {
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
        const res11 = await server.put(`api/equipments/${equipment._id}/`, pay);
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
    const validate = ()=>{
      if(name==""){
        setError("Please add a name.")
        return false;
      }else if(name.length>20){
        setError("Please shorten your name.")
        return false;
      }else if(images.length<1){
        setError("Please add some images.")
        return false;
      }else if(category==""){
        setError("Please add a category.")
        return false;
      }else if(category.length>20){
        setError("Please shorten your category.")
        return false;
      }else if(price==""){
          setError("Please add a price.")
          return false;
      }else if(price.length>8){
        setError("Please enter a valide price.")
        return false;
      }else if(forr==""){
            setError("Please add for what.")
            return false;
      }else{
        return true;
      }
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
      const validated = validate();
      if(!validated) return;
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
          <h1>Edit Your Equipment</h1>
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
                <TextField
                  id="outlined-name"
                  label="For"
                  value={forr}
                  onChange={(e) => setForr(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-name"
                  label="Rent Duration"
                  value={rentduration}
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
              <Error setError={setError} error={error}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEquipment;