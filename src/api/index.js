import axios from 'axios';

const url =' https://covid19.mathdro.id/api';

//give us all the data according to country or global if country not specified 
export const fetchData = async(country)=> {
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    try{
        const {data:{confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        
        return { confirmed, recovered, deaths, lastUpdate };
    }catch(error){
        console.log(error);    
    }

}
//this will give us prev data according to daily dates, helps in ploting graph 
export const fetchDailyData =async ()=>{
    try {
        const {data} =await axios.get(`${url}/daily`);
        
        const modifiedData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportData,
        }));
        return modifiedData;
    } catch (error) {
        
    }
}
// fetchs all the countries listed in the api 
export const fetchCountries =async () =>{

    try {
        const {data:{countries}} = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name );
    } catch (error) {
        
    }
}
