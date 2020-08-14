import React, {useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Button, Grid, Card, Typography, Divider, TextField, Avatar,CardHeader} from '@material-ui/core';
import Drawer from './Drawer';
import {makeStyles} from '@material-ui/core/styles';
import Delete from './images/DeletePayslip.png';
import Green from '@material-ui/core/colors/green';
import Background from './images/Picture2.png';
import AccountCircle from 'mdi-material-ui/AccountCircle';
import useFormState from './useFormState'
import FormField from './FormField';
import ConfirmModal from './ConfirmModal';
import StatusModal from './StatusModal';

const useStyles = makeStyles(theme=>({
    container:{
      width:'100%', 
      height: '100vh', 
      overflowX: 'hidden',
      backgroundImage: `url(${Background})`,
      backgroundPositionX: '100%',
      backgroundPositionY: '100%',

    },
    innerContainer:{
        width:'70%', 
        height: '80%', 
        overflowX: 'hidden',
        backgroundColor: theme.palette.common.white,
        boxShadow:theme.shadows[15],
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
    cardButtons:{
        [theme.breakpoints.down('sm')]: {
            width: 700,
            height: 500,
          },
          [theme.breakpoints.up('md')]: {
            width: 700,
            height: 500,
          },
          [theme.breakpoints.up('lg')]: {
            width: 700,
            height: 500,
          },
          backgroundColor: theme.palette.common.white,
          padding:20,
          borderRadius:20,
          overflowY: 'scroll',
          marginBottom: 20,
    },
    imageStyle: {
        width: 300,
        height: 400,
        marginBottom: 60,
    },
    imageCardButtons:{
        width: 150,
        height: 150,
        marginBottom: 60,
    },
    formContainer:{
        width: '40%',
        height: '80%',
    },
    griditemTextField:{
        width:'50%',
        color:theme.palette.text.primary,
    },
    textField:{
        color: theme.palette.common.black,
    },
    addCard:{
        color: Green[500],
    }
}))

const DeletePayslipEmployee = () => {
    const props = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const [fields,setFields] = useState([]);
    const [employeeInfo,setEmployeeInfo] = useState({});
    const [payslip,setPayslip] = useState({});
    const [payslipId,setPayslipId] = useState({});
    const [showConfirmModal,setshowConfirmModal] = useState(false);

    const [showStatusModal,setShowStatusModal] = useState(false);
    const [status,setStatus] = useState(false);

    const {state,setState,handleChange} = useFormState(payslip);

    const handleClose =() => {
      setshowConfirmModal(false);
    }
    const handleOpen = () => {
      setshowConfirmModal(true);
    }

    const handleCloseStatus =() => {
      setShowStatusModal(false);
      navigate('/dashboard/payslip/');
    }
    const handleOpenStatus = () => {
      setShowStatusModal(true);
    }


    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/showform/${token}/${id}/`)
        .then(response => {
          return response.json();
        }).then(response=>{
          if(response.status === 200){
            const fieldArray = Object.keys(response.fields).map((key) => response.fields[key]);
            setFields(fieldArray);
          } 
        });

        fetch(`http://127.0.0.1:8000/getemployeeinfo/${props.id}/${token}/${id}/`)
        .then(response => {
          return response.json();
        }).then(response=>{
          if(response.status === 200){
            setEmployeeInfo(response);
          } 
        })
      },[]);

      useEffect(()=> {
        fetch(`http://127.0.0.1:8000/showpayslip/${employeeInfo.id}/${props.date}/${token}/${id}/`)
        .then(response => {
          return response.json();
        }).then(response=>{
          if(response.status === 200){
            setPayslip(JSON.parse(response.Data));
            setPayslipId(response.PayslipID);
          } 
        })
      },[employeeInfo]);

      useEffect(()=> {
        setState(payslip);
      },[payslip])

     const handleSubmit = () => {

      fetch(`http://127.0.0.1:8000/deletepayslip/${payslipId}/${token}/${id}/`)
      .then(function (response) {
        return response;
      })
      .then(function (response) {
        setStatus(response.status);
      });

      handleClose();
      handleOpenStatus();
      setTimeout(()=>{
        handleCloseStatus();
        navigate('/dashboard/payslip/');
      },3000);
    }

    const renderTextFields = () => {
        return fields.map((field,index)=>(
            <Grid item>
            <FormField 
                field={field}
                index={index}
                setState={handleChange(index)}
                state={state[index]}
                disabled
            />
            </Grid>
        ))
    }

    const renderEmptyForm = () => (
      <Grid item>
        <Typography>
          There is no payslip for this employee in the current date.
        </Typography>
      </Grid>
    )

    return (
        <>
        <Drawer />
        <ConfirmModal 
          onClose={handleClose} 
          open={showConfirmModal}
          handleSubmit={handleSubmit} 
          content="Are you sure you want to edit?" 

        />
        <StatusModal
            onClose={handleCloseStatus} 
            open={showStatusModal} 
            content={status===200 ? "Editing was successfull" : "Editing has Failed"} 
            status={status}
        />
        <Grid container alignItems="center" justify="center" className={classes.container}>
        <Grid item container spacing={8} alignItems="center" className={classes.innerContainer}>
        <Grid item>
            <img src={Delete} className={classes.imageStyle} />
            <Typography variant="h4" color="textPrimary" align="center">
                Delete Payslip Manually
            </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem/>
            <Grid  item >
             <Card className={classes.cardButtons} elevation={3}>
             <CardHeader
                  avatar={
                    <Avatar>
                    <AccountCircle />
                    </Avatar> 
                  }
                  title={
                    <Typography variant="h4">
                    {`${employeeInfo.Name} ${employeeInfo.LastName}`}
                    </Typography>
                  }
               />
               
               <Grid container spacing={3} direction="column">
                 {
                    payslip[0] ? renderTextFields() : renderEmptyForm()
                 }
               </Grid>   
               </Card>
               <Grid container spacing={3} justify="center">
                 <Grid item>
                 <Button color="primary" variant="contained" onClick={handleOpen}>
                      Delete
                  </Button>
                 </Grid>
                 </Grid>
            </Grid>
        </Grid>
        </Grid>

        </>
    )
};

export default DeletePayslipEmployee;