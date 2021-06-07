import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function NavbarTop() {
      const [sidebar, setSidebar] = useState(false);

      const showSidebar = () => setSidebar(!sidebar);

      return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <div class="container-fluid">
                        <Link to="/" class="navbar-brand">LoggerLite Logging Service</Link>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                              {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0"> */}
                              <ul class="nav justify-content-end">
                                    <li class="nav-item">
                                          <Link to="/" class="nav-link active">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                          <Link to="/displayTable" class="nav-link active">ViewLogs</Link>
                                    </li>
                                    <li class="nav-item">
                                          <Link to="/team" class="nav-link active">Team</Link>
                                    </li>
                              </ul>
                        </div>
                  </div>
            </nav >
      );
}

export default NavbarTop;
