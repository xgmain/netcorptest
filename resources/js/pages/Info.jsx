import React, { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import withRouter from '../withRouter';
import BingMapsReact from "bingmaps-react";
  
class Info extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            log: null,
            loading:true,
        };
    }
  
    async getLog(){
        const res = await axios
            .get(`/api/v1/agilogs/${this.state.id}/lastInfo`)
            .then( res => {
                this.setState({loading:false, log: res.data.data});
                console.log(res);
            })
            .catch(error => {
                // console.log(error.response.data.error)
            });
    }

    componentDidMount(){
        this.getLog();
    }

    render(){
        if (this.state.log === null) {
            return (
                <Layout>
                    <h2 className="text-center mt-5 mb-3">Last Info</h2>
                    <div>Fetching data, please wait..</div>
                </Layout>
            );
        } else {
            return (
                <Layout>
                    <h2 className="text-center mt-5 mb-3">Last Info</h2>
                    <table className = 'table' >
                        <thead>
                            <tr>
                            <th scope='col'>ID</th> 
                            <th scope='col'>Name</th>
                            <th scope='col'>Local Time</th>
                            <th scope='col'>Latitude</th>
                            <th scope='col'>Longitude</th>
                            <th scope='col'>Location</th>
                            <th scope='col'>Speed</th>
                            <th scope='col'>Direction</th>
                            </tr>
                        </thead>
                    
                        <tbody>
                            <tr>
                                <td scope="row">{this.state.log.vehicle_id}</td>
                                <td>{this.state.log.vehicle_name}</td>
                                <td>{this.state.log.local_time}</td>
                                <td>{this.state.log.lat}</td>
                                <td>{this.state.log.lng}</td>
                                <td>{this.state.log.address}</td>
                                <td>{this.state.log.speed}</td>
                                <td>{this.state.log.direction}</td>
                            </tr>  
                        </tbody> 
                    </table>
                    <div>
                        <BingMapsReact
                            bingMapsKey="AqrpK_b1lckZjNLrnOsEpLjuqsD0W43B9KnoHzITuX1U65qtzs6t_ermmJ38QnlK"
                            height="500px"
                            mapOptions={{
                                navigationBarMode: "square",
                            }}
                            pushPins={[
                                {
                                    center: {
                                        latitude: this.state.log.lat,
                                        longitude: this.state.log.lng,
                                    },
                                    options: {
                                        title: "vehicle location",
                                    },
                                }
                            ]}
                            viewOptions={{ center: { latitude: this.state.log.lat, longitude: this.state.log.lng } }}
                        />
                    </div>
                </Layout>
            );
        }
    }
}

export default withRouter(Info);
