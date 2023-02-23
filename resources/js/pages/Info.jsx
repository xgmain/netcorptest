import React, { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import withRouter from '../withRouter';
  
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
        const res = await axios.get(`/api/v1/agilogs/${this.state.id}/lastInfo`);
        this.setState({loading:false, log: res.data.data});
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
                    </div>
                </Layout>
            );
        }
    }
}

export default withRouter(Info);
