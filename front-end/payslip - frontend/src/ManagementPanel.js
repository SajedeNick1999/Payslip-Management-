import React from 'react';
import { useNavigate, Redirect, useParams } from 'react-router-dom';
import {Button, Grid, Card, Typography} from '@material-ui/core';
import Drawer from './Drawer';
import {makeStyles} from '@material-ui/core/styles';
import PayIcon from './images/PayslipManagement1.png';
import Employees from './images/Employees.png';
import Form from './images/Form.png';
import Background from './images/Login_Background.png';

const useStyles = makeStyles(theme=>({
    container:{
      width:'100%', 
      height: '100vh', 
      overflowX: 'hidden',
      backgroundImage: `url(${Background})`,
      backgroundPositionX: '70%',
      backgroundPositionY: '20%',

    },
    cardStyle: {
        [theme.breakpoints.down('sm')]: {
            width:200,
            height:400,
          },
          [theme.breakpoints.up('md')]: {
            width:250,
            height:500,
          },
          [theme.breakpoints.up('lg')]: {
            width:380,
            height:600,
          },
        backgroundColor: theme.palette.common.white,
        padding:20,
    },
    imageStyle: {
        width: 300,
        height: 400,
        marginBottom: 60,
    },
}))

const ManagementPanel = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <>
        <Drawer />
        <Grid container spacing={5} direction="column" alignItems="center" justify="center" className={classes.container}>
            <Grid item >
                <Typography variant="h2">
                    Manager Panel
                </Typography>
            </Grid>
        <Grid item container alignItems="center" justify="center" spacing={8}>
        <Grid item>
        <Card className={classes.cardStyle} elevation={3} align="center">
            <img src={Employees} className={classes.imageStyle} />
            <Typography variant="h4" color="textPrimary" align="center">
                Employee Management
            </Typography>
        </Card>
        </Grid>

        <Grid item>
        <Card className={classes.cardStyle} elevation={3} align="center" onClick={()=>navigate(`/dashboard/payslip/`)}>
            <img src={PayIcon} className={classes.imageStyle} />
            <Typography variant="h4" color="textPrimary" align="center">
                Payslip Management
            </Typography>
        </Card>
        </Grid>

        <Grid item>
        <Card className={classes.cardStyle} elevation={3} align="center">
            <img src={Form} className={classes.imageStyle} />
            <Typography variant="h4" color="textPrimary" align="center">
                Form Management
            </Typography>
        </Card>
        </Grid>
        </Grid>
        </Grid>
        </>
    )
};

export default ManagementPanel;