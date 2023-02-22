import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import axios from 'axios';
  
export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            vehicles: [],
            loading:true
        };
    }
  
    async getVehicles(){
      const res = await axios.get('/api/v1/vehicles?active=true&isAgidrive=true');
      this.setState({loading:false, vehicles: res.data.data});
    };

    componentDidMount(){
        this.getVehicles();
    }

    render(){
        return (
            <Layout>
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Active Vehicle List</h2>
                    <table className = 'table' >
                        <thead>
                            <tr>
                            <th scope='col'>ID</th> 
                            <th scope='col'>Name</th>
                            <th scope='col'>AgiDrive</th>
                            <th scope='col'>Action</th>    
                            </tr>
                        </thead>
                    
                        <tbody>
                            {
                                this.state.vehicles.map((value, index) =>
                                    <tr key={index}>
                                        <td scope="row">{value.id}</td>
                                        <td>{value.name}</td>
                                        <td>{value.is_agidrive}</td>
                                        <td>
                                            <Link to="/log/115"className="btn btn-primary btn-sm">Log count</Link>
                                            <Link to="/info/115" className="btn btn-primary btn-sm ms-2">Last info</Link>
                                        </td>
                                    </tr>  
                                )
                            }
                        </tbody> 
                    </table>
                </div>
            </Layout>
        )
    }
}
