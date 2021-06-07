import React from 'react'
import DataImage from '../images/datalogger.jpg';
import { MdDataUsage } from "react-icons/md";


function Home() {

      return (
            <div class="container">
                  <div class="card">
                        <img src={DataImage} class="card-img-top" alt="data logger image" />
                        <div class="card-body">
                              {/* <h2 class="card-title">LoggerLite Logging Service</h2> */}
                              <h4 class="card-text" style={{ alignItems: 'center' }}>Top Motivators</h4>
                              <ul class="list-group">
                                    <li class="list-group-item" style={{ border: "none" }}>
                                          <MdDataUsage /> Enhance current logging infrastructure
                                    </li>
                                    <li class="list-group-item" style={{ border: "none" }}>
                                          <MdDataUsage /> Centralized logging for enhanced troubleshooting </li>
                                    <li class="list-group-item" style={{ border: "none" }}>
                                          <MdDataUsage /> Pertinent log messages for elmination of customer issues</li>
                                    <li class="list-group-item" style={{ border: "none" }}>
                                          <MdDataUsage /> Scalability and deploybility</li>
                                    <li class="list-group-item" style={{ border: "none" }}>
                                          <MdDataUsage /> Capability to integrate with logging aggregators and APMs (e.g. Data Log, Splunk, Dynatrace)</li>
                              </ul>
                        </div>
                  </div>
            </div >
      )
}

export default Home
