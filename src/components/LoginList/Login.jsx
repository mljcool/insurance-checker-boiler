import React from 'react';
import './LoginList.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const sampleList = [
  {
    id: 1,
    name: 'Jhon Doe',
  },
  {
    id: 2,
    name: 'Ann Doe',
  },
  {
    id: 3,
    name: 'Ann Doe',
  },
  {
    id: 4,
    name: 'Ann Doe',
  },
  {
    id: 5,
    name: 'Ann Doe',
  },
];

const Login = () => {
  const classes = useStyles();
  return (
    <div className='form_list_wrapper'>
      {sampleList.map((data) => (
        <Card className={classes.root} key={data.id}>
          <CardContent>
            <div className='connected_account'>
              <img src={`img/insurers/${data.id}.png`} />
              <div className='connect_details' />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className='connected_account add_new'>
        <div className='connect_details' />
      </div>
    </div>
  );
};

export default Login;
