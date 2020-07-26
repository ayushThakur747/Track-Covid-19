import React,{Component} from 'react';

import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';

import styles from './App.module.css';
import {fetchData} from './api';

import coronaImage from './images/covidImg.png';
import CountryPicker from './components/CountryPicker/CountryPicker';

class App extends React.Component{
    
    state= {
        data:{},
        country:''
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        
        this.setState({data:fetchedData});
    }

    handleCountryChange = async(country) => {
        
        const fetchedData = await fetchData(country);    
        //fetch the data
        //set the data
        this.setState({data:fetchedData, country: country});
    }

    render(){

        const{data,country}=this.state;
                
        return(
            <div className = {styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker  handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>

            </div>
        );
    }
}

export default App;