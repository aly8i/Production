import styles from "../styles/AddNew.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import Image from "next/image";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "./Progress";
import img from "../public/Camera.jpg"
const EditNew = ({obj,token}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(obj.title||"");
    const [description, setDescription] = useState(obj.description||"");
    const [tags, setTags] = useState(obj.tags||[]);
    const [tag, setTag] = useState("");
    const [article, setArticle] = useState(obj.article||[]);
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionContent, setSectionContent] = useState("");
    const [loading,setLoading] = useState (false);
    const router = useRouter();
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

    const handleSection = (index) => {
      const removedSection = article.splice(index,1);
      setArticle(article.filter((option) =>(option!==removedSection[0])));
    };
    const addSection = (e) => {
      if(sectionTitle=="" || sectionContent=="") return;
      setArticle((prev) => [...prev, {sectionTitle,sectionContent}]);
      setSectionContent("");
      setSectionTitle("");
    }

    const handleTag = (index) => {
      const removedTag = tags.splice(index,1);
      setTags(tags.filter((option) =>(option!==removedTag[0])));
    };
    const addTag = (e) => {
      if(tag=="") return;
      setTags((prev) => [...prev, tag]);
      setTag("");
    }

    const postNew = async (pay) => {
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
        const res11 = await server.put(`api/news/${obj._id}`, pay);
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
        }else{
          img = article.image
        }
        const payload = {title,image:img,description,tags,article};
        try{
        postNew(payload);
        setLoading(false);
        console.log(payload)
        router.push("/news");
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
          <h1>Edit Article</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}> 
          <div className={styles.formInput}>    
                <TextField
                  id="outlined-name"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
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
            <div className={styles.imgCon}>
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : obj.image ?
                      obj.image
                    : img
                }
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.formInput}>    
                <TextField
                  id="outlined-name"
                  label="Description"
                  value={description}
                  multiline
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
          </div>
          <div className={styles.right}>
            <div className={styles.form}>    
              <div className={styles.article}>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Section Title"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <TextField
                  id="outlined-name"
                  label="Section Content"
                  value={sectionContent}
                  multiline
                  rows={7}
                  onChange={(e) => setSectionContent(e.target.value)}
                />
              </div>
              <div className={styles.value} onClick={()=>{addSection()}}>
                Add
              </div>
              <div className={styles.inputs}>
                  { 
                    article?.map((section,i)=>(
                      <div key={i+section} onClick={()=>handleSection(i)} className={styles.value}>{section.sectionTitle}</div>
                    ))
                  }
                  </div>
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
export default EditNew;