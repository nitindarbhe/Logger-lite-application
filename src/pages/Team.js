import React from 'react'
import Ahmed from '../images/Ahmed.jpg';
import Nitin from '../images/nitin.jpg';
import Hitesh from '../images/Hitesh.jpg';
import Mohsin from '../images/mohsin.jpg';

function Team() {
 return (
  <div className='container' style={{ alignItems: 'center' }}>
   &nbsp;&nbsp;
   <h2 class="text-center">LoggerLite Team</h2>
   &nbsp;&nbsp;
   <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" style={{
     alignContent: "right"
    }}>
     <div class="card" style={{ border: "none", alignItems: 'center' }}>
      <img src={Ahmed} class="card-img-top" alt="..." style={{
       borderRadius: "50%",
       width: 300,
       height: 300,
       display: "block",
       background: `url('{Ahmed}') red`,
       backgroundPosition: "center",
       backgroundSize: "auto 80px"
      }} />
      <div class="card-body">
       <h5 class="card-title">Ahmed Awadallah: Team NG</h5>
      </div>
     </div>
    </div>
    <div class="col">
     <div class="card" style={{ border: "none", alignItems: 'center' }}>
      <img src={Mohsin} class="card-img-top" alt="..." style={{
       borderRadius: "100%",
       width: 300,
       height: 300,
       display: "block",
       background: `url('{Mohsin}') red`,
       backgroundPosition: "center",
       backgroundSize: "auto 80px"
      }} />
      <div class="card-body" style={{ border: "none", alignItems: 'center' }}>
       <h5 class="card-title">Mohsin Syed: Team NG</h5>
      </div>
     </div>
    </div>
    <div class="col">
     <div class="card" style={{ border: "none", alignItems: 'center' }}>
      <img src={Hitesh} class="card-img-top" alt="..." style={{
       borderRadius: "100%",
       width: 300,
       height: 300,
       display: "block",
       background: `url('{Hitesh}') red`,
       backgroundPosition: "center",
       backgroundSize: "auto 80px"
      }} />
      <div class="card-body" style={{ border: "none", alignItems: 'center' }}>
       <h5 class="card-title">Hitesh Salian: Team NG</h5>
      </div>
     </div>
    </div>
    <div class="col">
     <div class="card" style={{ border: "none", alignItems: 'center' }}>
      <img src={Nitin} class="card-img-top" alt="..." style={{
       borderRadius: "100%",
       width: 300,
       height: 300,
       display: "block",
       background: `url('{Nitin}') red`,
       backgroundPosition: "center",
       backgroundSize: "auto 80px"
      }} />
      <div class="card-body">
       <h5 class="card-title">Nitin Darbhe: Team NG</h5>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Team