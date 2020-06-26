import React ,{Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import pic from '../../images/salad.jpg'
import DetailDescription from './DetailDescription'

const useStyles = makeStyles({
  root: {
    minWidth: '70%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }, media: {
    height: 140,
    width: 200,
  },
});

export default function Detail() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (      
  <Card className={classes.root3}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={pic}
        title="salad"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        The Howling Wolf
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Lightly Seared beef sirloin, avo, roasted beetroot
& butternut, spring onion, julieen slaw with a
creamy mustard & soya lime dressing
        </Typography>
      </CardContent>
      <CardContent>
          <DetailDescription />
      </CardContent>
    </CardActionArea>
    {/* <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions> */}
  </Card>

  );
}