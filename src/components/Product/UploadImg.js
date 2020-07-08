import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import defaultImage from '../../assets/images/default-image.jpg';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  imagebox: {
    // width: 256,
    // heigh: 256
    // overflow:"hidden"
  },
  imgfit: {
    maxWidth: 200,
    maxHeight: 400,
    
    objectFit: 'contain'
  }
}));

export default function UploadImg(props) {
  const classes = useStyles();

  const [image, setImage] = useState({ name: null });
  const [url, setUrl] = useState('');
  // const [progress, setProgress] = useState(0);

  const handleChange = e => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
      // handleUpload(e.target.files[0]);
      props.handleImage(e.target.files[0])
    }
  };

const progress ={props} 
  console.log('image: ', image);
  return (
    <div className={classes.root}>
      <Box className={classes.imagebox}>
        <img
          className={classes.imagefit}
          alt="Yoodu"
          src={url || defaultImage}
          width="98%"
          
          
        />
      </Box>
      <input
        accept="image 
           /*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        {/* <Button variant="contained" color="primary" component="span">
          Upload
        </Button> */}

        <Button
          variant="contained"
          color="default"
          component="span"
          //        className={classes.button}
          startIcon={<CloudUploadIcon />}
          //onClick={handleUpload}
        >
          Upload
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <CircularProgressWithLabel value={props.progress} />
    </div>
  );
}
